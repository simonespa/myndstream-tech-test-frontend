# Myndstream Software Engineer Challenge

Thanks for applying to the Software Engineer position at Myndstream!

This test is designed to assess your skills as a Full Stack Software Engineer.

## What are we looking for?

We are looking for an example of how you architect and structure software in a production environment, to review the considerations and decisions you take.

We'd prefer to see a single, well architected endpoint & frontend integration. We will be looking for an example of your testing strategy so please include this.

Considerations around the following are not necessary:
- Design skills are not required - feel free to just use raw HTML elements.
- Database/persistence layer - feel free to just use a mock in memory solution

**Please do not feel like you have to complete everything. If you are short on time, please leave comments and information in a README on what you would have done given more time.**

## The Challenge

Myndstream works with a roster of artists & composers and distributes their music on their web streaming service.
A key responsibility for us is being able to **reliably** pay out royalties on this music.

We would like you to implement the following functionality:

### Backend

Build 2 REST API endpoints:

Please implement 1 endpoint to serve song metadata from the backend for each of the two tracks.

Please implement another endpoint that can keep track of listening activity for all the songs within the system.

This endpoint should accept and store the following types of listening activity events:
- **Song Started** - this event should be triggered when playback of a song begins
- **Song Listen Progress 25%** - this event should be triggered when playback of a song progresses past 25% of its duration
- **Song Listen Progress 50%** - this event should be triggered when playback of a song progresses past 50% of its duration
- **Song Listen Progress 75%** - this event should be triggered when playback of a song progresses past 75% of its duration
- **Song Listen Progress 100%** - this event should be triggered when playback of a song finishes and the whole duration of the song was played

When implementing this endpoint please take care to ensure the following:
- Listening activity is attributed back to a specific `userId`
- Duplicate requests are rejected to take steps to ensure that we do not double-count any listening activity if the frontend sends duplicate requests for the same iteration of a track being played
- When the tracks are looped, events should be recorded for that song and user pair again - we want to be able to see which songs a user has listened to over time.

### Frontend

Using the two sample songs inside this challenge please create a page that plays through the two songs on a loop e.g. in the order `Song A, Song B, Song A, ...`.

This page should report song listening activity events to the backend API endpoint.

This page should request song metadata from the backend.

## Technologies

Please use React with TypeScript on the frontend and Node.js with Typescript on the backend.

Any other technologies are optional e.g. using a persistent database (e.g. PostgreSQL) is not required.

## Submission

Once you are happy with the test, please compress it and send it over email to us.

## Music Credits

Song A:

```
Purple Dream by Ghostrifter bit.ly/ghostrifter-yt
Creative Commons — Attribution-NoDerivs 3.0 Unported — CC BY-ND 3.0
```

Song B:

```
Heart Of The Ocean by Purrple Cat | https://purrplecat.com/
Creative Commons CC BY-SA 3.0
https://creativecommons.org/licenses/by-sa/3.0/
```
