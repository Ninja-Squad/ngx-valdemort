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
  <val-errors controlName="foo">
    <ng-template valType="required">foo is required</ng-template>
    <ng-template valType="pattern">foo is incorrect</ng-template>
  </val-errors>

  <input formControlName="bar" type="number" id="number"/>
  <val-errors controlName="bar">
    <ng-template valType="max" let-error="error">bar must be max {{ error.max }}</ng-template>
  </val-errors>

  <button>Submit</button>
</form>
```

## Installation

Using npm: `npm install ngx-valdemort`

Using yarn: `yarn add ngx-valdemort`

## Getting started

 - Import `ValdemortModule`, and other needed classes from ngx-valdemort
 - Add the module to the imports of your application module
 - Use `<val-errors>` in your forms
 - Enjoy!
   
## Issues, questions

Please, provide feedback by filing issues, or by submitting pull requests, to the [Github Project](https://github.com/Ninja-Squad/ngx-valdemort).
