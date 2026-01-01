const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key provided by user
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups";

const HEADER_MOCKUP_PROMPT = `Create a PROFESSIONAL WEBSITE HEADER MOCKUP showing a premium B2B advisory firm website.

EXACT LAYOUT REQUIREMENTS:
- Desktop website header, approximately 1400px wide, 80-100px tall
- Clean white or very light gray (#FAFAFA) background
- Split into LEFT and RIGHT sections

LEFT SIDE - LOGO AREA:
- Show TWO versions of the ScaleUp Ventures heron logo SIDE BY SIDE for comparison:

  VERSION 1 (LEFT): "ELEGANT STANDING" (Filled silhouette)
  - Navy blue (#0F1729) heron in elegant standing profile, facing left
  - Classic S-curve neck, sharp pointed beak
  - Small gold (#D4A853) accent on the eye
  - "ScaleUp Ventures" in elegant serif typography below the heron
  - This is the FILLED/SOLID version - classic heritage feel

  VERSION 2 (RIGHT): "SINGLE STROKE" (Calligraphic line art)
  - Same heron in SINGLE CONTINUOUS LINE style
  - Navy (#0F1729) elegant calligraphic stroke
  - Minimal, artistic, flowing line
  - Same "ScaleUp Ventures" serif text below
  - This is the LINE ART version - modern artistic feel

- Small labels above each: "Version A: Filled" and "Version B: Line Art"

CENTER - NAVIGATION:
- Clean horizontal navigation with dividers: "Services" | "About" | "Results" | "Contact"
- Navy (#0F1729) text in clean sans-serif font
- Subtle, professional spacing

RIGHT SIDE - CTA:
- "Schedule a Call" button
- Gold (#D4A853) background with white text
- Rounded corners, premium feel

OVERALL STYLE:
- McKinsey / Bain / BCG level of sophistication
- Minimal, clean, uncluttered
- Premium B2B advisory aesthetic
- Professional website header you'd see on a $10M+ consulting firm
- NO decorative elements, NO stock photos, NO icons except the logos
- This is a MOCKUP to help compare the two logo styles in context

The purpose is to help a CEO decide between the filled heron and the line art heron by seeing both in a real website context.`;

async function generateMockup() {
  console.log("=".repeat(60));
  console.log("ScaleUp Ventures - Website Header Mockup");
  console.log("=".repeat(60));
  console.log(`Started: ${new Date().toISOString()}\n`);

  const genAI = new GoogleGenerativeAI(API_KEY);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Attempt ${attempt}/3 - Generating header mockup...`);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-pro-image-preview",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          temperature: 1.0,  // Maximum creativity as requested
        },
      });

      const response = await model.generateContent(HEADER_MOCKUP_PROMPT);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          const outputPath = path.join(OUTPUT_DIR, "header-mockup.png");
          fs.writeFileSync(outputPath, buffer);
          console.log(`\nSUCCESS: Header mockup saved to:`);
          console.log(outputPath);
          return;
        }
      }

      console.log("No image in response, retrying...");
      await new Promise(r => setTimeout(r, 5000));

    } catch (error) {
      const errMsg = error.message || String(error);
      console.log(`Error: ${errMsg.substring(0, 200)}`);
      if (errMsg.includes("429") || errMsg.includes("quota")) {
        console.log("Rate limited, waiting 60s...");
        await new Promise(r => setTimeout(r, 60000));
      } else {
        await new Promise(r => setTimeout(r, 10000));
      }
    }
  }

  console.log("\nFailed to generate mockup after 3 attempts.");
}

generateMockup().catch(console.error);
