import { test, expect } from "@playwright/test";

const { describe, beforeEach } = test;

const tracks = new Map();

tracks.set("songa", {
  title: "Purple Dream",
  artist: "Ghostrifter",
});

tracks.set("songb", {
  title: "Heart Of The Ocean",
  artist: "Purrple Cat",
});

describe("Home Page", () => {
  beforeEach(async ({ page }) => {
    // Go to the home page
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Ad free spa music - Myndstream");
  });

  test("has tracks in the playlist", async ({ page }) => {
    for (const [id, track] of tracks.entries()) {
      const imageLocator = page.locator(`#track-image-${id}`);
      await expect(imageLocator).toBeVisible();

      const titleLocator = page.locator(`#track-title-${id}`);
      await expect(titleLocator).toBeVisible();
      await expect(titleLocator).toContainText(track.title);

      const artistLocator = page.locator(`#track-artist-${id}`);
      await expect(artistLocator).toBeVisible();
      await expect(artistLocator).toContainText(track.artist);
    }
  });
});
