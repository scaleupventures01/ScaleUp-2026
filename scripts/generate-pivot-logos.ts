#!/usr/bin/env npx ts-node

/**
 * PIVOT Logo Generation Script for ScaleUp Ventures
 * Generates 3 variations of the PIVOT concept using Gemini API
 *
 * Based on Creative Brief v3 specifications:
 * - Background: PURE WHITE (#FFFFFF)
 * - Bar Color: Navy (#0F1729)
 * - Pivot Point: Gold circle (#D4A853)
 * - Style: Flat, solid, NO gradients, NO shadows, NO 3D effects
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "..", ".env") });

interface PivotVariation {
  name: string;
  filename: string;
  barDescription: string;
  prompt: string;
}

// Base prompt template optimized for PIVOT concept
const createPivotPrompt = (barDescription: string): string => {
  return `Professional logo mark: Two navy blue bars meeting at gold circle point, one bar horizontal extending left, one bar angled 40 degrees upward to right, ${barDescription}, geometric precision, flat design, no gradients, no shadows, centered on pure white background, corporate professional services, navy blue bars #0F1729, gold circle #D4A853, vector style clean edges, minimalist, aspect ratio 1:1, logo design, professional branding

CRITICAL REQUIREMENTS:
- Background MUST be pure white #FFFFFF
- Navy bars color: #0F1729
- Gold pivot circle color: #D4A853
- Both bars same thickness
- Bars meet at the gold circle (pivot point)
- Horizontal bar extends LEFT from center
- Angled bar extends UP and RIGHT at 40 degrees
- No gradients, no shadows, no 3D effects
- Clean geometric precision
- Flat solid colors only

Negative prompt: no gradients, no shadows, no 3D effects, no text, no busy background, no additional decorative elements, no realistic textures, no patterns`;
};

// Define the three PIVOT variations
const pivotVariations: PivotVariation[] = [
  {
    name: "PIVOT-STANDARD",
    filename: "pivot-standard.png",
    barDescription: "both bars medium thickness (standard weight), balanced proportions",
    prompt: createPivotPrompt("both bars medium thickness (standard weight), balanced proportions")
  },
  {
    name: "PIVOT-BOLD",
    filename: "pivot-bold.png",
    barDescription: "both bars thick and bold (heavy weight), strong presence, substantial bars",
    prompt: createPivotPrompt("both bars thick and bold (heavy weight), strong presence, substantial bars")
  },
  {
    name: "PIVOT-REFINED",
    filename: "pivot-refined.png",
    barDescription: "both bars thin and elegant (light weight), refined delicate lines",
    prompt: createPivotPrompt("both bars thin and elegant (light weight), refined delicate lines")
  }
];

async function generatePivotLogo(
  genAI: GoogleGenerativeAI,
  variation: PivotVariation,
  outputDir: string
): Promise<string | null> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      // @ts-ignore - responseModalities is valid for image generation
      responseModalities: ["Text", "Image"],
    },
  });

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Generating: ${variation.name}`);
  console.log(`Description: ${variation.barDescription}`);
  console.log("=".repeat(50));

  try {
    const response = await model.generateContent(variation.prompt);
    const result = response.response;

    const parts = result.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      // @ts-ignore - inlineData exists on image parts
      if (part.inlineData) {
        // @ts-ignore
        const imageData = part.inlineData.data;
        // @ts-ignore
        const mimeType = part.inlineData.mimeType;

        const ext = mimeType.includes("png") ? ".png" : ".jpg";
        const finalFilename = variation.filename.replace(/\.(png|jpg|jpeg)$/i, "") + ext;
        const finalPath = path.join(outputDir, finalFilename);

        // Ensure directory exists
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        // Save the image
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(finalPath, buffer);

        console.log(`SUCCESS: Saved to ${finalPath}`);
        return finalPath;
      }

      // Log any text response
      // @ts-ignore
      if (part.text) {
        // @ts-ignore
        console.log("Model note:", part.text);
      }
    }

    console.log("WARNING: No image was generated in the response");
    return null;
  } catch (error: any) {
    console.error(`ERROR generating ${variation.name}:`, error.message);
    return null;
  }
}

async function main() {
  // Get API key from environment
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("ERROR: GOOGLE_API_KEY or GEMINI_API_KEY environment variable is required");
    console.error("Please set the API key in your .env file");
    process.exit(1);
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  let outputDir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v3/pivot";

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--output" || args[i] === "-o") && args[i + 1]) {
      outputDir = args[i + 1];
      i++;
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("ScaleUp Ventures - PIVOT Logo Generation");
  console.log("Creative Brief v3 Specifications");
  console.log("=".repeat(60));
  console.log(`Output directory: ${outputDir}`);
  console.log("\nColor Specifications:");
  console.log("  - Background: Pure White (#FFFFFF)");
  console.log("  - Bars: Navy (#0F1729)");
  console.log("  - Pivot Point: Gold (#D4A853)");
  console.log("\nVariations to generate:");
  pivotVariations.forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.name}: ${v.barDescription}`);
  });

  const genAI = new GoogleGenerativeAI(apiKey);
  const results: { name: string; path: string | null }[] = [];

  for (const variation of pivotVariations) {
    const resultPath = await generatePivotLogo(genAI, variation, outputDir);
    results.push({ name: variation.name, path: resultPath });

    // Delay between generations to avoid rate limiting
    if (pivotVariations.indexOf(variation) < pivotVariations.length - 1) {
      console.log("\nWaiting 3 seconds before next generation...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("GENERATION COMPLETE - SUMMARY");
  console.log("=".repeat(60));

  const successful = results.filter(r => r.path !== null);
  const failed = results.filter(r => r.path === null);

  console.log(`\nSuccessful: ${successful.length}/${results.length}`);
  successful.forEach(r => {
    console.log(`  - ${r.name}: ${r.path}`);
  });

  if (failed.length > 0) {
    console.log(`\nFailed: ${failed.length}/${results.length}`);
    failed.forEach(r => {
      console.log(`  - ${r.name}`);
    });
  }

  console.log("\n" + "=".repeat(60));
}

main().catch(console.error);
