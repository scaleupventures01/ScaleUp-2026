#!/usr/bin/env node

/**
 * ScaleUp Ventures - Nested Chevrons Logo Generation
 * 3 Variations: Conservative, Distinctive, Maximum Creativity
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Configuration
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos";

// Brand colors
const BRAND = {
  navy: "#0F1729",
  gold: "#D4A853",
  mutedGold: "#B8956E",
  cream: "#FAF8F5"
};

// Nested Chevrons Logo Prompts - 3 Variations
const chevronPrompts = {
  "chevrons-1": {
    name: "Conservative - Pointed Nested Chevrons",
    prompt: `Create a professional logo icon for "ScaleUp Ventures", a premium business consulting firm.

ICON DESIGN - NESTED CHEVRONS:
Design exactly 3 nested chevron shapes (like the "^" character or upward-pointing arrow heads without the vertical line). These chevrons should be:
- Stacked concentrically, one inside the other
- All pointing upward, suggesting growth and progression
- The outermost/largest chevron in Navy ${BRAND.navy}
- The middle chevron in Navy ${BRAND.navy}
- The innermost/smallest chevron as an accent in Gold ${BRAND.gold}
- Clean, pointed angles (not curved) - traditional chevron shape
- Consistent line thickness throughout
- Balanced proportions with equal spacing between each chevron layer

STYLE SPECIFICATIONS:
- Clean vector-style appearance with crisp, precise edges
- Professional and corporate look
- Flat design - absolutely NO gradients, shadows, glows, or 3D effects
- Minimalist geometric precision
- Suitable for a consulting firm serving 50-65+ year old business owners

COMPOSITION:
- Icon only (no text/wordmark)
- Centered on pure white background
- Square canvas aspect ratio
- Icon should fill approximately 60-70% of the canvas
- Professional spacing around the mark

MANDATORY REQUIREMENTS:
- ONLY use Navy ${BRAND.navy} and Gold ${BRAND.gold} colors
- White background only
- NO gradients of any kind
- NO shadows or drop shadows
- NO glowing effects
- NO 3D effects or bevels
- NO texture or patterns
- Flat, solid color fills only
- Clean vector appearance

OUTPUT: A clean, professional nested chevron icon suitable for a premium consulting firm.`
  },

  "chevrons-2": {
    name: "Distinctive - Curved/Organic Chevrons",
    prompt: `Create a distinctive logo icon for "ScaleUp Ventures", a trusted consulting firm helping technology-hesitant business owners.

ICON DESIGN - ORGANIC NESTED CHEVRONS:
Design 2-3 nested chevron shapes with a distinctive organic quality:
- Chevrons pointing upward, suggesting growth and ascension
- Instead of sharp pointed angles, use SOFTLY CURVED tips - like a gentle arc at the peak
- The chevron arms should have a slight elegant curve rather than perfectly straight lines
- Creates a more approachable, less rigid feel while maintaining the chevron concept
- Outermost chevron: Navy ${BRAND.navy}
- Middle chevron (if 3): Navy ${BRAND.navy}
- Innermost chevron: Gold ${BRAND.gold} accent
- Balanced line weights - medium thickness that feels substantial but not heavy
- Organic curves suggest natural growth, not mechanical precision

STYLE SPECIFICATIONS:
- Vector-style with smooth curves
- Warm and approachable while remaining professional
- Flat design - NO gradients, shadows, glows, or 3D effects whatsoever
- The curves add distinctiveness without being too playful
- Appeals to mature business owners who value trust and expertise

COMPOSITION:
- Icon only (no text/wordmark)
- Centered on clean white background
- Square canvas format
- Icon fills 60-70% of canvas
- Generous breathing room around the mark

MANDATORY COLOR PALETTE:
- Primary: Navy ${BRAND.navy}
- Accent: Gold ${BRAND.gold}
- Background: Pure white

ABSOLUTELY AVOID:
- Any gradients (linear, radial, or otherwise)
- Drop shadows or any shadow effects
- Glow or luminosity effects
- 3D effects, bevels, or embossing
- Textures or patterns
- Multiple colors beyond navy and gold

OUTPUT: A distinctive, warmly professional organic chevron icon with curved elements.`
  },

  "chevrons-3": {
    name: "Maximum - Extraordinary Layered Momentum",
    prompt: `Create an extraordinary, memorable logo icon for "ScaleUp Ventures" - a consulting firm whose tagline is "We Prove It Before You Buy".

ICON DESIGN - DYNAMIC LAYERED CHEVRON MOMENTUM:
Design a striking interpretation of nested chevrons that conveys powerful upward momentum:
- 3 chevron-inspired shapes creating a sense of LIFT and ACCELERATION
- The shapes should feel like they're in motion - ascending together
- Creative interpretation: chevrons could have varying widths (thicker at base, tapering upward)
- Or: chevrons slightly offset/staggered to create dynamic movement
- Or: chevrons with one side slightly longer than the other for asymmetric energy
- The arrangement should feel like a formation - unified purpose, coordinated growth
- Outer layers: Navy ${BRAND.navy}
- Inner/top accent layer: Bold Gold ${BRAND.gold}
- The gold element should draw the eye upward to the peak/destination

CONCEPTUAL QUALITIES:
- Conveys "layered growth" - building upon foundations
- Suggests "proven methodology" - structured ascent
- Feels like momentum that's been earned, not rushed
- Trustworthy dynamism - active but controlled
- Memorable and distinctive - not generic corporate

STYLE SPECIFICATIONS:
- Bold, confident vector appearance
- Flat design aesthetic - absolutely NO gradients, shadows, or 3D
- Clean geometric forms with purposeful asymmetry or variation
- Professional enough for $15-25K consulting engagements
- Distinctive enough to be immediately recognizable

COMPOSITION:
- Icon only, no wordmark
- White background
- Square canvas
- Icon sized at 65-75% of canvas for impact
- Dynamic negative space

COLOR RULES (STRICT):
- Navy ${BRAND.navy} - primary structure
- Gold ${BRAND.gold} - accent emphasis
- White background only
- NO other colors
- NO gradients between colors
- NO shadows or glows

OUTPUT: A bold, memorable chevron-based icon with extraordinary visual impact while maintaining professional flat design.`
  }
};

async function generateLogo(promptData, filename) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      responseModalities: ["Text", "Image"],
    },
  });

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Generating: ${promptData.name}`);
  console.log(`File: ${filename}`);
  console.log("=".repeat(50));

  try {
    const response = await model.generateContent(promptData.prompt);
    const result = response.response;
    const parts = result.candidates?.[0]?.content?.parts || [];

    let textResponse = "";
    let imageSaved = false;

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        const ext = mimeType.includes("png") ? ".png" : ".png";

        const outputPath = path.join(OUTPUT_DIR, filename);

        // Ensure directory exists
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(outputPath, buffer);

        console.log(`[SUCCESS] Image saved: ${outputPath}`);
        console.log(`   Size: ${(buffer.length / 1024).toFixed(1)} KB`);
        imageSaved = true;
      }

      if (part.text) {
        textResponse = part.text;
        console.log(`[INFO] Model notes: ${part.text.substring(0, 150)}...`);
      }
    }

    return {
      success: imageSaved,
      filename: filename,
      path: path.join(OUTPUT_DIR, filename),
      modelResponse: textResponse,
      error: imageSaved ? null : "No image generated"
    };

  } catch (error) {
    console.error(`[ERROR] Generation failed: ${error.message}`);
    return {
      success: false,
      filename: filename,
      path: null,
      modelResponse: null,
      error: error.message
    };
  }
}

async function main() {
  console.log("\n" + "=".repeat(60));
  console.log("SCALEUP VENTURES - NESTED CHEVRONS LOGO GENERATION");
  console.log("=".repeat(60));
  console.log(`Output Directory: ${OUTPUT_DIR}`);
  console.log(`Variations: 3 (Conservative, Distinctive, Maximum)`);
  console.log("=".repeat(60));

  const results = {
    concept: "Nested Chevrons",
    description: "Nested chevron shapes suggesting upward momentum and layered growth",
    brand: {
      name: "ScaleUp Ventures",
      tagline: "We Prove It Before You Buy",
      targetAudience: "50-65+ technology-hesitant business owners",
      colors: BRAND
    },
    generatedAt: new Date().toISOString(),
    variations: []
  };

  const variations = [
    { key: "chevrons-1", filename: "chevrons-1.png" },
    { key: "chevrons-2", filename: "chevrons-2.png" },
    { key: "chevrons-3", filename: "chevrons-3.png" }
  ];

  for (const variation of variations) {
    const promptData = chevronPrompts[variation.key];
    const result = await generateLogo(promptData, variation.filename);

    results.variations.push({
      id: variation.key,
      name: promptData.name,
      filename: variation.filename,
      fullPath: result.path,
      success: result.success,
      error: result.error,
      promptUsed: promptData.prompt.substring(0, 200) + "..."
    });

    // Delay between generations to avoid rate limiting
    if (variations.indexOf(variation) < variations.length - 1) {
      console.log("\nWaiting 3 seconds before next generation...");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Write summary JSON
  const summaryPath = path.join(OUTPUT_DIR, "chevrons-results.json");
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  console.log(`\n[SUMMARY] Results saved to: ${summaryPath}`);

  // Final summary
  console.log("\n" + "=".repeat(60));
  console.log("GENERATION COMPLETE");
  console.log("=".repeat(60));

  const successful = results.variations.filter(v => v.success).length;
  const failed = results.variations.filter(v => !v.success).length;

  console.log(`Successful: ${successful}/${results.variations.length}`);
  console.log(`Failed: ${failed}/${results.variations.length}`);

  console.log("\nGenerated Files:");
  results.variations.forEach(v => {
    const status = v.success ? "[OK]" : "[FAILED]";
    console.log(`  ${status} ${v.filename} - ${v.name}`);
  });

  console.log(`\nSummary JSON: ${summaryPath}`);
  console.log("=".repeat(60));
}

main().catch(console.error);
