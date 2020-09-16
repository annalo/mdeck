// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

Object.defineProperty(Element.prototype, "scroll", {
  value: jest.fn(),
  writable: true,
  configurable: true,
});

// fullscreen library will cause an error in jest tests
// if it  can't find fullscreen methods on document
["requestFullscreen", "exitFullscreen"].forEach(
  (each) => (document[each] = () => {})
);
