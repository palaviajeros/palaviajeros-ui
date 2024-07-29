import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

Object.assign(global, { TextDecoder, TextEncoder });

// Fix to override matchMedia
//https://blog.lysender.com/2023/06/jest-react-testing-window-matchmedia-is-not-a-function/
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
