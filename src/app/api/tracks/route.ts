import { findAllTrackMetadata } from "@/datastore/queries";

const HEADERS = {
  "Content-Type": "application/json",
};

const CACHE = {
  "Cache-Control":
    "public, max-age=60, stale-while-revalidate=30, stale-if-error=30",
};

const NO_CACHE_REVALIDATE = {
  "Cache-Control": "no-cache",
};

export async function GET() {
  try {
    const tracksMetadata = await findAllTrackMetadata();

    return new Response(JSON.stringify(tracksMetadata), {
      status: 200,
      headers: { ...HEADERS, ...CACHE },
    });
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error("Error in GET /api/tracks:", error.stack || error.message);
    } else {
      console.error("Unknown error in GET /api/tracks:", error);
    }

    return new Response(
      JSON.stringify({
        error: "Failed to fetch tracks metadata",
      }),
      {
        status: 500,
        headers: { ...HEADERS, ...NO_CACHE_REVALIDATE },
      },
    );
  }
}
