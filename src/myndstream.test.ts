/*
 * Example test suite for the greet function in myndstream.ts
 */

import { greet } from "@/myndstream";

describe("greet", () => {
  it("returns a greeting provided a name", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
  });

  it("returns a greeting for an empty string", () => {
    expect(greet("")).toBe("Hello, who are you?");
  });

  it("trims leading and trailing whitespaces in the name", () => {
    expect(greet("  Bob  ")).toBe("Hello, Bob!");
  });

  it("is exported as a function", () => {
    expect(typeof greet).toBe("function");
  });
});
