import Image from "next/image";
import type { Track } from "@/shared-types";
import type { RefObject } from "react";

interface ComponentProp {
  tracks: Array<Track>;
  audioRef: RefObject<HTMLAudioElement | null>;
  setCurrentTrack: (track: Track) => void;
}

export default function Playlist({
  tracks,
  audioRef,
  setCurrentTrack,
}: ComponentProp) {
  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const index = tracks.findIndex(
      (track) => event.currentTarget.id === `track-${track.id}`,
    );
    if (index === -1) return;

    const newTrack = tracks[index];
    setCurrentTrack(newTrack);

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = newTrack.url;
    audio.play();

    console.log("ok");
  };

  return (
    <div className="md:w-1/2">
      <h3 className="text-xl font-semibold mb-4">Playlist</h3>
      <ul className="space-y-3">
        {tracks.map((track) => (
          <li
            key={track.id}
            id={`track-${track.id}`}
            onClick={handleClick}
            className="song-item flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Image
              id={`track-image-${track.id}`}
              src={track.image}
              width={500}
              height={500}
              alt=""
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="flex-1">
              <div id={`track-title-${track.id}`} className="font-medium">
                {track.title}
              </div>
              <div
                id={`track-artist-${track.id}`}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {track.artist}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
