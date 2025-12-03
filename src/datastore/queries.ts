/**
 * Service to retrieve audio track metadata from the mock datastore.
 */

import type { TrackMetadata } from "@/datastore/db";
import { loadDatastore } from "@/datastore/db";

/**
 * Return metadata for all audio tracks.
 *
 * @returns a promise that resolves to an array of TrackMetadata objects.
 */
export async function findAllTrackMetadata(): Promise<TrackMetadata[]> {
  return simulateDelay(loadDatastore().map((s) => ({ ...s })));
}

/**
 * Return metadata of a single audio track identified by the given ID.
 *
 * @param id the ID of the audio track
 * @returns a promise that resolves to the TrackMetadata object or null if not found.
 */
export async function findTrackMetadataById(
  id: string,
): Promise<TrackMetadata | null> {
  const found = loadDatastore().find((s) => s.id === id) ?? null;
  return simulateDelay(found ? { ...found } : null);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param beginning integer value that represents the beginning of the interval
 * @param end integer value that represents the end of the interval
 * @returns a random integer between beginning and end (both inclusive)
 */
function getRandomInteger(beginning: number, end: number): number {
  // "ceil" ensures the minimum value is rounded up to the nearest whole number
  const min = Math.ceil(beginning);
  // "floor" does the opposite for the maximum
  const max = Math.floor(end);

  // This function multiplies the difference between max and min by the result of Math.random(),
  // then adds the min value. This scales the random number to your desired range.
  // By adding 1 to (max - min), we ensure that the maximum value is also a possible result (inclusive).
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Simulate an artificial delay for async operations.
 *
 * @param value the value returned by the underlying function after the delay
 * @param ms the delay in milliseconds (default: 500ms)
 * @returns the value wrapped in a promise that resolves after the delay
 */
function simulateDelay<T>(value: T, ms = 500): Promise<T> {
  const timeout = getRandomInteger(0, ms);
  return new Promise((resolve) => setTimeout(() => resolve(value), timeout));
}
