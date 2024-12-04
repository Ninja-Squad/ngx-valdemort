import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  DoCheck,
  inject,
  input,
  signal,
  Signal
} from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { DisplayMode, ValdemortConfig } from './valdemort-config.service';
import { DefaultValidationErrors } from './default-validation-errors.service';
import { ValidationErrorDirective } from './validation-error.directive';
import { ValidationFallbackDirective } from './validation-fallback.directive';
import { NgTemplateOutlet } from '@angular/common';

interface FallbackError {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

interface ErrorsToDisplay {
  // The validation error directives to display
  errors: Array<ValidationErrorDirective>;

  // The fallback directive to use to display the fallback errors
  fallback: ValidationFallbackDirective | undefined;

  // the fallback errors to display (empty if there is no fallback directive)
  fallbackErrors: Array<FallbackError>;
}

type ViewModel =
  | {
      shouldDisplayErrors: false;
    }
  | {
      shouldDisplayErrors: true;
      errorsToDisplay: ErrorsToDisplay;
      control: AbstractControl;
    };

const NO_ERRORS: ViewModel = {
  shouldDisplayErrors: false
};

interface ValidationState {
  control: AbstractControl | null;
  errorsDisplayed: boolean | null;
  errors: ValidationErrors | null;
}

const NO_VALIDATION_STATE: ValidationState = {
  control: null,
  errorsDisplayed: null,
  errors: null
};

function areValidationStatesEqual(previous: ValidationState, current: ValidationState): boolean {
  return previous.control === current.control && previous.errorsDisplayed === current.errorsDisplayed && previous.errors === current.errors;
}

/**
 * Component allowing to display validation error messages associated to a given form control, form group or form array.
 * The control is provided using the `control` input of the component. If it's used inside an enclosing form group or
 * form array, it can instead be provided using the `controlName` input of the component.
 *
 * Example usage where the control itself is being passed as input:
 * ```
 *   <val-errors [control]="form.controls.birthDate">
 *     <ng-template valError="required">The birth date is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error">The max value for the birth date is {{ error.max | number }}</ng-template>
 *   </val-errors>
 * ```
 *
 * Example usage where the control name is being passed as input:
 * ```
 *   <val-errors controlName="birthDate">
 *     <ng-template valError="required">The birth date is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error">The max value for the birth date is {{ error.max | number }}</ng-template>
 *   </val-errors>
 * ```
 *
 * This component, if the control is invalid, displays its validation errors using the provided templates.
 * The templates, as shown in the above example, have access to the validation error itself.
 *
 * The label of the control can also be provided as input, and then used in the templates:
 * ```
 *   <val-errors controlName="birthDate" label="the birth date">
 *     <ng-template valError="required" let-label>{{ label }} is mandatory</ng-template>
 *     <ng-template valError="max" let-error="error" let-label>The max value for {{ label }} is {{ error.max | number }}</ng-template>
 *   </val-errors>
 * ```
 *
 * The component‘s behavior is configured globally by the Config service (see its documentation for more details). It can
 * - display the first error, or all the errors
 * - add CSS classes to its host `<val-errors>` element
 * - add CSS classes to each error message element being displayed
 * - choose when to display the errors (dirty, touched, touched and submitted, etc.)
 *
 * Global, default templates can be defined (and used by this component) using the default validation errors directive
 * (see its documentation for details). So, if the default error messages are defined and sufficient for a given control, all you
 * need is
 *
 * ```
 * <val-errors controlName="birthDate"></val-errors>
 * ```
 *
 * or, if the default templates expect a label:
 *
 * ```
 * <val-errors controlName="birthDate" label="the birth date"></val-errors>
 * ```
 *
 * If, however, you want to override one or several error messages by custom ones, you can do so by simply defining them inside the
 * component:
 *
 * ```
 * <val-errors controlName="birthDate" label="the birth date">
 *   <ng-template valError="max">You're too young, sorry</ng-template>
 * </val-errors>
 * ```
 *
 * A fallback template can also be provided. This fallback template is used for all the errors that exist on the form control
 * but are not handled by any of the specific error templates:
 * ```
 * <val-errors controlName="birthDate" label="the birth date">
 *   <ng-template valError="max">You're too young, sorry</ng-template>
 *   <ng-template valFallback let-label let-type="type" let-error="error">{{ label }} has an unhandled error of type {{ type }}: {{ error | json }}</ng-template>
 * </val-errors>
 * ```
 * Note that, the fallback template can also be defined in the default validation errors directive (see its documentation for details).
 * If a fallback template is defined inside `val-errors`, it overrides the default fallback.
 *
 * If an error is present on the control, but doesn't have any template, default template or fallback template defined for its type,
 * then it's not displayed. If the control is valid, or if none of the errors of the component has a matching template or default template,
 * then this component itself is hidden.
 */
@Component({
  selector: 'val-errors',
  templateUrl: './validation-errors.component.html',
  host: {
    '[class]': 'errorsClasses',
    '[style.display]': `vm().shouldDisplayErrors ? '' : 'none'`
  },
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent implements DoCheck {
  /**
   * The FormControl, FormGroup or FormArray containing the validation errors.
   * If set, the controlName input is ignored
   */
  control = input<AbstractControl | null>(null);

  /**
   * The name (or the index, in case it's contained in a FormArray) of the FormControl, FormGroup or FormArray containing the validation
   * errors.
   * Ignored if the control input is set, and only usable if the control to validate is part of a control container
   */
  controlName = input<string | number | null>(null);

  /**
   * The label of the field, exposed to templates so they can use it in the error message.
   */
  label = input<string | null>(null);

  /**
   * The list of validation error directives (i.e. <ng-template valError="...">) contained inside the component element.
   */
  errorDirectives = contentChildren(ValidationErrorDirective);

  /**
   * The validation fallback directive (i.e. <ng-template valFallback>) contained inside the component element.
   */
  fallbackDirective = contentChild(ValidationFallbackDirective);

  /**
   * The Config service instance, defining the behavior of this component
   */
  private config = inject(ValdemortConfig);
  readonly errorsClasses = this.config.errorsClasses || '';
  readonly errorClasses = this.config.errorClasses || '';

  private validationState = signal<ValidationState>(NO_VALIDATION_STATE, { equal: areValidationStatesEqual });

  /**
   * The DefaultValidationErrors service instance, holding the default error templates,
   * optionally defined by using the default validation errors directive
   */
  private defaultValidationErrors = inject(DefaultValidationErrors);

  /**
   * The control container, if it exists, as one of the 4 form group or form array directives that can "wrap" the control.
   * It's injected so that we can know if it exists and, if it does, if its form directive has been submitted or not:
   * the config service shouldDisplayErrors function can choose (and does by default) to use that information.
   */
  private controlContainer = inject(ControlContainer, { optional: true });

  readonly vm: Signal<ViewModel> = computed(() => {
    const ctrl = this.validationState().control;
    if (this.shouldDisplayErrors(ctrl)) {
      const errorsToDisplay = this.findErrorsToDisplay(ctrl);
      return {
        shouldDisplayErrors: true,
        control: ctrl,
        errorsToDisplay
      };
    } else {
      return NO_ERRORS;
    }
  });

  ngDoCheck(): void {
    const ctrl = this.findActualControl();
    if (ctrl) {
      const formDirective = this.controlContainer?.formDirective as NgForm | FormGroupDirective | undefined;
      const errorsDisplayed = this.config.shouldDisplayErrors(ctrl, formDirective);
      this.validationState.set({
        control: ctrl,
        errorsDisplayed,
        errors: ctrl.errors
      });
    } else {
      this.validationState.set(NO_VALIDATION_STATE);
    }
  }

  private shouldDisplayErrors(ctrl: AbstractControl | null): ctrl is AbstractControl {
    if (!ctrl || !ctrl.invalid || !this.hasDisplayableError(ctrl)) {
      return false;
    }
    const form = this.controlContainer && (this.controlContainer.formDirective as NgForm | FormGroupDirective);
    return this.config.shouldDisplayErrors(ctrl, form ?? undefined);
  }

  private findErrorsToDisplay(ctrl: AbstractControl): ErrorsToDisplay {
    const mergedDirectives: Array<ValidationErrorDirective> = [];
    const fallbackErrors: Array<FallbackError> = [];
    const alreadyMetTypes = new Set<string>();
    const shouldContinue = () =>
      this.config.displayMode === DisplayMode.ALL || (mergedDirectives.length === 0 && fallbackErrors.length === 0);
    const defaultValidationErrorDirectives = this.defaultValidationErrors.directives();
    for (let i = 0; i < defaultValidationErrorDirectives.length && shouldContinue(); i++) {
      const defaultDirective = defaultValidationErrorDirectives[i];
      if (ctrl.hasError(defaultDirective.type())) {
        const customDirectiveOfSameType = this.errorDirectives().find(dir => dir.type() === defaultDirective.type());
        mergedDirectives.push(customDirectiveOfSameType || defaultDirective);
      }
      alreadyMetTypes.add(defaultDirective.type());
    }

    if (shouldContinue()) {
      const customDirectives = this.errorDirectives();
      for (let i = 0; i < customDirectives.length && shouldContinue(); i++) {
        const customDirective = customDirectives[i];
        if (ctrl.hasError(customDirective.type()) && !alreadyMetTypes.has(customDirective.type())) {
          mergedDirectives.push(customDirective);
        }
        alreadyMetTypes.add(customDirective.type());
      }
    }

    if (shouldContinue() && (this.fallbackDirective() || this.defaultValidationErrors.fallback())) {
      const allErrors = Object.entries(ctrl.errors ?? []);
      for (let i = 0; i < allErrors.length && shouldContinue(); i++) {
        const [type, value] = allErrors[i];
        if (!alreadyMetTypes.has(type)) {
          fallbackErrors.push({ type, value });
        }
      }
    }

    return {
      errors: mergedDirectives,
      fallback: this.fallbackDirective() ?? this.defaultValidationErrors.fallback(),
      fallbackErrors
    };
  }

  private findActualControl(): AbstractControl | null {
    const ctrl = this.control();
    const ctrlName = this.controlName();
    if (ctrl) {
      return ctrl;
    } else if (ctrlName != null && (this.controlContainer?.control as FormArray | FormGroup)?.controls) {
      // whether the control is a FormGroup or a FormArray, we must use .control[ctrlName] to get it
      const control = (this.controlContainer?.control as FormArray).controls[ctrlName as number];
      if (this.config.shouldThrowOnMissingControl()) {
        // if the control is null, then there are two cases:
        // - we are in a template driven form, and the controls might not be initialized yet
        // - there was an error in the control name. If so, let's throw an error to help developers
        // to avoid false positive in template driven forms, we check if the controls are initialized
        // by checking if the `controls` object or array has any element
        if (!control && Object.keys((this.controlContainer?.control as FormArray)?.controls).length > 0) {
          throw new Error(`ngx-valdemort: no control found for controlName: '${ctrlName}'.`);
        }
      }
      return control;
    }
    return null;
  }

  private hasDisplayableError(ctrl: AbstractControl) {
    return (
      ctrl.errors &&
      (this.fallbackDirective() ||
        this.defaultValidationErrors.fallback() ||
        Object.keys(ctrl.errors).some(
          type =>
            this.defaultValidationErrors.directives().some(dir => dir.type() === type) ||
            this.errorDirectives().some(dir => dir.type() === type)
        ))
    );
  }
}
