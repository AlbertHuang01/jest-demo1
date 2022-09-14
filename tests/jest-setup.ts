import "jest-location-mock";
import mockConsole from "jest-mock-console";
import "@testing-library/jest-dom";
import server from "./mockServer/server";

mockConsole();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.restoreHandlers();
});

afterAll(() => {
  server.close();
});

// 手动 mock localStorage
// Object.defineProperty(global, "localStorage", {
//   value: {
//     store: {} as Record<string, string>,
//     setItem(key: string, value: string) {
//       this.store[key] = value;
//     },
//     getItem(key: string) {
//       return this.store[key];
//     },
//     removeItem(key: string) {
//       delete this.store[key];
//     },
//     clear() {
//       this.store = {};
//     },
//   },
//   configurable: true,
// });

// 手动 mock console.xxx
// jest.spyOn(console, "log").mockReturnValue();
// jest.spyOn(console, "info").mockReturnValue();
// jest.spyOn(console, "warn").mockReturnValue();
// jest.spyOn(console, "error").mockReturnValue();
