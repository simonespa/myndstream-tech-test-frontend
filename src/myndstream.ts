/*
 * Example function to demonstrate testing functionality.
 */

export function greet(name: string): string {
  if (!name) {
    return 'Hello, who are you?';
  }

  return `Hello, ${name.trim()}!`;
}
