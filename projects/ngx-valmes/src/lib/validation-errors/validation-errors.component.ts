/* tslint:disable:use-host-property-decorator */
/* tslint:disable:no-input-rename */
import {
  Component,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  OnInit,
  Optional,
  QueryList,
  TemplateRef
} from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * Directive allowing to add a `glError` input to an ng-template, containing
 * the type of error for which the message contained in the ng-template must be
 * displayed
 */
@Directive({selector: 'ng-template[ngxError]'})
export class ValidationErrorDirective {
  /**
   * The type of the error that the content of the template must display.
   */
  @Input('ngxError') type: string;

  constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * Component allowing to display validation error messages associated to a given
 * form control or form group (the control input, of type AbstractControl)
 *
 * The error messages appear only if the control is invalid and has been touched,
 * or if it is invalid and the form that this component belongs to (if any) has
 * been submitted.
 *
 * Example usage:
 * ```
 *   <gl-validation-errors [control]="form.get('birthDate')">
 *     <ng-template glError="required">The birth date is mandatory</ng-template>
 *     <ng-template glError="max" let-error>The max value for the birth date is {{ error.max }}</ng-template>
 *   </gl-validation-errors>
 * ```
 */
@Component({
  selector: 'ngx-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
  host: {
    'class': 'invalid-feedback'
  }
})
export class ValidationErrorsComponent implements OnInit {

  /**
   * The FormControl or FormGroup containing the validation errors
   */
  @Input()
  control: AbstractControl;

  /**
   * The list of validation error directives (i.e. <ng-template glError="...">)
   * contained inside the component element.
   *
   * The content of each ng-template is displayed by the view of this component
   * if the control has an error of the type of error of the directive.
   */
  @ContentChildren(ValidationErrorDirective)
  errorDirectives: QueryList<ValidationErrorDirective>;

  /**
   * @param controlContainer the NgForm or FormGroupDirective
   * wrapping this component. It's injected so that we can know if it exists and,
   * if it does, if it has been submitted or not.
   *
   * The submitted flag is only present in subclasses of ControlContainer, so we need
   * to use a type assertion to access it.
   */
  constructor(@Optional() private controlContainer: ControlContainer) {
  }

  ngOnInit() {
  }

  /**
   * Adds the d-block CSS class to this component, to show it, if the errors must be
   * displayed.
   */
  @HostBinding('class.d-block')
  get shouldDisplayErrors() {
    return this.control
      && this.control.invalid
      && (this.control.touched || (this.controlContainer && (this.controlContainer as (NgForm | FormGroupDirective)).submitted));
  }

  /**
   * Adds the d-none CSS class to this component, to hide it, if the errors must be
   * not be displayed.
   */
  @HostBinding('class.d-none')
  get shouldNotDisplayErrors() {
    return !this.shouldDisplayErrors;
  }
}
