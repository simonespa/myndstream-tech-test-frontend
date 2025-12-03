/**
 * The "progress_X" events help understand the progress through the track while being played.
 *
 * However, since users can skip ahead or rewind, "progress_X" events alone don't give a full picture of engagement.
 * Therefore, it's essential to log the "play" and "pause" events in combination with the track time the event happened,
 * to help understand user interaction and behaviour.
 */
export enum EventType {
  // Logged when the user clicks the play button or moves the scrub bar in position while the track is playing.
  // This event can happen at any point in the track, which is why it is tracked in combination with the track time.
  // IMPORTANT: It doesn't tell whether the track started from the beginning, only that playback has started.
  Play = "play",
  // Logged when the user clicks the pause button, or clicks on the scrub bar while the track is playing.
  // Like the play event, this can happen at any point in the track and it is tracked in combination with the track time.
  Pause = "pause",
  // Logged when the user reaches specific progress milestones in the track.
  // These events help track engagement, but do not necessarily tell how much of the track users have listened to.
  // It only tells that the user crossed this milestone while playing.
  // This is because users can interact with the player and skip ahead or rewind,
  // which is why the additional play and pause events are important.
  Progress0 = "progress-0", // progress 0%, equivalent to track started
  Progress25 = "progress-25", // progress 25%
  Progress50 = "progress-50", // progress 50%
  Progress75 = "progress-75", // progress 75%
  Progress100 = "progress-100", // progress 100%, equivalent to track ended
}

/**
 * The "timestamp" is used as a linear timeline of events to reconstruct user behavior over time,
 * over all tracks or a specific track given the track ID.
 *
 * The "trackTime" is used as a snapshot value and is useful in combination with the "play", "pause", and "seeked" events
 * to understand how users interact with the track.
 */
export interface Event {
  trackId: string;
  userId: string;
  timestamp: number; // Unix timestamp in milliseconds - Date.now()
  eventType: EventType;
  trackTime?: number; // current time in seconds at the time of the event
}

/**
 * The properties to be visualised on the page
 */
export interface Track {
  id: string;
  url: string;
  image: string;
  title: string;
  artist: string;
}
