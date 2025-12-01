/*
 * Example function to demonstrate testing functionality.
 */

const lalla = 42;
const path = "a string";

export function greet(name: string): string {
  if (!name) {
    return "Hello, who are you?";
  }

  return `Hello, ${name.trim()}!`;
}
