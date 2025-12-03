"use client";

import Player from "@/components/Player";
import { TrackMetadata } from "@/datastore/datastore";
import useSWR from "swr";
import fetcher from "@/fetcher";

interface Track {
  id: TrackMetadata["id"];
  url: TrackMetadata["url"];
}

export default function Home() {
  const { data, error } = useSWR("/api/tracks", fetcher);

  if (error) return "An error has occurred.";

  let tracks: Track[] = [];

  if (Array.isArray(data)) {
    tracks = (data as TrackMetadata[]).map((track: TrackMetadata) => {
      return {
        id: track.id,
        url: track.url,
      };
    });
  }

  return <Player tracks={tracks} userId="monsai" />;
}
