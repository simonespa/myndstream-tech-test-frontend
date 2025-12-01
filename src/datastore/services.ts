/**
 * Service to retrieve audio track metadata from the mock datastore.
 */

import type { TrackMetadata } from "@/datastore/datastore";
import { loadDatastore } from "@/datastore/datastore";

/**
 * Return metadata for all audio tracks.
 *
 * @returns a promise that resolves to an array of TrackMetadata objects.
 */
export async function findAllTrackMetadata(): Promise<TrackMetadata[]> {
  return loadDatastore().map((s) => ({ ...s }));
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
  return found ? { ...found } : null;
}
