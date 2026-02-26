import { ChangeDetectionStrategy, Component, computed, contentChild, contentChildren, inject, input, Signal } from '@angular/core';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';
import { DefaultValidationErrors } from './default-validation-errors.service';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';
import { NgTemplateOutlet } from '@angular/common';
import { FieldTree, ValidationError } from '@angular/forms/signals';

interface ErrorWithDirective {
  error: ValidationError.WithFieldTree;
  directive: ValidationErrorDirective;
}

interface ErrorsToDisplay {
  // The validation error directives to display
  errors: Array<ErrorWithDirective>;

  // The fallback directive to use to display the fallback errors
  fallback: ValidationFallbackDirective | undefined;

  // the fallback errors to display (empty if there is no fallback directive)
  fallbackErrors: Array<ValidationError.WithFieldTree>;
}

type ViewModel =
  | {
      shouldDisplayErrors: false;
    }
  | {
      shouldDisplayErrors: true;
      errorsToDisplay: ErrorsToDisplay;
    };

const NO_ERRORS: ViewModel = {
  shouldDisplayErrors: false
};

/**
 * **Experimental**
 *
 * Component allowing to display validation error messages associated to a given field of a signal form.
 * The control is provided using the `formField` input of the component.
 *
 * Example usage:
 * ```
 *   <val-signal-errors [formField]="form.birthYear">
 *     <ng-template valError="required">The birth year is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error">The max value for the birth year is {{ error.max | number }}</ng-template>
 *   </val-errors>
 * ```
 *
 * This component, if the control is invalid, displays its validation errors using the provided templates.
 * The templates, as shown in the above example, have access to the validation error itself.
 *
 * The label of the control can also be provided as input, and then used in the templates:
 * ```
 *   <val-signal-errors [formField]="form.birthYear" label="the birth year">
 *     <ng-template valError="required" let-label>{{ label }} is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error" let-label>The max value for {{ label }} is {{ error.max | number }}</ng-template>
 *   </val-signal-errors>
 * ```
 *
 * The component‘s behavior is configured globally by the Config service (see its documentation for more details). It can
 * - display the first error, or all the errors
 * - add CSS classes to its host `<val-errors>` element
 * - add CSS classes to each error message element being displayed
 * - choose when to display the errors (dirty, touched, etc.)
 *
 * Global, default templates can be defined (and used by this component) using the default validation errors directive
 * (see its documentation for details). So, if the default error messages are defined and sufficient for a given control, all you
 * need is
 *
 * ```
 * <val-signal-errors [formField]="form.birthYear" />
 * ```
 *
 * or, if the default templates expect a label:
 *
 * ```
 * <val-signal-errors [formField]="form.birthYear" label="the birth year" />
 * ```
 *
 * If, however, you want to override one or several error messages by custom ones, you can do so by simply defining them inside the
 * component:
 *
 * ```
 * <val-signal-errors [formField]="form.birthYear" label="the birth year">
 *   <ng-template valError="max">You're too young, sorry</ng-template>
 * </val-signal-errors>
 * ```
 *
 * A fallback template can also be provided. This fallback template is used for all the errors that exist on the form control
 * but are not handled by any of the specific error templates:
 * ```
 * <val-signal-errors [formField]="form.birthYear" label="the birth year">
 *   <ng-template valError="max">You're too young, sorry</ng-template>
 *   <ng-template valFallback let-label let-type="type" let-error="error">{{ label }} has an unhandled error of kind {{ type }}: {{ error | json }}</ng-template>
 * </val-signal-errors>
 * ```
 * Note that, the fallback template can also be defined in the default validation errors directive (see its documentation for details).
 * If a fallback template is defined inside `val-signal-errors`, it overrides the default fallback.
 *
 * If an error is present on the field, but doesn't have any template, default template or fallback template defined for its type,
 * then it's not displayed. If the field is valid, or if none of the errors of the component has a matching template or default template,
 * then this component itself is hidden.
 */
