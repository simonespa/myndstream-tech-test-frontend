import Image from "next/image";
import type { Track } from "@/shared-types";

interface ComponentProp {
  tracks: Array<Track>;
}

export default function Playlist({ tracks }: ComponentProp) {
  return (
    <div className="md:w-1/2">
      <h3 className="text-xl font-semibold mb-4">Playlist</h3>
      <ul className="space-y-3">
        {tracks.map((track) => (
          <li
            key={track.id}
            className="song-item flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Image
              src={track.image}
              width={500}
              height={500}
              alt=""
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">{track.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {track.artist}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
