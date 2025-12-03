import { getFingerprint, isValidData } from "@/util";

const eventStore: Set<string> = new Set();

export async function POST(request: Request) {
  try {
    let response;
    let responseStatus;

    const body = await request.json();
    const fingerprint = getFingerprint(body);

    if (isValidData(body)) {
      if (eventStore.has(fingerprint)) {
        response = {
          action: "discarded",
          reason: "The event is a duplicate.",
          fingerprint,
        };
        responseStatus = 202;
      } else {
        eventStore.add(fingerprint);

        response = {
          action: "created",
          reason: "The event is new.",
          fingerprint,
        };
        responseStatus = 201;
      }
    } else {
      response = {
        error: "Bad Request: the body is invalid",
      };
      responseStatus = 400;
    }

    return new Response(JSON.stringify(response), {
      status: responseStatus,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack || error.message);
    } else {
      console.error(error);
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
