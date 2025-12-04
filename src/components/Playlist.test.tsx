/* eslint-disablereact/display-name */

import { render, screen, fireEvent } from "@testing-library/react";
import Playlist from "@/components/Playlist";
import type { Track } from "@/shared-types";
import { createRef } from "react";
import "@testing-library/jest-dom";

// Mock the console.log to ensure it was called (optional, but good practice)
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// Sample data for testing
const mockTracks: Array<Track> = [
  {
    id: "1",
    title: "Track A",
    artist: "Artist X",
    url: "/audio/trackA.mp3",
    image: "/images/trackA.jpg",
  },
  {
    id: "2",
    title: "Track B",
    artist: "Artist Y",
    url: "/audio/trackB.mp3",
    image: "/images/trackB.jpg",
  },
];

// Mock the HTMLAudioElement methods used in the component
const mockAudioPlay = jest.fn();

// Setup the ref object and its current value for testing
const mockAudioRef = createRef<HTMLAudioElement | null>();

// Mock implementation for the ref's current value
const mockAudioElement = {
  src: "", // Used to track the source being set
  play: mockAudioPlay,
} as unknown as HTMLAudioElement;

// Set the initial current value of the ref
mockAudioRef.current = mockAudioElement;

// Mock function for the state update
const mockSetCurrentTrack = jest.fn();

describe("Playlist", () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Clicking a track updates state and plays audio
  it("should call setCurrentTrack and audio.play() with the correct track when an item is clicked", () => {
    render(
      <Playlist
        tracks={mockTracks}
        audioRef={mockAudioRef}
        setCurrentTrack={mockSetCurrentTrack}
      />,
    );

    // Find the list item for the first track (Track A)
    const trackItemA = screen.getByText("Track A").closest("li");
    expect(trackItemA).toBeInTheDocument(); // Ensure we found the element

    // Simulate a click event on the track item
    fireEvent.click(trackItemA as HTMLElement);

    // Assert 1: setCurrentTrack was called with the correct track object
    expect(mockSetCurrentTrack).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentTrack).toHaveBeenCalledWith(mockTracks[0]);

    // Assert 2: The audio source was updated
    expect(mockAudioRef.current?.src).toBe(mockTracks[0].url);

    // Assert 3: audio.play() was called
    expect(mockAudioPlay).toHaveBeenCalledTimes(1);

    // Assert 4: console.log("ok") was called
    expect(consoleLogSpy).toHaveBeenCalledWith("ok");
  });

  // Test 2: Clicking a track handles setting the second track correctly
  it("should handle clicking the second track correctly", () => {
    render(
      <Playlist
        tracks={mockTracks}
        audioRef={mockAudioRef}
        setCurrentTrack={mockSetCurrentTrack}
      />,
    );

    // Find the list item for the second track (Track B)
    const trackItemB = screen.getByText("Track B").closest("li");

    // Simulate a click event
    fireEvent.click(trackItemB as HTMLElement);

    // Assert: setCurrentTrack was called with the second track object
    expect(mockSetCurrentTrack).toHaveBeenCalledWith(mockTracks[1]);

    // Assert: The audio source was updated to the second track's URL
    expect(mockAudioRef.current?.src).toBe(mockTracks[1].url);
  });
});
