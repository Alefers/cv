declare global {
  interface Window {
    webpSupport: boolean;
  }
}

export const getIsMobile = () => false;

const supportsWebp = async (): Promise<boolean> => {
  if (!self.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then((r) => r.blob());
  return createImageBitmap(blob).then(
    () => true,
    () => false,
  );
};

export const checkWebpSupport = (): void => {
  window.webpSupport = false;
  supportsWebp().then((data) => (window.webpSupport = data));
};
