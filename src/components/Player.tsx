"use client";

import { SyntheticEvent } from "react";

interface ComponentProp {
  tracks: Array<string>;
}

/**
 *
 * @param param0 src the source of the song
 * @returns
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio
 */
export default function Player({ tracks }: ComponentProp) {
  function handleEndedEvent(
    event: SyntheticEvent<HTMLAudioElement, Event>,
  ): void {
    const audio = event.currentTarget as HTMLAudioElement;
    if (!tracks || tracks.length === 0) return;

    const currentSrc = audio.src || "";

    // Try to find the current track in the list (match by src)
    const currentIndex = tracks.findIndex((src) => {
      try {
        return currentSrc.endsWith(src);
      } catch {
        return false;
      }
    });

    // If not found, start from the first track; otherwise advance to the next (wrap around)
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tracks.length;
    audio.src = tracks[nextIndex];
    audio.play();
  }

  return (
    <div className="p-4 border rounded shadow-md">
      <audio src={tracks[0]} controls onEnded={handleEndedEvent}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
