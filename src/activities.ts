import type { Event } from "@/analytics";

/**
 * This wrapper function seems unnecessary given is as big
 * as the instruction it contains, but it gives a couple of advantages:
 * - Encapsulates the API endpoint, making it easier to refactoring it with one single change
 * - Enforces type checking on the data being sent
 * @param event
 */
export async function sendEvent(event: Event) {
  navigator.sendBeacon("/api/events", JSON.stringify(event));
}
