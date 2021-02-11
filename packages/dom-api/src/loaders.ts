export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener(
      'load',
      () => {
        resolve(image);
      },
      { once: true }
    );

    image.src = url;
  });
}

export async function loadJSON<T = unknown>(url: string) {
  return fetch(`./assets/${url}.json`).then((r) => r.json() as Promise<T>);
}
