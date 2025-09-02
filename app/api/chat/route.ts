import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, threadId } = await req.json();

    const response = await fetch(
      "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          Connection: "keep-alive",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify({
          messages,
          threadId,
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          resourceId: "weatherAgent",
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "API error", status: response.status },
        { status: response.status }
      );
    }


    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("API call failed", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
