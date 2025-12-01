import { findAllTrackMetadata } from "@/datastore/services";

const HEADERS = { "Content-Type": "application/json" };

export async function GET() {
  try {
    const tracksMetadata = await findAllTrackMetadata();

    return new Response(JSON.stringify(tracksMetadata), {
      status: 200,
      headers: HEADERS,
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
        headers: HEADERS,
      },
    );
  }
}
