[![Build Status](https://travis-ci.org/Ninja-Squad/ngx-valdemort.svg?branch=master)](https://travis-ci.org/Ninja-Squad/ngx-valdemort)
[![Codecov](https://codecov.io/gh/Ninja-Squad/ngx-valdemort/branch/master/graph/badge.svg)](https://codecov.io/gh/Ninja-Squad/ngx-valdemort)

# ngx-valdemort

ngx-valdemort gives you simpler, cleaner validation error messages for your Angular components.

## Why should you care?

If you've ever written forms like the following:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="foo" id="test" />
  <div *ngIf="form.get('foo').touched && form.get('foo').invalid">
    <div *ngIf="form.get('foo').hasError('required')">foo is required</div>
    <div *ngIf="form.get('foo').hasError('pattern')">foo is incorrect</div>
  </div>

  <input formControlName="bar" type="number" id="number"/>
  <div *ngIf="form.get('bar').touched && form.get('bar').invalid">
    <div *ngIf="form.get('bar').hasError('max')">bar must be max {{ form.get('bar').getError('max').max }}</div>
  </div>

  <button>Submit</button>
</form>
```

ngx-valdemort allows writing the above form in a simpler, 
cleaner way by using the `ValidationErrorsComponent`:
 
```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="foo" id="test" />
  <ngx-validation-errors [control]="form.get('foo')">
    <ng-template ngxError="required">foo is required</ng-template>
    <ng-template ngxError="pattern">foo is incorrect</ng-template>
  </ngx-validation-errors>

  <input formControlName="bar" type="number" id="number"/>
  <ngx-validation-errors [control]="form.get('bar')">
    <ng-template ngxError="max" let-error>bar must be max {{ error.max }}</ng-template>
  </ngx-validation-errors>

  <button>Submit</button>
</form>
```

## Installation

Using npm: `npm install --save-dev ngx-valdemort`

Using yarn: `yarn add --dev ngx-valdemort`

## Getting started

 - Import `NgxValdemortModule`, and other needed classes from ngx-valdemort
 - Add the module to the imports of your application module
 - Use `<ngx-validation-errors>` in your forms
 - Enjoy!
   
## Issues, questions

Please, provide feedback by filing issues, or by submitting pull requests, to the [Github Project](https://github.com/Ninja-Squad/ngx-valdemort).
