"use client";

import Player from "@/components/Player";
import { TrackMetadata } from "@/datastore/db";
import useSWR from "swr";
import fetcher from "@/fetcher";
import type { Track } from "@/shared-types";
import Playlist from "@/components/Playlist";
import { useRef, useState } from "react";

export default function Home() {
  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, error } = useSWR("/api/tracks", fetcher);
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined,
  );

  if (error) return "An error has occurred.";

  let tracks: Track[] = [];

  if (Array.isArray(data)) {
    tracks = (data as TrackMetadata[]).map((track: TrackMetadata) => {
      return {
        id: track.id,
        url: track.url,
        image: track.image,
        title: track.title,
        artist: track.artist.name,
      };
    });
  }

  const atLeastOneTrack = tracks && tracks.length;
  if (atLeastOneTrack && !currentTrack) {
    setCurrentTrack(tracks[0]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Playlist
            tracks={tracks}
            audioRef={audioRef}
            setCurrentTrack={setCurrentTrack}
          />

          <Player
            tracks={tracks}
            audioRef={audioRef}
            userId="monsai"
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        </div>
      </div>
    </div>
  );
}
