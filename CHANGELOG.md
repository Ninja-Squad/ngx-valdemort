# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v5.1.0...v6.0.0) (2021-05-13)

### ⚠ BREAKING CHANGES

- ngx-valdemort now targets Angular 12.0.0 and Ivy only. If you want to use it with Angular 11.x or View Engine, stick to the previous version of ngx-valdemort. Partial Ivy compilation is now enabled, allowing ngcc to skip this package and you to have faster builds! 🚀

### Features

- enable Ivy partial compilation ([5166464](https://github.com/Ninja-Squad/ngx-valdemort/commit/51664645d535aa7892dd7f1154dc83f553e827a8))

### Bug Fixes

- renovate config ([80edb78](https://github.com/Ninja-Squad/ngx-valdemort/commit/80edb787cdc564faf2433cddfa46b0a1f7fe34fe))

## [5.1.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v5.1.0-beta.1...v5.1.0) (2021-04-09)

### Features

- add a validation fallback directive ([d16d844](https://github.com/Ninja-Squad/ngx-valdemort/commit/d16d844f5cdbb9ffbf24ff25dfbc56f09773c3d2)), closes [#264](https://github.com/Ninja-Squad/ngx-valdemort/issues/264)

The template of the `valFallback` directive is used for all the errors that exist on the form control but are not handled by any of the specific error templates:

```html
<val-default-errors>
  <ng-template valError="required" let-label>{{ label }} is mandatory</ng-template>
  <ng-template valError="max" let-error="error" let-label>{{ label }} must be at most {{ error.max | number }}</ng-template>
  <ng-template valFallback let-label let-type="type" let-error="error"
    >{{ label }} has an unhandled error of type {{ type }}: {{ error | json }}</ng-template
  >
</val-default-errors>
```

- allow throwing on missing control ([c2b739b](https://github.com/Ninja-Squad/ngx-valdemort/commit/c2b739b1bcd0727a4ce13e7cc425824eb7d4792d))

This adds a configuration option called `shouldThrowOnMissingControl` that checks if the control is not found, if set to a function that returns true.
It is set to a function that returns false by default, so this is not breaking change.

This allows to catch situations where the controlName has been wrongly specified:

```html
<input id="firstName" name="firstName" [(ngModel)]="user.firstName" #firstNameCtrl="ngModel" required />
<!-- the control name mentions lastName whereas the control is firstName -->
<val-errors controlName="lastName" id="firstNameErrors"></val-errors>
```

In that case, if the new option is enabled, valdemort will throw:

```
ngx-valdemort: no control found for controlName: 'lastName'.
```

As the option accepts a function, it can easily be enabled in dev and tests, but disabled in production:

```
config.shouldThrowOnMissingControl = () => !environment.production;
```

## [5.1.0-beta.1](https://github.com/Ninja-Squad/ngx-valdemort/compare/v5.1.0-beta.0...v5.1.0-beta.1) (2021-04-03)

### Features

- add a validation fallback directive ([d16d844](https://github.com/Ninja-Squad/ngx-valdemort/commit/d16d844f5cdbb9ffbf24ff25dfbc56f09773c3d2)), closes [#264](https://github.com/Ninja-Squad/ngx-valdemort/issues/264)

## [5.1.0-beta.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v5.0.0...v5.1.0-beta.0) (2021-03-26)

### Features

- allow throwing on missing control ([c2b739b](https://github.com/Ninja-Squad/ngx-valdemort/commit/c2b739b1bcd0727a4ce13e7cc425824eb7d4792d))

This adds a configuration option called `shouldThrowOnMissingControl` that checks if the control is not found, if set to a function that returns true.
It is set to a function that returns false by default, so this is not breaking change.

This allows to catch situations where the controlName has been wrongly specified:

```html
<input id="firstName" name="firstName" [(ngModel)]="user.firstName" #firstNameCtrl="ngModel" required />
<!-- the control name mentions lastName whereas the control is firstName -->
<val-errors controlName="lastName" id="firstNameErrors"></val-errors>
```

In that case, if the new option is enabled, valdemort will throw:

```
ngx-valdemort: no control found for controlName: 'lastName'.
```

As the option accepts a function, it can easily be enabled in dev and tests, but disabled in production:

```
config.shouldThrowOnMissingControl = () => !environment.production;
```

## [5.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v4.0.0...v5.0.0) (2020-11-20)

### Features

- update to Angular v11 ([750d7ef](https://github.com/Ninja-Squad/ngx-valdemort/commit/750d7ef24073c038ca3cc3f773c0fd159cc398af))

### ⚠ BREAKING CHANGES

- `ngx-valdemort` is now based on Angular 11.x. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-valdemort`.

## [4.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v3.0.0...v4.0.0) (2020-06-26)

### Features

- update to Angular v10 ([61c624b](https://github.com/Ninja-Squad/ngx-valdemort/commit/61c624b722278e1e263056123204b42a4953eefd))

### ⚠ BREAKING CHANGES

- `ngx-valdemort` is now based on Angular 10.x. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-valdemort`.

## [3.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v2.0.0...v3.0.0) (2020-02-07)

### ⚠ BREAKING CHANGES

- `ngx-valdemort` is now based on Angular 9.x. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-valdemort`.

### Features

- support basic ng-add ([ac16e33](https://github.com/Ninja-Squad/ngx-valdemort/commit/ac16e33c26cb423b3dc2f7b324ad147112d229d9))

### Bug Fixes

- force string conversion in prism ([aec5b1d](https://github.com/Ninja-Squad/ngx-valdemort/commit/aec5b1de7dbeaab20ed018266e8a7f323001fc29))

- update to ng and cli v9.0.0 ([4d258c6](https://github.com/Ninja-Squad/ngx-valdemort/commit/4d258c6c32a81da64c86e08af841a9c1a42ab247))

## [2.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v1.0.0...v2.0.0) (2019-05-31)

### Bug Fixes

- codelyzer rule name ([2474ea5](https://github.com/Ninja-Squad/ngx-valdemort/commit/2474ea5))
- correct class in bootstrap integration doc ([2164b97](https://github.com/Ninja-Squad/ngx-valdemort/commit/2164b97))
- fix prism highlight signature ([b33bcff](https://github.com/Ninja-Squad/ngx-valdemort/commit/b33bcff))

### chore

- bump to ng 8.0.0 ([c5e4177](https://github.com/Ninja-Squad/ngx-valdemort/commit/c5e4177))

### BREAKING CHANGES

- `ngx-valdemort` is now based on Angular 8.x. If you want to use it with an older version of Angular, then stick to the previous version of `ngx-valdemort`.

<a name="1.0.0"></a>

# [1.0.0](https://github.com/Ninja-Squad/ngx-valdemort/compare/v0.1.1...v1.0.0) (2018-11-02)

This 1.0.0 version is based and tested on Angular 7, although it should run fine with Angular 6.
Future versions are not guaranteed to support Angular 6, though. We encourage you to upgrade.

<a name="0.1.1"></a>

## [0.1.1](https://github.com/Ninja-Squad/ngx-valdemort/compare/v0.1.0...v0.1.1) (2018-09-07)

### Bug Fixes

- aot build with strict null checks ([193990a](https://github.com/Ninja-Squad/ngx-valdemort/commit/193990a)), closes [#86](https://github.com/Ninja-Squad/ngx-valdemort/issues/86)

<a name="0.1.0"></a>

# 0.1.0 (2018-06-12)

First release :champagne:
