/*
 * Example function to demonstrate testing functionality.
 */

const lalla = "This is a sample string.";

export function greet(name: string): string {
  if (!name) {
    return "Hello, who are you?";
  }

  return `Hello, ${name.trim()}!`;
}
