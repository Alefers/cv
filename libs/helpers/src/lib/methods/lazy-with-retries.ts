import { lazy, ComponentType } from 'react';


type DefaultImportResult<T> = { default: T };

export function promiseRetry<T, K extends any[] = never>(
  fn: (...args: K) => Promise<T>,
  retriesLeft = 5,
  interval = 1000,
  args?: K,
) {
  return new Promise<T>((resolve, reject) => {
    // @ts-ignore
    fn.apply(this, args)
    .then(resolve)
    .catch((error) => {
      setTimeout(() => {
        if (retriesLeft === 1) {
          reject(error);
          return;
        }

        promiseRetry(fn, retriesLeft - 1, interval, args).then(
          resolve,
          reject,
        );
      }, interval);
    });
  });
}

export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<DefaultImportResult<T>>,
) {
  return lazy(() => promiseRetry<DefaultImportResult<T>>(factory));
}
