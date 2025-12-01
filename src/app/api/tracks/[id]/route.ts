import { NextRequest } from "next/server";
import { findTrackMetadataById } from "@/datastore/services";

const HEADERS = { "Content-Type": "application/json" };

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
        headers: HEADERS,
      });
    }

    return new Response(JSON.stringify(trackMetadata), {
      status: 200,
      headers: HEADERS,
    });
  } catch (error: Error | unknown) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: HEADERS,
      },
    );
  }
}
