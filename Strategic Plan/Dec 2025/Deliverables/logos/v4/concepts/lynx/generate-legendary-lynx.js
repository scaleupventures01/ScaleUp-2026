const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key - SV Logo Creation
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

// Output directory
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/lynx";

// THE LEGENDARY LYNX EYES PROMPT - Maximum Impact
const LEGENDARY_LYNX_EYES = `LOGO DESIGN BRIEF - SCALEUP VENTURES

CONCEPT: THE LYNX EYES - THE ALL-SEEING GAZE

In ancient mythology, the lynx was called "the keeper of secrets" - an animal that could see through solid earth, perceive hidden truths, and reveal what others tried to conceal. This logo captures that essence through JUST THE EYES.

DESIGN REQUIREMENTS:

1. THE SYMBOL - TWO PIERCING LYNX EYES:
   - ONLY the eyes - no face outline, no nose, no other features
   - Two almond-shaped eyes with angular, sharp outer corners (distinctive lynx eye shape)
   - Eyes face DIRECTLY at the viewer - not looking away, looking AT you
   - The eyes should feel like they're PENETRATING through you, seeing your secrets
   - Geometric and stylized, NOT realistic or photographic
   - The negative space between the eyes should subtly suggest the lynx face shape WITHOUT drawing it
   - Consider very subtle angular lines from outer eye corners (suggesting lynx facial markings)
   - The gaze is KNOWING but not threatening, WISE but not arrogant

2. COLOR PALETTE - STRICTLY LIMITED:
   - Background: PURE WHITE (#FFFFFF) - absolutely no other background color
   - Primary structure (eye outlines, pupils, any lines): Deep Navy (#0F1729)
   - Irises/Eye centers: Burnished Gold (#D4A853) - this is the focal accent
   - NO gradients, NO shadows, NO glows, NO 3D effects
   - FLAT, clean, vector-style design

3. TYPOGRAPHY:
   - "ScaleUp Ventures" positioned below the eyes
   - Elegant, refined serif typeface (think Crimson Pro, Freight Display, or similar)
   - Navy color (#0F1729) for the text
   - Proper letter-spacing for sophistication
   - The name should feel like it belongs to a trusted, wise advisor

4. COMPOSITION:
   - Horizontal lockup format
   - Eyes centered above text
   - Balanced negative space - not crowded
   - The overall logo should feel refined and intentional

5. SCALE REQUIREMENTS - CRITICAL:
   - This logo MUST work at favicon size (16x16 pixels)
   - At tiny sizes, the two golden eyes should still be recognizable
   - Every line must be essential - no decoration that doesn't scale

6. EMOTIONAL IMPACT:
   - A CEO with something to hide should feel slightly uncomfortable looking at this
   - A CEO with nothing to hide should feel: "Finally, someone who will see the real opportunity"
   - The feeling of sitting across from someone who already knows your secrets
   - Quiet confidence, deep wisdom, penetrating insight

7. WHAT THIS IS NOT:
   - NOT a cute cat illustration
   - NOT a full animal face
   - NOT aggressive or predatory
   - NOT generic "eye" clipart
   - NOT busy or over-detailed
   - NOT a mascot
   - NOT stock imagery

8. QUALITY STANDARD:
   - This should look like a $50,000 brand identity project
   - The sophistication of a Pentagram or Wolff Olins design
   - The authority of McKinsey or Goldman Sachs visual identity
   - Unforgettable and distinctive

RENDER AS:
A sophisticated, minimal logo mark. Professional corporate branding quality. Vector-style flat design on pure white background.`;

async function generateLegendaryLogo() {
  console.log("==============================================");
  console.log("LEGENDARY LYNX EYES - Maximum Creativity");
  console.log("==============================================");
  console.log("Model: gemini-3-pro-image-preview");
  console.log("Temperature: 1.0 (MAXIMUM CREATIVITY)");
  console.log(`Output: ${OUTPUT_DIR}/lynx-01-minimal-eyes.png`);
  console.log(`Started at: ${new Date().toISOString()}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);

  // Use Gemini 3 Pro Image Preview with maximum creativity
  const model = genAI.getGenerativeModel({
    model: "gemini-3-pro-image-preview",
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 1.0,  // MAXIMUM CREATIVITY
    },
  });

  try {
    console.log("Generating legendary lynx eyes logo...\n");
    console.log("Prompt preview (first 500 chars):");
    console.log(LEGENDARY_LYNX_EYES.substring(0, 500) + "...\n");

    const response = await model.generateContent(LEGENDARY_LYNX_EYES);
    const result = response.response;

    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const parts = result.candidates[0].content.parts;

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          const outputPath = path.join(OUTPUT_DIR, "lynx-01-minimal-eyes.png");
          fs.writeFileSync(outputPath, buffer);

          console.log("==============================================");
          console.log("SUCCESS! LEGENDARY LOGO GENERATED!");
          console.log("==============================================");
          console.log(`Saved to: ${outputPath}`);
          console.log(`File size: ${buffer.length} bytes`);
          console.log(`Completed at: ${new Date().toISOString()}`);

          return { success: true, path: outputPath };
        }

        // Check for text response
        if (part.text) {
          console.log("\nModel response text:", part.text);
        }
      }

      console.log("No image in response. Response structure:", JSON.stringify(result, null, 2).substring(0, 1000));
    } else {
      console.log("Unexpected response structure:", JSON.stringify(result, null, 2).substring(0, 1000));
    }

  } catch (error) {
    console.log("==============================================");
    console.log("ERROR GENERATING LOGO");
    console.log("==============================================");
    console.log("Error:", error.message);

    if (error.message.includes("429") || error.message.includes("quota")) {
      console.log("\n*** RATE LIMITED ***");
      console.log("The API quota may be exhausted.");
      console.log("\nOptions:");
      console.log("1. Wait for quota to reset");
      console.log("2. Try AI Studio directly: https://aistudio.google.com/");
    }

    // Try fallback model
    console.log("\n\nAttempting fallback to gemini-2.0-flash-exp-image-generation...");
    try {
      const fallbackModel = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp-image-generation",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      });

      const fallbackResponse = await fallbackModel.generateContent(LEGENDARY_LYNX_EYES);
      const fallbackResult = fallbackResponse.response;

      if (fallbackResult.candidates && fallbackResult.candidates[0] && fallbackResult.candidates[0].content) {
        const parts = fallbackResult.candidates[0].content.parts;

        for (const part of parts) {
          if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            const outputPath = path.join(OUTPUT_DIR, "lynx-01-minimal-eyes.png");
            fs.writeFileSync(outputPath, buffer);

            console.log("\n==============================================");
            console.log("SUCCESS WITH FALLBACK MODEL!");
            console.log("==============================================");
            console.log(`Saved to: ${outputPath}`);

            return { success: true, path: outputPath, model: "fallback" };
          }
        }
      }
    } catch (fallbackError) {
      console.log("Fallback also failed:", fallbackError.message);
    }

    return { success: false, error: error.message };
  }

  return { success: false, error: "No image generated" };
}

generateLegendaryLogo().catch(console.error);
