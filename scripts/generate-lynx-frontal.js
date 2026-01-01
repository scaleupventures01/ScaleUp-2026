const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key - provided by user
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

// Output configuration
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/lynx";
const OUTPUT_FILE = "lynx-03-frontal-intense.png";

// THE LEGENDARY LYNX PROMPT
const LYNX_PROMPT = `LEGENDARY LOGO DESIGN - THE CONFRONTATION

Create a FRONT-FACING LYNX HEAD logo for "ScaleUp Ventures" - an elite B2B advisory firm.

THE CONCEPT - LYNCEUS THE ALL-SEEING:
In Greek mythology, the Argonaut Lynceus could "see through the earth itself." This lynx faces you DIRECTLY. There is no hiding. There is no angle. There is only TRUTH. This is the moment when you realize someone can see EVERYTHING about you, and instead of feeling threatened, you feel... relieved. Finally, someone who will tell you the truth.

VISUAL DESIGN - PERFECT BILATERAL SYMMETRY:
- Full FRONT-FACING lynx head - the viewer is being DIRECTLY confronted
- Perfect mirror symmetry - left and right sides are IDENTICAL
- BOTH distinctive tufted ears prominently displayed, rising like twin peaks of authority
- The face should feel constructed with SACRED GEOMETRY - triangular, angular, precise
- Distinctive lynx proportions: wide-set eyes, short muzzle, broad cheekbones
- Cheek ruffs (the lynx's distinctive facial fur) subtly framing the face
- Angular, triangular face structure tapering to a strong chin
- The overall head shape should evoke a shield, a crest, an emblem of authority

THE EYES - THE FOCAL POINT OF POWER:
- GOLD (#D4A853) eyes that BURN with insight - these are twin suns of discernment
- Eyes are LEVEL, UNWAVERING, PENETRATING
- The gaze is not aggressive - it is KNOWING
- Not threatening - DISCERNING
- This is a mentor's gaze, a sage's eyes, a trusted advisor's assessment
- Powerful but wise, commanding but fair
- The feeling of being truly SEEN by someone who has your best interests at heart

MANDATORY COLOR CONSTRAINTS:
- Background: PURE WHITE (#FFFFFF) - absolutely no cream, no off-white
- Primary structural color: Deep Navy (#0F1729) - all lines, shapes, structural elements
- Accent color: Burnished Gold (#D4A853) - ONLY for the eyes
- NO gradients
- NO shadows
- NO 3D effects
- FLAT vector-style design only

GEOMETRY AND STYLE:
- Clean geometric precision - this is not organic or rough
- Angular forms suggesting strength and mathematical order
- The triangular ear tufts balance the triangular chin
- Every line has purpose, every shape is intentional
- The style of a $100,000 brand identity from Pentagram
- Must work as a favicon and on a billboard

TYPOGRAPHY:
"ScaleUp Ventures" centered below the lynx head
- Substantial serif font with gravitas and presence
- Navy (#0F1729) color matching the lynx
- Clean, authoritative letterforms
- The text should feel PROTECTED by the gaze above it

WHAT THIS IS NOT:
- NOT a cute animal illustration
- NOT cartoonish or playful
- NOT aggressive or threatening
- NOT a generic stock animal icon
- NOT soft or rounded
- NOT realistic fur texture

EMOTIONAL IMPACT:
When a CEO who's been lied to by consultants sees this logo, they should feel:
"This firm doesn't play games. They will find every hidden truth. They will see what I've been afraid to admit. And that's exactly what I need."

This must feel like looking into the eyes of TRUTH ITSELF.

RENDER AS: Professional flat vector logo, square 1:1 aspect ratio, pure white background, suitable for immediate use as brand identity.`;

async function generateLegendaryLynx() {
  console.log("=".repeat(70));
  console.log("SCALEUP VENTURES - THE LEGENDARY LYNX: THE CONFRONTATION");
  console.log("=".repeat(70));
  console.log("");
  console.log("Model: gemini-3-pro-image-preview");
  console.log("Temperature: 1.0 (MAXIMUM CREATIVITY)");
  console.log("Output: " + path.join(OUTPUT_DIR, OUTPUT_FILE));
  console.log("");

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log("Created output directory: " + OUTPUT_DIR);
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  // Use Gemini 3 Pro Image with maximum creativity
  const model = genAI.getGenerativeModel({
    model: "gemini-3-pro-image-preview",
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 1.0, // MAXIMUM CREATIVITY
    },
  });

  console.log("Generating the legendary lynx...");
  console.log("-".repeat(70));

  try {
    const response = await model.generateContent(LYNX_PROMPT);
    const result = response.response;

    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const parts = result.candidates[0].content.parts;

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
          fs.writeFileSync(outputPath, buffer);

          console.log("");
          console.log("=".repeat(70));
          console.log("SUCCESS - THE LEGENDARY LYNX HAS BEEN CREATED");
          console.log("=".repeat(70));
          console.log("");
          console.log("Saved to: " + outputPath);
          console.log("");
          console.log("The lynx gazes upon you with the eyes of truth.");
          console.log("ScaleUp Ventures now has its confrontational guardian.");
          console.log("");

          // Save generation metadata
          const metadataPath = path.join(OUTPUT_DIR, "lynx-03-metadata.json");
          const metadata = {
            generated: new Date().toISOString(),
            filename: OUTPUT_FILE,
            model: "gemini-3-pro-image-preview",
            temperature: 1.0,
            concept: "The Confrontation - Front-Facing Lynx",
            description: "Full frontal gaze of absolute authority - the all-seeing Lynceus",
            brand: "ScaleUp Ventures",
            tagline: "We Prove It Before You Buy",
            colors: {
              background: "#FFFFFF",
              primary: "#0F1729",
              accent: "#D4A853"
            },
            prompt: LYNX_PROMPT
          };
          fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
          console.log("Metadata saved to: " + metadataPath);

          return { success: true, path: outputPath };
        }

        // If we got text, log it
        if (part.text) {
          console.log("Model response:", part.text);
        }
      }

      console.log("No image found in response parts:", parts.map(p => Object.keys(p)));
    } else {
      console.log("Unexpected response structure");
      console.log(JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error("");
    console.error("ERROR GENERATING LYNX:");
    console.error(error.message);

    if (error.message.includes("429") || error.message.includes("quota")) {
      console.error("");
      console.error("Rate limit or quota exceeded. Wait and try again.");
    }

    return { success: false, error: error.message };
  }

  return { success: false, error: "No image generated" };
}

// Run it
generateLegendaryLynx().catch(console.error);
