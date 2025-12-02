"use client";

import Player from "@/components/Player";

export default function Home() {
  const tracks = ["/songa.mp3", "/songb.mp3"];

  return <Player tracks={tracks} />;
}
