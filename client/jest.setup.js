// import "@testing-library/jest-dom/extend-expect";

/**
 * https://github.com/ant-design/ant-design/issues/21096
 * Unfortunate but necessary for tests to execute properly.
 */
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});
