export const preloadImages = async (imageUrls: string[]): Promise<void> => {
  await Promise.all(
    imageUrls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
};