import React, { useLayoutEffect, useRef, useState } from 'react';


export const useSvgParamsHook = () => {
  const bgRef = useRef<HTMLElement>();
  const [params, setParams] = useState<{w: number, h: number}>();

  const runUpdate = () => {
    if (bgRef.current) {
      setParams({w: bgRef.current.offsetWidth, h: bgRef.current.offsetHeight});
    }
  };

  useLayoutEffect(() => {
    if (bgRef.current) {
      setParams({w: bgRef.current.offsetWidth, h: bgRef.current.offsetHeight});

      const nawWrapperObserver = new ResizeObserver(runUpdate);
      nawWrapperObserver.observe(bgRef.current);

      return () => {
        nawWrapperObserver.disconnect();
      };
    }
  }, [bgRef.current]);

  return {
    bgRef,
    params,
  };
}
