#!/usr/bin/env npx ts-node

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

interface LogoGenerationOptions {
  prompt: string;
  outputPath: string;
  name: string;
}

async function generateLogo(options: LogoGenerationOptions): Promise<string> {
  // Load API key from .env file
  const envPath = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/.env";
  const envContent = fs.readFileSync(envPath, "utf-8");
  const apiKeyMatch = envContent.match(/GOOGLE_API_KEY=(.+)/);
  const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY not found in .env file");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Use Gemini 2.0 Flash with image generation capabilities
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      // @ts-ignore - responseModalities is valid for image generation
      responseModalities: ["Text", "Image"],
    },
  });

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Generating: ${options.name}`);
  console.log("=".repeat(60));
  console.log(`Prompt:\n${options.prompt.substring(0, 300)}...\n`);

  try {
    const response = await model.generateContent(options.prompt);
    const result = response.response;

    // Extract image from response
    const parts = result.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      // @ts-ignore - inlineData exists on image parts
      if (part.inlineData) {
        // @ts-ignore
        const imageData = part.inlineData.data;
        // @ts-ignore
        const mimeType = part.inlineData.mimeType;

        // Determine file extension
        const ext = mimeType.includes("png") ? ".png" : ".jpg";
        const finalPath = options.outputPath.replace(/\.(png|jpg|jpeg)$/i, "") + ext;

        // Ensure directory exists
        const dir = path.dirname(finalPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Save the image
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(finalPath, buffer);

        console.log(`SUCCESS: Logo saved to: ${finalPath}`);
        return finalPath;
      }

      // Log any text response
      // @ts-ignore
      if (part.text) {
        // @ts-ignore
        console.log("Model response:", part.text);
      }
    }

    throw new Error("No image was generated in the response");
  } catch (error: any) {
    console.error("Generation error:", error.message);
    throw error;
  }
}

// KEYSTONE Logo Variations for ScaleUp Ventures - v3 Creative Brief
const keystonePrompts = {

  // VARIATION 1: KEYSTONE-PURE - Just the solid gold trapezoid
  "KEYSTONE-PURE": `Professional logo mark: Single solid gold trapezoid shape (keystone), wider at top narrower at bottom, geometric precision, flat design, no gradients, no shadows, no text, minimal, centered on pure white background, corporate professional services, solid gold fill color hex #D4A853, clean sharp edges, vector style logo, scalable, premium business branding, aspect ratio 1:1.

CRITICAL REQUIREMENTS:
- Shape: Trapezoid (keystone shape) - wider at top, narrower at bottom
- Fill: Solid gold #D4A853 only - NO gradients, NO shadows, NO 3D effects
- Background: PURE WHITE #FFFFFF only - absolutely mandatory
- Style: Completely flat, clean geometric precision
- Proportions: Top edge wider than bottom edge, approximately 60% ratio
- Corners: Sharp corners, no rounded edges
- NO text, NO additional elements, just the gold trapezoid shape
- Vector-quality clean edges suitable for professional use

NEGATIVE PROMPTS (avoid these):
- NO gradients of any kind
- NO shadows or drop shadows
- NO 3D effects or dimension
- NO texture or patterns
- NO additional shapes or elements
- NO text or lettering
- NO busy or colored backgrounds
- NO decorative details`,

  // VARIATION 2: KEYSTONE-DIMENSIONAL - Gold trapezoid with subtle darker gold edge
  "KEYSTONE-DIMENSIONAL": `Professional logo mark: Gold trapezoid shape (keystone) with subtle right edge dimension, wider at top narrower at bottom, geometric precision, flat design, minimal, centered on pure white background, corporate professional services aesthetic, scalable vector style, aspect ratio 1:1.

CRITICAL REQUIREMENTS:
- Shape: Trapezoid (keystone shape) - wider at top, narrower at bottom
- Main fill: Solid gold #D4A853
- Right edge accent: Thin strip of darker muted gold #B8956E on right side only, approximately 8% of total width
- This creates subtle impression of depth/substance WITHOUT being 3D
- Background: PURE WHITE #FFFFFF only - absolutely mandatory
- Style: Flat design with subtle 2-color dimensional accent
- Proportions: Top edge wider than bottom edge
- Corners: Sharp corners, no rounded edges
- NO text, NO additional elements besides the two-tone keystone
- Vector-quality clean edges

