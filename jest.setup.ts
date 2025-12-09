import "@testing-library/jest-dom";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!globalThis.ResizeObserver) {
  // @ts-ignore
  globalThis.ResizeObserver = ResizeObserver;
}

if (!globalThis.matchMedia) {
  // @ts-ignore
  globalThis.matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
