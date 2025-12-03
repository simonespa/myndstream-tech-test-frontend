"use client";

import { useRef } from "react";
import { sendEvent } from "@/activities";
import { EventType } from "@/events";
import type { TrackMetadata } from "@/datastore/datastore";

interface ComponentProp {
  tracks: Array<{
    id: TrackMetadata["id"];
    url: TrackMetadata["url"];
  }>;
  userId: string;
}

/**
 * Renders an audio media player.
 *
 * @param tracks list of track sources to pass to the "src" property of the player
 * @returns the player component
 */
export default function Player({ tracks, userId }: ComponentProp) {
  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reference to a "Set" data structure that tracks which milestones have been logged
  const milestonesRef = useRef(new Set());

  // Reference to track if the user is currently seeking
  // This flag is used to prevent logging milestones while the user is scrubbing through the track
  const isSeekingRef = useRef(false);

  // Define the progress milestones (in %) we care about
  const progressMilestones: Array<number> = [0, 25, 50, 75, 100];

  const handleTimeUpdate = () => {
    // If the user is seeking, don't log anything.
    if (isSeekingRef.current) return;

    const audio: HTMLAudioElement | null = audioRef.current;

    // Avoid calculations if the audio hasn't been referenced or the duration is NaN (audio is loading)
    if (!audio || !audio.duration) return;

    // Calculate the percentage of audio being played so far
    const progress = (audio.currentTime / audio.duration) * 100;

    progressMilestones.forEach((milestone) => {
      // Log only if we have reached the % milestone AND it hasn't been logged yet
      if (progress >= milestone && !milestonesRef.current.has(milestone)) {
        const eventKey = `Progress${milestone}` as keyof typeof EventType;
        sendEvent({
          userId,
          trackId: audio.dataset.trackId as string,
          timestamp: Date.now(),
          eventType: EventType[eventKey],
        });
        milestonesRef.current.add(milestone);
      }
    });
  };

  // Start Seeking: user grabs the bar
  const handleSeeking = () => {
    isSeekingRef.current = true;
  };

  // End Seeking: user releases the bar
  const handleSeeked = () => {
    isSeekingRef.current = false;

    const audio: HTMLAudioElement | null = audioRef.current;

    if (!audio || !audio.duration) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    /**
     * ASSUMPTION: Smart Reset of Milestones
     *
     * When the user seeks to a new position in the track, we need to adjust our milestone tracking.
     * If the user seeks BACKWARDS, we should allow previously reached milestones to be logged again.
     * If the user seeks FORWARDS, we should ensure that any milestones that were skipped over are not logged.
     *
     * NOTE: this assumption is based on the idea that "progress_X" events should reflect milestones being crossed while playing.
     */

    // Update milestones based on current progress
    progressMilestones.forEach((point) => {
      // [Seek forward]: add milestones that have been skipped over
      if (progress >= (point as number)) {
        milestonesRef.current.add(point);
      }
      // [Seek backward]: remove milestones that were reached but are now ahead
      if (progress < (point as number)) {
        milestonesRef.current.delete(point);
      }
    });

    if (progress === 0) {
      milestonesRef.current.delete(0);
    } else if (progress == 100) {
      milestonesRef.current.delete(100);
    }
  };

  const handleEnded = () => {
    // Reset milestones tracking to capture future "progress_X" milestones during loops
    milestonesRef.current.clear();

    const audio: HTMLAudioElement | null = audioRef.current;
    if (!tracks || tracks.length === 0 || !audio) return;

    const currentSrc = audio.src || "";

    // Try to find the current track in the list (match by src)
    const currentIndex = tracks.findIndex((track) => {
      try {
        return currentSrc.endsWith(track.url);
      } catch {
        return false;
      }
    });

    // If not found, start from the first track; otherwise advance to the next (wrap around)
    const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % tracks.length;
    audio.src = tracks[nextIndex].url;
    audio.dataset.trackId = tracks[nextIndex].id;
    audio.play();
  };

  const handlePlay = () => {
    const audio: HTMLAudioElement | null = audioRef.current;
    if (audio && audio.currentTime > 0) {
      sendEvent({
        userId,
        trackId: audio.dataset.trackId as string,
        timestamp: Date.now(),
        eventType: EventType.Play,
        trackTime: audio.currentTime,
      });
    }
  };

  const handlePause = () => {
    const audio: HTMLAudioElement | null = audioRef.current;
    if (audio && audio.currentTime < audio.duration) {
      sendEvent({
        userId,
        trackId: audio.dataset.trackId as string,
        timestamp: Date.now(),
        eventType: EventType.Pause,
        trackTime: audio.currentTime,
      });
    }
  };

  // The tracks are streamed client side
  const atLeastOneElement = tracks && tracks.length > 0;

  return (
    <div className="p-4 border rounded shadow-md">
      <audio
        src={atLeastOneElement ? tracks[0].url : undefined}
        data-track-id={atLeastOneElement ? tracks[0].id : undefined}
        ref={audioRef}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        // tracks "progress_X" events
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
