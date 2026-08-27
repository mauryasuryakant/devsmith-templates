import { NextRequest, NextResponse } from "next/server";
import type { CardData } from "@/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  console.log(`Calling Cards API: q=${q}`);

  try {
    const wikipediaResult = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${q}`
    ).then((response) => response.json());

    const isWikipedia =
      wikipediaResult &&
      wikipediaResult?.description !== "Topics referred to by the same term" &&
      wikipediaResult.title !== "Not found.";

    if (isWikipedia) {
      return NextResponse.json<CardData>({
        image: wikipediaResult?.thumbnail?.source ?? null,
        title: wikipediaResult.title,
        description: wikipediaResult.description,
        content: wikipediaResult.extract_html,
        type: "wiki",
      });
    }

    const openAIResult = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Write a answer for this query if any answer not available then return na. Query:\n ${q}\n Answer: \n`,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .catch(() => null);

    if (openAIResult?.choices?.length > 0) {
      if (openAIResult.choices[0].text.toLowerCase() === "na") {
        return NextResponse.json({ message: "Not found!" }, { status: 404 });
      }

      return NextResponse.json<CardData>({
        image: null,
        title: q,
        content: openAIResult.choices[0].text.replace(/(?:\r\n|\r|\n)/g, "<br>"),
        description: null,
        type: "ai",
      });
    }

    return NextResponse.json({ message: "Not found!" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error!" }, { status: 500 });
  }
}
