"use client";

/**
 *
 * @param param0 src the source of the song
 * @returns
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio
 */
export default function Player({ src }: { src: string }) {
  return (
    <div className="p-4 border rounded shadow-md">
      <audio src={src} controls loop>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
