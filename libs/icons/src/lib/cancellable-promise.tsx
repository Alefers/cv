import { useRef, useEffect } from 'react';


interface CancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}

export function makeCancelable<T>(promise: Promise<T>) {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((val) => (isCanceled ? reject() : resolve(val)))
      .catch((error) => (isCanceled ? reject() : reject(error)));
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

export function useCancellablePromise<T>(cancelable = makeCancelable) {
  const emptyPromise = Promise.resolve(true);

  // test if the input argument is a cancelable promise generator
  if (cancelable(emptyPromise).cancel === undefined) {
    throw new Error(
      'promise wrapper argument must provide a cancel() function',
    );
  }

  const promises = useRef<CancellablePromise<T>[]>();

  useEffect(() => {
    promises.current = promises.current || [];
    return function cancel() {
      // @ts-ignore
      promises.current.forEach((p) => p.cancel());
      promises.current = [];
    };
  }, []);

  function cancellablePromise(p: Promise<T>) {
    const cPromise = cancelable(p);
    // @ts-ignore
    promises.current.push(cPromise);
    return cPromise.promise;
  }

  return { cancellablePromise } as const;
}
