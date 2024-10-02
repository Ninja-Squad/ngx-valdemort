[![CircleCI](https://circleci.com/gh/Ninja-Squad/ngx-valdemort.svg?style=svg)](https://circleci.com/gh/Ninja-Squad/ngx-valdemort)
[![Codecov](https://codecov.io/gh/Ninja-Squad/ngx-valdemort/branch/master/graph/badge.svg)](https://codecov.io/gh/Ninja-Squad/ngx-valdemort)

# ngx-valdemort

ngx-valdemort gives you simpler, cleaner validation error messages for your Angular components.

## Why should you care?

If you've ever written forms like the following:

```html
<form [formGroup]="form" (ngSubmit)="submit()" #f="ngForm">
  <input formControlName="email" type="email" />
  @if (form.controls.email.invalid && (f.submitted || form.controls.email.touched)) {
    <div class="invalid-feedback">
      @if (form.controls.email.hasError('required')) {
        <div>The email is required</div>
      }
      @if (form.controls.email.hasError('email')) {
        <div>The email must be a valid email address</div>
      }
    </div>
  }

  <input formControlName="age" type="number" />
  @if (form.controls.age.invalid && (f.submitted || form.controls.age.touched)) {
    <div class="invalid-feedback">
      @if (form.controls.age.hasError('required')) {
        <div>The age is required</div>
      }
      @if (form.controls.age.hasError('min')) {
        <div>You must be at least {{ form.controls.age.getError('min').min }} years old</div>
      }
    </div>
  }

  <button (click)="submit()">Submit</button>
</form>
```

ngx-valdemort allows writing the above form in a simpler, cleaner way by using the `ValidationErrorsComponent`:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" type="email" />
  <val-errors controlName="email">
    <ng-template valError="required">The email is required</ng-template>
    <ng-template valError="email">The email must be a valid email address</ng-template>
  </val-errors>

  <input formControlName="age" type="number" />
  <val-errors controlName="age">
    <ng-template valError="required">The age is required</ng-template>
    <ng-template valError="max" let-error="error">You must be at least {{ error.min }} years old</ng-template>
  </val-errors>

  <button>Submit</button>
</form>
```

Even better, you can define default error messages once, and use them everywhere, while still being able to
override them when needed:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" type="email" />
  <val-errors controlName="email" label="The email"></val-errors>

  <input formControlName="age" type="number" />
  <val-errors controlName="age" label="The age">
    <ng-template valError="max" let-error="error">You must be at least {{ error.min }} years old</ng-template>
  </val-errors>

  <button>Submit</button>
</form>
```

It works with `ngModel` too!

```html
<input class="form-control" type="email" name="email" [(ngModel)]="user.email" required email #emailCtrl="ngModel" />
<val-errors [control]="emailCtrl.control" label="The email"></val-errors>
```

Learn more and see it in action on [our web page](https://ngx-valdemort.ninja-squad.com/)

## Installation

Using the CLI: `ng add ngx-valdemort`

Using npm: `npm install ngx-valdemort`

Using yarn: `yarn add ngx-valdemort`

## Getting started

- Import `ValdemortModule`, and other needed classes from ngx-valdemort
- Add the module to the imports of your application module
- Use `<val-errors>` in your forms
- Enjoy!

Go further:

- define default error messages using `<val-default-errors>`
- configure the look and feel globally by injecting and customizing the `ValdemortConfig` service

## Issues, questions

Please, provide feedback by filing issues, or by submitting pull requests, to the [Github Project](https://github.com/Ninja-Squad/ngx-valdemort).
