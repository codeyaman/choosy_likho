import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { parseFileToText } from "../parsers";
import { DURATIONS, INDUSTRIES, rotationFor, scheduleDates } from "./index";
import type { GenerateInput, GeneratedPost } from "./types";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const openRouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generatePosts(input: GenerateInput): Promise<{ posts?: GeneratedPost[], error?: string }> {
  const def = INDUSTRIES[input.industry];
  const rotation = rotationFor(input.postCount);
  const span = DURATIONS[input.duration].days;
  const dates = scheduleDates(input.postCount, span);

  let extractedText = "";
  const images: Array<{ type: "image"; image: Uint8Array; mimeType?: string }> = [];

  if (input.files) {
    for (const file of input.files) {
      if (file.type.startsWith("image/")) {
        const buffer = await file.arrayBuffer();
        images.push({
          type: "image",
          image: new Uint8Array(buffer),
          mimeType: file.type,
        });
      } else {
        const text = await parseFileToText(file);
        if (text) extractedText += `\n\n--- File: ${file.name} ---\n${text}`;
      }
    }
  }

  const scheduleContext = rotation
    .map((pillarKey, i) => {
      const pillar = def.pillars[pillarKey];
      return `Post ${i + 1}:\n- Date: ${dates[i].label} at ${pillar.time}\n- Pillar: ${pillar.label} (${pillar.category})\n`;
    })
    .join("\n");

  const prompt = `You are an elite social media content strategist.
Industry: ${def.label || input.industry}
Brand Name: ${input.brandName || "Unknown"}
Duration: ${DURATIONS[input.duration].label} (${input.postCount} posts)

Client Reference Material:
${input.reference || "None provided."}
${extractedText}

Your task is to write the captions, visual directions, and hashtags for ${input.postCount} posts according to the following schedule and content pillars:
${scheduleContext}

CRITICAL INSTRUCTION: Before generating the posts, check if the provided Brand Name and Reference Material align with the selected Industry (${def.label || input.industry}).
If the details clearly belong to a DIFFERENT industry (e.g., they selected Real Estate but provided Jewellery details), set \`isValid\` to false and provide a helpful \`errorMessage\` suggesting which industry option they should select. Do not generate the posts in this case.
If the details align, set \`isValid\` to true and generate the posts. Follow the industry best practices. Maintain the brand voice from the reference material. Ensure captions are engaging and visual directions are clear.
`;

  const hasFiles = input.files && input.files.length > 0;
  let model;
  
  // Clean the gemini model string in case the user pasted an OpenRouter string like 'gemini/gemini-1.5-pro'
  const geminiModelStr = (process.env.GEMINI_MODEL || "gemini-1.5-pro-latest").replace(/^gemini\//, "");
  const openRouterModelStr = process.env.OPENROUTER_MODEL || "openai/gpt-4o";

  if (hasFiles) {
    // If documents are uploaded, use Gemini model
    model = google(geminiModelStr);
  } else {
    // Otherwise default to OpenRouter model, or fallback to Gemini model
    model = process.env.OPENROUTER_API_KEY
      ? openRouter(openRouterModelStr)
      : google(geminiModelStr);
  }

  const { object } = await generateObject({
    model,
    schema: z.object({
      isValid: z.boolean().describe("True if the brand name and reference material align with the selected industry. False if they belong to a different industry."),
      errorMessage: z.string().optional().describe("If isValid is false, provide a message telling the user which industry they should select instead."),
      posts: z
        .array(
          z.object({
            caption: z.string().describe("The caption of the post, maintaining brand voice."),
            visualDirection: z.string().describe("Instructions for the visual component (image/video)."),
            hashtags: z.array(z.string()).describe("List of hashtags, 5-15 items."),
          })
        )
        .length(input.postCount)
        .optional()
        .describe("The generated posts. Required if isValid is true."),
    }),
    system: "You are an expert social media strategist. Evaluate industry alignment before generating content.",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...images,
        ],
      },
    ],
  });

  if (!object.isValid || !object.posts) {
    return { error: object.errorMessage || "The provided details do not match the selected industry. Please select the correct option." };
  }

  const posts = rotation.map((pillarKey, i) => {
    const pillar = def.pillars[pillarKey];
    // @ts-ignore - TS doesn't know object.posts is defined here despite the check above
    const generated = object.posts[i];
    return {
      position: i + 1,
      isoDate: dates[i].iso,
      dayLabel: dates[i].label,
      timeLabel: pillar.time,
      pillar: pillar.label,
      category: pillar.category,
      pillarKey,
      caption: generated.caption,
      visualDirection: generated.visualDirection,
      hashtags: generated.hashtags,
    };
  });

  return { posts };
}
