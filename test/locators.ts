import { Locator, locators } from 'vitest/browser';

locators.extend({
  // Useful transition helper for CSS selector-based tests.
  getByCss(selector: string) {
    return selector;
  }
});

declare module 'vitest/browser' {
  interface LocatorSelectors {
    getByCss(selector: string): Locator;
  }
}