@Component({
  selector: 'val-signal-errors',
  templateUrl: './validation-signal-errors.component.html',
  host: {
    '[class]': 'errorsClasses',
    '[style.display]': `vm().shouldDisplayErrors ? '' : 'none'`
  },
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationSignalErrorsComponent {
  /**
   * The FieldTree containing the validation errors.
   */
  readonly formField = input.required<FieldTree<unknown>>();

  /**
   * The label of the field, exposed to templates so they can use it in the error message.
   */
  readonly label = input<string | null>(null);

  /**
   * The list of validation error directives (i.e. <ng-template valError="...">) contained inside the component element.
   */
  readonly errorDirectives = contentChildren(ValidationErrorDirective);

  /**
   * The validation fallback directive (i.e. <ng-template valFallback>) contained inside the component element.
   */
  readonly fallbackDirective = contentChild(ValidationFallbackDirective);

  /**
   * The Config service instance, defining the behavior of this component
   */
  private readonly config = inject(ValdemortConfig);
  readonly errorsClasses = this.config.errorsClasses || '';
  readonly errorClasses = this.config.errorClasses || '';

  /**
   * The DefaultValidationErrors service instance, holding the default error templates,
   * optionally defined by using the default validation errors directive
   */
  private readonly defaultValidationErrors = inject(DefaultValidationErrors);

  private readonly hasDisplayableError = computed<boolean>(() => {
    const field = this.formField();
    const errors = field().errors();
    return (
      errors.length > 0 &&
      (!!this.fallbackDirective() ||
        !!this.defaultValidationErrors.fallback() ||
        errors.some(
          error =>
            this.defaultValidationErrors.directives().some(dir => dir.type() === error.kind) ||
            this.errorDirectives().some(dir => dir.type() === error.kind)
        ))
    );
  });

  private readonly shouldDisplayErrors = computed<boolean>(() => {
    const field = this.formField();
    const fieldState = field();
    if (!fieldState.invalid() || !this.hasDisplayableError()) {
      return false;
    }
    return this.config.shouldDisplayFieldErrors(fieldState);
  });

  readonly vm: Signal<ViewModel> = computed(() => {
    if (this.shouldDisplayErrors()) {
      const errorsToDisplay = this.findErrorsToDisplay();
      return {
        shouldDisplayErrors: true,
        errorsToDisplay
      };
    } else {
      return NO_ERRORS;
    }
  });

  private findErrorsToDisplay(): ErrorsToDisplay {
    const field = this.formField();
    const fieldErrors = field().errors();
    const mergedErrors: Array<ErrorWithDirective> = [];
    const fallbackErrors: Array<ValidationError.WithFieldTree> = [];
    const alreadyMetTypes = new Set<string>();
    const shouldContinue = () => this.config.displayMode === DisplayMode.ALL || (mergedErrors.length === 0 && fallbackErrors.length === 0);
    const defaultValidationErrorDirectives = this.defaultValidationErrors.directives();
    for (let i = 0; i < defaultValidationErrorDirectives.length && shouldContinue(); i++) {
      const defaultDirective = defaultValidationErrorDirectives[i];
      const error = fieldErrors.find(error => error.kind === defaultDirective.type());
      if (error) {
        const customDirectiveOfSameType = this.errorDirectives().find(dir => dir.type() === defaultDirective.type());
        mergedErrors.push({ directive: customDirectiveOfSameType ?? defaultDirective, error });
      }
      alreadyMetTypes.add(defaultDirective.type());
    }

    if (shouldContinue()) {
      const customDirectives = this.errorDirectives();
      for (let i = 0; i < customDirectives.length && shouldContinue(); i++) {
        const customDirective = customDirectives[i];
        if (!alreadyMetTypes.has(customDirective.type())) {
          const error = fieldErrors.find(error => error.kind === customDirective.type());
          if (error) {
            mergedErrors.push({ directive: customDirective, error });
          }
        }
        alreadyMetTypes.add(customDirective.type());
      }
    }

    if (shouldContinue() && (this.fallbackDirective() || this.defaultValidationErrors.fallback())) {
      for (let i = 0; i < fieldErrors.length && shouldContinue(); i++) {
        const error = fieldErrors[i];
        if (!alreadyMetTypes.has(error.kind)) {
          fallbackErrors.push(error);
        }
      }
    }

    return {
      errors: mergedErrors,
      fallback: this.fallbackDirective() ?? this.defaultValidationErrors.fallback(),
      fallbackErrors
    };
  }
}
