import React, { useLayoutEffect, useRef, useState } from 'react';


export const useSvgParamsHook = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useState<{w: number, h: number}>();

  const runUpdate = () => {
    if (bgRef.current) {
      setParams({w: bgRef.current.offsetWidth, h: bgRef.current.offsetHeight});
    }
  };

  useLayoutEffect(() => {
    const nawWrapperObserver = new ResizeObserver(runUpdate);
    if (bgRef.current) {
      setParams({w: bgRef.current.offsetWidth, h: bgRef.current.offsetHeight});

      nawWrapperObserver.observe(bgRef.current);
    }
    return () => {
      nawWrapperObserver.disconnect();
    };
  }, [bgRef.current]);

  return {
    bgRef,
    params,
  };
}
