#!/usr/bin/env npx ts-node

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

interface LogoGenerationOptions {
  prompt: string;
  outputPath: string;
  model?: "gemini-2.0-flash-exp" | "imagen-3.0-generate-002";
}

async function generateLogo(options: LogoGenerationOptions): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Use Gemini 2.0 Flash with image generation capabilities
  const model = genAI.getGenerativeModel({
    model: options.model || "gemini-2.0-flash-exp",
    generationConfig: {
      // @ts-ignore - responseModalities is valid for image generation
      responseModalities: ["Text", "Image"],
    },
  });

  console.log(`\nGenerating logo with prompt:\n${options.prompt.substring(0, 200)}...\n`);

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

        console.log(`Logo saved to: ${finalPath}`);
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

// Logo prompts for ScaleUp Ventures
const logoPrompts = {
  concept1: `Create a sophisticated logo for "ScaleUp Ventures", a premium business consulting firm.

ICON DESIGN:
Design an abstract geometric icon representing upward growth and scaling. The icon should feature three ascending rectangular bars or blocks arranged in a stair-step pattern, suggesting progressive growth and calculated advancement. The bars should have slightly rounded corners for approachability. The leftmost bar is shortest, middle bar is medium height, and rightmost bar is tallest - creating a clear upward trajectory.

STYLE SPECIFICATIONS:
- Clean, minimalist geometric forms with precise proportions
- Professional and premium appearance worthy of $15-25K projects
- Modern but timeless - not trendy or dated
- Balanced weight that works from favicon to signage

WORDMARK:
The text "ScaleUp Ventures" should appear to the right of or below the icon
- "ScaleUp" as one word, with slightly heavier weight
- "Ventures" in a lighter weight or different treatment
- Use a refined sans-serif typeface that feels sophisticated yet approachable
- Clean, highly legible letterforms

COLOR PALETTE (MANDATORY):
- Primary icon color: Navy #0F1729
- Accent highlight on tallest bar: Gold #D4A853
- Background: Clean white or cream #FAF8F5
- Text: Navy #0F1729

COMPOSITION:
- Square-friendly icon that can stand alone
- Horizontal lockup with wordmark
- Professional spacing and alignment
- Vector-quality clean edges

AVOID:
- Gradients, shadows, or 3D effects
- Generic clip art appearance
- Overly complex details
- Cold corporate feeling
- Anything that looks like Canva stock

OUTPUT: High-quality logo design on white background, production-ready appearance`,

  concept2: `Create an elegant logo for "ScaleUp Ventures", a trusted business consulting firm serving technology-hesitant business owners.

ICON DESIGN:
Design an abstract symbol suggesting structured growth through stacked, ascending chevrons or angular forms. Imagine 3-4 nested chevron shapes (like open-topped V shapes pointing upward) stacked vertically, each one slightly larger than the one below, creating a sense of expansion and upward momentum. The chevrons should have clean, precise angles and balanced proportions.

STYLE SPECIFICATIONS:
- Refined geometric precision with warmth
- Premium quality suggesting established expertise
- Timeless design that inspires trust and confidence
- Works seamlessly across all applications

WORDMARK:
"ScaleUp Ventures" with distinctive typography
- Consider a refined serif or elegant sans-serif
- "ScaleUp" slightly bolder, "Ventures" lighter
- Letterforms should feel sophisticated but not cold
- Excellent readability at all sizes

COLOR PALETTE (MANDATORY):
- Icon: Navy #0F1729 with gold #D4A853 accent on top chevron
- Text: Navy #0F1729
- Background: White or cream #FAF8F5

COMPOSITION:
- Icon positioned left of wordmark (horizontal lockup)
- Generous, confident spacing
- Professional proportions
- Clean, precise alignment

MOOD:
- Trustworthy and established
- Confident but not arrogant
- Approachable premium quality
- "Structured Confidence"

AVOID:
- Generic arrow imagery
- Overly corporate coldness
- Startup/tech aesthetics
- Cheap or template appearance

OUTPUT: Professional logo design, clean white background, print-ready quality`,

  concept3: `Create a distinctive logo for "ScaleUp Ventures", a consulting firm known for proving ROI before clients invest.

ICON DESIGN:
Design an abstract geometric mark suggesting calculated growth and measurable progress. Create a form using 4-5 squares or rectangles arranged in an ascending diagonal pattern - like building blocks climbing upward to the right. Each block should be precisely positioned with consistent spacing, suggesting methodical, proven growth. The arrangement should feel both stable (grounded) and dynamic (ascending).

ALTERNATIVE CONCEPT: A stylized mountain peak or summit shape created from clean geometric facets - suggesting the journey to measurable success, with a small gold accent at the peak representing achievement.

STYLE SPECIFICATIONS:
- Mathematical precision meets organic growth
- Premium, established appearance
- Distinctive and memorable
- Versatile across all media

WORDMARK:
"ScaleUp Ventures" typography
- Modern serif or humanist sans-serif
- Balanced weight distribution
- "ScaleUp" unified as single word
- Sophisticated letterforms with warmth

COLOR PALETTE (MANDATORY):
- Primary: Deep Navy #0F1729
- Accent: Warm Gold #D4A853 (used sparingly for emphasis)
- Secondary: #1A2744 for depth if needed
- Background: #FAF8F5 cream or white

BRAND ESSENCE TO CONVEY:
- "We prove it before you buy"
- Trustworthy, accountable, confident
- Serves skeptical business owners who value proof
- Premium consulting worthy of $15-25K projects

COMPOSITION:
- Balanced icon and wordmark relationship
- Professional negative space
- Works at 16px favicon to large signage
- Horizontal primary lockup

MUST AVOID:
- Circuit boards, gears, lightbulbs
- Generic stock arrow shapes
- Trendy gradients or effects
- Cold, institutional feeling
- Anything resembling Canva templates

OUTPUT: High-quality professional logo, white background, production-ready`
};

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  let conceptNum = "all";
  let outputDir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Brand Strategy/logos";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--concept" && args[i + 1]) {
      conceptNum = args[i + 1];
      i++;
    } else if (args[i] === "--output" && args[i + 1]) {
      outputDir = args[i + 1];
      i++;
    }
  }

  console.log("=".repeat(60));
  console.log("ScaleUp Ventures Logo Generation");
  console.log("=".repeat(60));
  console.log(`Output directory: ${outputDir}`);
  console.log("");

  const conceptsToGenerate = conceptNum === "all"
    ? Object.keys(logoPrompts)
    : [`concept${conceptNum}`];

  for (const conceptKey of conceptsToGenerate) {
    const prompt = logoPrompts[conceptKey as keyof typeof logoPrompts];
    if (!prompt) {
      console.error(`Unknown concept: ${conceptKey}`);
      continue;
    }

    console.log(`\n${"=".repeat(40)}`);
    console.log(`Generating ${conceptKey}...`);
    console.log("=".repeat(40));

    try {
      const outputPath = path.join(outputDir, `scaleup-ventures-${conceptKey}.png`);
      await generateLogo({
        prompt,
        outputPath,
      });
      console.log(`Successfully generated ${conceptKey}`);
    } catch (error: any) {
      console.error(`Failed to generate ${conceptKey}:`, error.message);
    }

    // Small delay between generations
    if (conceptsToGenerate.indexOf(conceptKey) < conceptsToGenerate.length - 1) {
      console.log("Waiting before next generation...");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("Logo generation complete!");
  console.log("=".repeat(60));
}

main().catch(console.error);
