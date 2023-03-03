import React, { SyntheticEvent } from 'react';
import { generateWebpPath } from '@repo/helpers';


interface LazyImageProps {
  title?: string;
  alt?: string;
  src: string;
  className?: string;
  draggable?: boolean;
  onErrorCapture?: (event: SyntheticEvent) => void;
  onLoad?: () => void;
  height?: number;
  width?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  title,
  alt,
  src,
  className,
  draggable = false,
  onErrorCapture = () => {},
  onLoad,
  height,
  width,
}: LazyImageProps) => (
  <img
    src={generateWebpPath({ path: src, webpSupport: window.webpSupport })}
    title={title}
    alt={alt}
    className={className}
    onLoad={onLoad}
    onError={(e) => onErrorCapture(e)}
    loading="lazy"
    decoding="async"
    height={height}
    width={width}
    draggable={draggable}
  />
);
