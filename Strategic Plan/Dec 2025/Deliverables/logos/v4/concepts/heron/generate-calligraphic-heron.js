const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/heron";
const REFERENCE_IMAGE = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups/email-signature-mockup.png";

async function generateCalligraphicHeron() {
  console.log("=".repeat(70));
  console.log("  SCALEUP VENTURES - CALLIGRAPHIC HERON LOGO");
  console.log("  Using reference image from email signature mockup");
  console.log("=".repeat(70));
  console.log("");

  // Read the reference image
  const imageBuffer = fs.readFileSync(REFERENCE_IMAGE);
  const base64Image = imageBuffer.toString("base64");
  console.log(`Reference image loaded: ${REFERENCE_IMAGE}`);
  console.log(`Image size: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
  console.log("");

  const genAI = new GoogleGenerativeAI(API_KEY);

  const prompt = `Look at this email signature mockup image. In the "Version B: Single Stroke" section on the right side, there is a beautiful CALLIGRAPHIC HERON logo - it's drawn with flowing brushstroke-style lines, navy blue body with a gold/tan beak.

I need you to RECREATE that exact calligraphic heron as a STANDALONE LOGO IMAGE:

REQUIREMENTS:
1. Pure white background - absolutely clean, no textures
2. Just the heron - no text, no email interface, nothing else
3. Match the EXACT style: flowing calligraphic brushstroke lines
4. Same colors: navy blue (#0F1729) body, gold (#D4A853) beak
5. Same pose: standing, elegant S-curve neck, facing right
6. High resolution, crisp lines
7. The heron should be centered with white space around it

The calligraphic heron in that mockup has a beautiful flowing quality - like Japanese ink brush painting. Please recreate JUST that heron mark as a clean, standalone logo file.

Generate the image now.`;

  // Generate 3 versions
  for (let version = 1; version <= 3; version++) {
    console.log(`\n${"=".repeat(70)}`);
    console.log(`  GENERATING VERSION ${version}/3`);
    console.log("=".repeat(70));

    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        console.log(`\n  Attempt ${attempt}/5 - Invoking Gemini with reference image...`);

        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash-preview-image-generation",
          generationConfig: {
            responseModalities: ["IMAGE", "TEXT"],
            temperature: 1.0,
          },
        });

        const response = await model.generateContent([
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image,
            },
          },
          { text: prompt },
        ]);

        const parts = response.response.candidates?.[0]?.content?.parts || [];

        // Check for text response
        for (const part of parts) {
          if (part.text) {
            console.log(`\n  Model feedback: ${part.text.substring(0, 200)}...`);
          }
        }

        // Extract and save image
        let imageFound = false;
        for (const part of parts) {
          if (part.inlineData?.mimeType?.startsWith("image/")) {
            const buffer = Buffer.from(part.inlineData.data, "base64");

            if (!fs.existsSync(OUTPUT_DIR)) {
              fs.mkdirSync(OUTPUT_DIR, { recursive: true });
            }

            const outputPath = path.join(OUTPUT_DIR, `heron-calligraphic-v${version}.png`);
            fs.writeFileSync(outputPath, buffer);

            console.log("");
            console.log(`  SUCCESS - Version ${version} created!`);
            console.log(`  File: ${outputPath}`);
            console.log(`  Size: ${(buffer.length / 1024).toFixed(1)} KB`);

            imageFound = true;
            break;
          }
        }

        if (imageFound) break; // Success, move to next version

        console.log("  No image in response, retrying...");
        await new Promise(r => setTimeout(r, 5000));

      } catch (error) {
        const errMsg = error.message || String(error);

        if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
          console.log("  Rate limited - waiting 60 seconds...");
          await new Promise(r => setTimeout(r, 60000));
        } else if (errMsg.includes("503") || errMsg.includes("overloaded")) {
          console.log("  Model overloaded - waiting 30 seconds...");
          await new Promise(r => setTimeout(r, 30000));
        } else {
          console.log(`  Error: ${errMsg.substring(0, 200)}`);
          await new Promise(r => setTimeout(r, 10000));
        }
      }
    }

    // Wait between versions
    if (version < 3) {
      console.log("\n  Waiting 5 seconds before next version...");
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log("");
  console.log("=".repeat(70));
  console.log("  GENERATION COMPLETE!");
  console.log("=".repeat(70));
  console.log("");
  console.log("  3 calligraphic heron variations created.");
  console.log("  Files: heron-calligraphic-v1.png, v2.png, v3.png");
  console.log("");
  console.log("  Review them and select the best one!");
  console.log("");
}

generateCalligraphicHeron().catch(console.error);
