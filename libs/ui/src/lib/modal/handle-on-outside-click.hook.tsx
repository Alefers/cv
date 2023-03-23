import React, { useEffect, useRef, useState } from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


interface HandleOnOutsideClickHookProps {
  useHook: boolean;
  onClick: () => void;
}

export const useHandleOnOutsideClickHook = (
  {
    useHook,
    onClick,
  }: HandleOnOutsideClickHookProps,
) => {
  const clickContainerRef = useRef(null);
  const [readyToHandle, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (useHook) {
      timeoutId = setTimeout(() => setReady(true), 300);
    } else {
      setReady(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [useHook]);

  useEffect(() => {
    const subscription = new Subscription();

    if (readyToHandle && clickContainerRef.current) {
      subscription.add(
        fromEvent(document, 'click')
          .pipe(
            filter(
              (event) => !(clickContainerRef.current && clickContainerRef.current.contains(event.target)),
            ),
          )
          .subscribe(() => onClick()),
      );
    }

    return () => subscription.unsubscribe();
  }, [readyToHandle, clickContainerRef.current]);

  return {
    clickContainerRef,
  };
};