TECHNICAL SPECS:
- Main gold fill: #D4A853
- Right edge accent: #B8956E (8% width of shape)
- Background: #FFFFFF pure white
- No gradients between the two gold tones - sharp edge where they meet
- Clean geometric precision

NEGATIVE PROMPTS (avoid these):
- NO gradient blending between colors
- NO shadows or drop shadows
- NO 3D perspective or effects
- NO texture or patterns
- NO additional shapes
- NO text
- NO colored backgrounds`,

  // VARIATION 3: KEYSTONE-OUTLINE - Gold trapezoid with thin navy outline
  "KEYSTONE-OUTLINE": `Professional logo mark: Gold trapezoid shape (keystone) with thin navy blue outline, wider at top narrower at bottom, geometric precision, flat design, minimal, centered on pure white background, corporate professional services aesthetic, scalable vector style, aspect ratio 1:1.

CRITICAL REQUIREMENTS:
- Shape: Trapezoid (keystone shape) - wider at top, narrower at bottom
- Fill: Solid gold #D4A853
- Outline: Thin navy blue #0F1729 stroke around entire shape, clean precise line
- Outline weight: Thin but visible, approximately 2-3% of shape height
- Background: PURE WHITE #FFFFFF only - absolutely mandatory
- Style: Flat design, gold fill with contrasting navy outline
- Proportions: Top edge wider than bottom edge
- Corners: Sharp corners, no rounded edges
- NO text, NO additional elements
- Vector-quality clean edges

TECHNICAL SPECS:
- Gold fill: #D4A853
- Navy outline: #0F1729
- Background: #FFFFFF pure white
- Outline should be crisp and consistent width all around
- Clean geometric precision

NEGATIVE PROMPTS (avoid these):
- NO gradients
- NO shadows or drop shadows
- NO 3D effects
- NO texture or patterns
- NO additional shapes or decorations
- NO text
- NO colored backgrounds
- NO thick or irregular outline`
};

async function main() {
  const outputDir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v3/keystone";

  console.log("=".repeat(70));
  console.log("ScaleUp Ventures - KEYSTONE Logo Generation v3");
  console.log("=".repeat(70));
  console.log(`\nOutput directory: ${outputDir}`);
  console.log(`\nGenerating 3 KEYSTONE variations per Creative Brief v3:\n`);
  console.log("1. KEYSTONE-PURE: Solid gold trapezoid only");
  console.log("2. KEYSTONE-DIMENSIONAL: Gold trapezoid with muted gold right edge");
  console.log("3. KEYSTONE-OUTLINE: Gold trapezoid with navy outline");
  console.log("\n" + "=".repeat(70));

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  const results: { name: string; path?: string; error?: string }[] = [];

  for (const [name, prompt] of Object.entries(keystonePrompts)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").substring(0, 19);
    const filename = `${name.toLowerCase()}-${timestamp}.png`;
    const outputPath = path.join(outputDir, filename);

    try {
      const savedPath = await generateLogo({
        prompt,
        outputPath,
        name,
      });
      results.push({ name, path: savedPath });
    } catch (error: any) {
      console.error(`\nFAILED: ${name} - ${error.message}`);
      results.push({ name, error: error.message });
    }

    // Delay between generations to avoid rate limiting
    console.log("\nWaiting 3 seconds before next generation...\n");
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Summary
  console.log("\n" + "=".repeat(70));
  console.log("GENERATION SUMMARY");
  console.log("=".repeat(70));

  for (const result of results) {
    if (result.path) {
      console.log(`[SUCCESS] ${result.name}: ${result.path}`);
    } else {
      console.log(`[FAILED] ${result.name}: ${result.error}`);
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log("Keystone logo generation complete!");
  console.log("=".repeat(70));
}

main().catch(console.error);
