/**
 * This is a mock datastore containing metadata for the audio tracks.
 *
 * In a real application, this data would typically be stored in a database.
 * A NoSQL database, preferbly a Document-oriented one, would be the most appropriate
 * given the data structure.
 */

export interface Artist {
  name: string;
  url?: string;
}

export interface License {
  name: string;
  label: string;
  url?: string;
}

export interface TrackMetadata {
  id: string;
  url: string;
  image: string;
  title: string;
  artist: Artist;
  license: License;
}

const datastore: TrackMetadata[] = [
  {
    id: "songa",
    url: "/songa.mp3",
    image: "/songa.jpg",
    title: "Purple Dream",
    artist: {
      name: "Ghostrifter",
      url: "https://www.youtube.com/c/GhostrifterOfficial",
    },
    license: {
      name: "Creative Commons — Attribution-NoDerivs 3.0 Unported — CC BY-ND 3.0",
      label: "CC BY-ND 3.0",
      url: "https://creativecommons.org/licenses/by-nd/3.0/",
    },
  },
  {
    id: "songb",
    url: "/songb.mp3",
    image: "/songb.jpg",
    title: "Heart Of The Ocean",
    artist: {
      name: "Purrple Cat",
      url: "https://purrplecat.com/",
    },
    license: {
      name: "Creative Commons CC BY-SA 3.0",
      label: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
  },
];

export function loadDatastore(): TrackMetadata[] {
  return datastore;
}
