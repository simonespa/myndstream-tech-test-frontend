import { NextRequest } from "next/server";
import { findTrackMetadataById } from "@/datastore/queries";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = ((await params)?.id).trim();

    const trackMetadata = await findTrackMetadataById(id);

    if (!trackMetadata) {
      return new Response(JSON.stringify({ error: "Track not found" }), {
        status: 404,
        headers: { ...HEADERS, ...CACHE },
      });
    }

    return new Response(JSON.stringify(trackMetadata), {
      status: 200,
      headers: { ...HEADERS, ...CACHE },
    });
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      console.error(
        "Error in GET /api/tracks/:id ",
        error.stack || error.message,
      );
    } else {
      console.error("Unknown error in GET /api/tracks/:id ", error);
    }

    return new Response(
      JSON.stringify({
        error: "Failed to fetch track metadata",
      }),
      {
        status: 500,
        headers: { ...HEADERS, ...NO_CACHE_REVALIDATE },
      },
    );
  }
}
