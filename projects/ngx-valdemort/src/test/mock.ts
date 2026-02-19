import { Type } from '@angular/core';
import { MockedFunction } from '@vitest/spy';
import { vi } from 'vitest';

function collectMethodNames(proto: unknown): Array<string> {
  if (!proto || proto === Object.prototype) {
    return [];
  }
  const methodNames: Array<string> = [];
  for (const key of Object.getOwnPropertyNames(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor && typeof descriptor.value === 'function' && key !== 'constructor') {
      methodNames.push(key);
    }
  }
  return [...methodNames, ...collectMethodNames(Object.getPrototypeOf(proto))];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Procedure = (...args: Array<any>) => any;
type Methods<T> = keyof { [K in keyof T as T[K] extends Procedure ? K : never]: T[K] };

export type MockObject<T> = T & { [K in Methods<T>]: T[K] extends Procedure ? MockedFunction<T[K]> : T[K] };

export function createMock<T>(type: Type<T>): MockObject<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeObject: any = {};
  for (const method of collectMethodNames(type.prototype)) {
    const typeName = type.name.startsWith('_') ? type.name.slice(1) : type.name;
    const mockName = `${typeName}.${method}`;
    fakeObject[method] = vi.fn().mockName(mockName);
  }
  return fakeObject;
}
