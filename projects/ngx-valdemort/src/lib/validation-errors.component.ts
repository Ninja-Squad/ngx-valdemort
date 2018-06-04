/* tslint:disable:use-host-property-decorator */
import { Component, ContentChildren, Input, Optional, QueryList } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ValdemortConfig, DisplayMode } from './valdemort-config.service';
import { DefaultValidationErrors } from './default-validation-errors.service';
import { ValidationErrorDirective } from './validation-error.directive';

/**
 * Component allowing to display validation error messages associated to a given form control, form group or form array.
 * The control is provided using the `control` input of the component. If it's used inside an enclosing form group or
 * form array, it can instead be provided using the `controlName` input of the component.
 *
 * Example usage where the control itself is being passed as input:
 * ```
 *   <ve-errors [control]="form.get('birthDate')">
 *     <ng-template veType="required">The birth date is mandatory</ng-template>
 *     <ng-template veType="max" let-error="error">The max value for the birth date is {{ error.max | number }}</ng-template>
 *   </ve-errors>
 * ```
 *
 * Example usage where the control name is being passed as input:
 * ```
 *   <ve-errors controlName="birthDate">
 *     <ng-template veType="required">The birth date is mandatory</ng-template>
 *     <ng-template veType="max" let-error="error">The max value for the birth date is {{ error.max | number }}</ng-template>
 *   </ve-errors>
 * ```
 *
 * This component, if the control is invalid, displays its validation errors using the provided templates.
 * The templates, as shown in the above example, have access to the validation error itself.
 *
 * The label of the control can also be provided as input, and then used in the templates:
 * ```
 *   <ve-errors controlName="birthDate" label="the birth date">
 *     <ng-template veType="required" let-label>{{ label }} is mandatory</ng-template>
 *     <ng-template veType="max" let-error="error" let-label>The max value for {{ label }} is {{ error.max | number }}</ng-template>
 *   </ve-errors>
 * ```
 *
 * The component‘s behavior is configured globally by the Config service (see its documentation for more details). It can
 * - display the first error, or all the errors
 * - add CSS classes to its host `<ve-errors>` element
 * - add CSS classes to each error message element being displayed
 * - choose when to display the errors (dirty, touched, touched and submitted, etc.)
 *
 * Global, default templates can be defined (and used by this component) using the default validation errors directive
 * (see its documentation for details). So, if the default error messages are defined and sufficient for a given control, all you
 * need is
 *
 * ```
 * <ve-errors controlName="birthDate"></ve-errors>
 * ```
 *
 * or, if the default templates expect a label:
 *
 * ```
 * <ve-errors controlName="birthDate" label="the birth date"></ve-errors>
 * ```
 *
 * If, however, you want to override one or several error messages by custom ones, you can do so by simply defining them inside the
 * component:
 *
 * ```
 * <ve-errors controlName="birthDate" label="the birth date">
 *   <ng-template veType="max">You're too young, sorry</ng-template>
 * </ve-errors>
 * ```
 *
 * If an error is present on the control, but doesn't have any template or default template defined for its type, then it's not
 * displayed.
 */
@Component({
  selector: 've-errors',
  templateUrl: './validation-errors.component.html',
  host: {
    '[class]': 'errorsClasses',
    '[style.display]': `shouldDisplayErrors ? 'block' : 'none'`
  }
})
export class ValidationErrorsComponent {

  /**
   * The FormControl, FormGroup or FormArray containing the validation errors.
   * If set, the controlName input is ignored
   */
  @Input()
  control: AbstractControl;

  /**
   * The name (or the index, in case it's contained in a FormArray) of the FormControl, FormGroup or FormArray containing the validation
   * errors.
   * Ignored if the control input is set, and only usable if the control to validate is part of a control container
   */
  @Input()
  controlName: string | number;

  /**
   * The label of the field, exposed to templates so they can use it in the error message.
   */
  @Input()
  label: string;

  /**
   * The list of validation error directives (i.e. <ng-template veType="...">) contained inside the component element.
   */
  @ContentChildren(ValidationErrorDirective)
  errorDirectives!: QueryList<ValidationErrorDirective>;

  /**
   * @param config the Config service instance, defining the behavior of this component
   * @param defaultValidationErrors the service holding the default error templates, optionally
   * defined by using the default validation errors directive
   * @param controlContainer one of the 4 form group or form array directives that can "wrap" the control.
   * It's injected so that we can know if it exists and, if it does, if its form directive has been submitted or not:
   * the config service shouldDisplayErrors function can choose (and does by default) to use that information.
   */
  constructor(private config: ValdemortConfig,
              private defaultValidationErrors: DefaultValidationErrors,
              @Optional() private controlContainer: ControlContainer) { }

  get shouldDisplayErrors() {
    if (!this.actualControl || !this.actualControl.invalid) {
      return false;
    }
    const form = this.controlContainer && (this.controlContainer.formDirective as NgForm | FormGroupDirective);
    return this.config.shouldDisplayErrors(this.actualControl, form);
  }

  get errorsClasses(): string {
    return this.config.errorsClasses || '';
  }

  get errorClasses(): string {
    return this.config.errorClasses || '';
  }

  get errorDirectivesToDisplay() {
    const mergedDirectives: Array<ValidationErrorDirective> = [];
    const alreadyMetTypes = new Set<string>();
    const shouldContinue = () => (this.config.displayMode === DisplayMode.ALL || mergedDirectives.length === 0);
    for (let i = 0; i < this.defaultValidationErrors.directives.length && shouldContinue(); i++) {
      const defaultDirective = this.defaultValidationErrors.directives[i];
      alreadyMetTypes.add(defaultDirective.type);
      if (this.actualControl.hasError(defaultDirective.type)) {
        const customDirectiveOfSameType = this.errorDirectives.find(dir => dir.type === defaultDirective.type);
        mergedDirectives.push(customDirectiveOfSameType || defaultDirective);
      }
    }

    const customDirectives = this.errorDirectives.toArray();
    for (let i = 0; i < customDirectives.length && shouldContinue(); i++) {
      const customDirective = customDirectives[i];
      if (this.actualControl.hasError(customDirective.type) && !alreadyMetTypes.has(customDirective.type)) {
        mergedDirectives.push(customDirective);
      }
    }
    return mergedDirectives;
  }

  get actualControl(): AbstractControl {
    return this.control ||
      ((this.controlName || (this.controlName as any === 0)) &&
        this.controlContainer &&
        this.controlContainer.control &&
        (this.controlContainer.control as FormGroup | FormArray).controls[this.controlName]);
  }
}
