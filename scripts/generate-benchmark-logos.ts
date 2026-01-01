#!/usr/bin/env npx ts-node

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v3/benchmark";

interface LogoVariation {
  name: string;
  filename: string;
  prompt: string;
}

const benchmarkVariations: LogoVariation[] = [
  {
    name: "BENCHMARK-SOLID",
    filename: "benchmark-solid.png",
    prompt: `Professional logo mark: A solid navy blue equilateral triangle with a gold horizontal line crossing through the lower third of the triangle. Surveyor benchmark symbol. The triangle is completely filled with solid navy blue color #0F1729. The gold horizontal line #D4A853 passes through the triangle at approximately one-third height from the bottom, extending slightly beyond the triangle edges on both sides. Geometric precision, flat design, minimal, NO gradients, NO shadows, NO 3D effects, clean sharp edges. Centered on PURE WHITE background #FFFFFF. Corporate professional services aesthetic. Vector style logo mark. Aspect ratio 1:1.

CRITICAL REQUIREMENTS:
- Triangle: Solid fill navy #0F1729
- Horizontal benchmark line: Gold #D4A853
- Background: PURE WHITE #FFFFFF only
- Style: Completely flat, solid colors only
- NO text, NO gradients, NO shadows, NO 3D effects`
  },
  {
    name: "BENCHMARK-OUTLINE",
    filename: "benchmark-outline.png",
    prompt: `Professional logo mark: A navy blue triangle outline (not filled, just the border stroke) with a gold horizontal line crossing through the lower third. Surveyor benchmark symbol. The triangle is drawn as an outline/stroke only in navy blue #0F1729, not filled. The gold horizontal line #D4A853 passes through the triangle at approximately one-third height from the bottom, extending slightly beyond the triangle edges on both sides. Geometric precision, flat design, minimal, NO gradients, NO shadows, NO 3D effects, clean sharp edges. Centered on PURE WHITE background #FFFFFF. Corporate professional services aesthetic. Vector style logo mark. Aspect ratio 1:1.

CRITICAL REQUIREMENTS:
- Triangle: Outline/stroke only, navy #0F1729, NOT filled
- Horizontal benchmark line: Gold #D4A853
- Background: PURE WHITE #FFFFFF only
- Style: Completely flat, solid colors only
- NO text, NO gradients, NO shadows, NO 3D effects`
  }
];

async function generateLogo(variation: LogoVariation): Promise<string | null> {
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Use Gemini 2.0 Flash with image generation capabilities
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      // @ts-ignore - responseModalities is valid for image generation
      responseModalities: ["Text", "Image"],
    },
  });

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Generating: ${variation.name}`);
  console.log("=".repeat(60));
  console.log(`Prompt preview: ${variation.prompt.substring(0, 150)}...`);

  try {
    const response = await model.generateContent(variation.prompt);
    const result = response.response;

    const parts = result.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      // @ts-ignore
      if (part.inlineData) {
        // @ts-ignore
        const imageData = part.inlineData.data;
        // @ts-ignore
        const mimeType = part.inlineData.mimeType;

        const ext = mimeType.includes("png") ? ".png" : ".jpg";
        const finalFilename = variation.filename.replace(/\.(png|jpg|jpeg)$/i, "") + ext;
        const finalPath = path.join(OUTPUT_DIR, finalFilename);

        // Ensure directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        // Save the image
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(finalPath, buffer);

        console.log(`\nSUCCESS: Logo saved to: ${finalPath}`);
        return finalPath;
      }

      // @ts-ignore
      if (part.text) {
        // @ts-ignore
        console.log("Model response:", part.text);
      }
    }

    console.error("ERROR: No image was generated in the response");
    return null;
  } catch (error: any) {
    console.error(`ERROR generating ${variation.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("ScaleUp Ventures - BENCHMARK Logo Generation");
  console.log("=".repeat(60));
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Generating ${benchmarkVariations.length} variations...`);

  const results: { name: string; path: string | null }[] = [];

  for (const variation of benchmarkVariations) {
    const outputPath = await generateLogo(variation);
    results.push({ name: variation.name, path: outputPath });

    // Delay between generations
    if (benchmarkVariations.indexOf(variation) < benchmarkVariations.length - 1) {
      console.log("\nWaiting 3 seconds before next generation...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("GENERATION SUMMARY");
  console.log("=".repeat(60));

  for (const result of results) {
    const status = result.path ? "SUCCESS" : "FAILED";
    console.log(`${status}: ${result.name}`);
    if (result.path) {
      console.log(`       -> ${result.path}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("Logo generation complete!");
  console.log("=".repeat(60));
}

main().catch(console.error);
