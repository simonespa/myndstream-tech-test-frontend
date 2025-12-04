- [Myndstream Software Engineer Challenge (Solution)](#myndstream-software-engineer-challenge-solution)
   * [Frontend](#frontend)
   * [Backend](#backend)
   * [Analytics](#analytics)
      + [Play event](#play-event)
      + [Pause event](#pause-event)
      + [Progress X events](#progress-x-events)
      + [Data Fetching: sendBeacon](#data-fetching-sendbeacon)
   * [Improvements](#improvements)

# Myndstream Software Engineer Challenge (Solution)

I used Next.js to implement a full-stack solution, to provide a seamless frontend/backend interaction, using modern web technologies. The app is entirely written in Typescript, and the frontend is built using React, while for styling I decided to use TailwindCSS.

## Frontend

The application has only one page that contains:

- the playlist of the available tracks, showing the track image, title and artist
- the audio player
- the preview of the track currently being selected

The playlist is populated by fetching the `/api/tracks` endpoint. This endpoint returns the list of available tracks being provided for this test. The fetching happens client-side using [SWR](https://swr.vercel.app/), a library that provides:

- caching
- request deduplication
- data revalidation on focus or network recovery
- retry on error

An alternative I considered was [TanStack Query](https://tanstack.com/query/latest) (formerly React Query), but SWR was a better choice for this simple solution, and more lightweight.

The user can play by either clicking on one of the tracks in the playlist, or by simply interacting with the player controls. In both cases, once the stream starts, the player will loop through all the available tracks until is stopped by the user. Any user interaction with the player is captured and sent to the analytics endpoint.

## Backend

The REST endpoints to retrieve tracks metadata;
- `GET /api/tracks` to fetch all tracks from the playlist
- `GET /api/tracks/:id` to fetch a single track given the ID (although not used in the project, is typical REST design to structure the API as resources)

The analytics endpoint:
- `POST /api/events` to post the user behaviours and track analytics

All endpoints provide error handling and caching. An endpoint worth discussing is the `/api/events` one, which can detect duplicate events and discard them (as per requirements). The de-duplication mechanism is achieved by hashing the payload in order to create a unique fingerprint of the event. This fingerprint is saved in memory (in production we could use a caching layer like Redis or an in-memory db for faster lookups) and queried every time a new request is received, to check whether the event has been already persisted or not.

An additional feature is the data validation. This endpoint validates the payload against a JSON schema and discards the ones that don't follow the specification. This allows for further filtering, to avoid having to process malformed data. The endpoint returns a specific HTTP status for each of these cases for best practice, informing the client of the action taken. In this implementation, because I use `sendBeacon`, the client doesn't get or need the response by design, in a send-and-forget fashion.

## Analytics

I structured the event payload as follows:

```ts
export interface Event {
  trackId: string;
  userId: string;
  timestamp: number; // Unix timestamp in milliseconds - Date.now()
  eventType: EventType;
  trackTime?: number; // current time in seconds at the time of the event
}
```

The "progress_X" events help understand the progress through the track while being played. However, since users can interact with the player controls and skip ahead or rewind, "progress_X" events alone don't give a full picture of engagement. Therefore, I decided to add the `play` and `pause` events in combination with the `trackTime` and the `timestamp` to enhance the analysis of user interaction and behaviour over time.

Because a user can skip forward or backward, I created a "smart reset" mechanism of the progress milestone, so that:

- If the user seeks BACKWARDS, the app allows previously reached milestones to be logged again.
- If the user seeks FORWARDS, the app ensures that any milestones that were skipped over are not logged.

NOTE: this assumption is based on the idea that "progress_X" events should reflect milestones being crossed while playing.

As requested, each event carries the track and user id.

CAVEAT: the user id is passed statically in page as I decided not to implement the login page together with the authentication process and the session management for simplicity. An improvement would see the `userId` value being passed from the session.

The `eventType` can assume one of the following values: `play|pause|progress-0|progress-25|progress-50|progress-75|progress-100`.

### Play event

It is logged when the user clicks the play button or moves the scrub bar in position while the track is playing. This event can happen at any point in the track, which is why it is tracked in combination with the `trackTime`.

IMPORTANT: It doesn't tell whether the track started from the beginning, only that playback has started.

### Pause event

It is logged when the user clicks the pause button, or clicks on the scrub bar while the track is playing. Like the play event, this can happen at any point in the track and it is logged in combination with the `trackTime`.

### Progress X events

The app calculates and trackes the following progress milestones: 0% (equivalent to track started), 25%, 50%, 75, 100% (equivalent to track ended).

These events are logged when the user reaches specific progress milestones in the track while playing. These events help track engagement, but do not necessarily tell how much of the track the user have listened to. Because users can skip forward and backward, these events can only tell that the user crossed a specific milestone while playing, but not necessarily that it listened 25% of the track, which is why the additional play and pause events are important.

### Data Fetching: sendBeacon

The events are sent using [`navigator.sendBeacon`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon). It's intended to be used for sending analytics data to a web server, and avoids some of the problems with other techniques for sending analytics like `fetch`. With the `sendBeacon()` method, the data is transmitted asynchronously when the user agent has an opportunity to do so, without delaying unload or the next navigation. This means:

- The data is sent reliably
- It's sent asynchronously
- It doesn't impact the loading of the next page

## Improvements

- Use of server component to serve the landing page. The client bundle will be lighter and the initial data can be served from the server.
- Use Server Actions to fetch the playlist instead of fetching them from the backend.
