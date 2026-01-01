const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key provided by user
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups";

// Email Signature Mockup Prompt
const EMAIL_SIGNATURE_PROMPT = `Create a PHOTOREALISTIC mockup of a professional email client showing an email signature for ScaleUp Ventures.

SCENE: A realistic Gmail or Outlook email interface on a desktop screen. The email is from Calvin Williams Jr. responding to a client inquiry. Show the bottom portion of the email where the signature appears.

EMAIL CONTEXT (visible text above signature):
"Thank you for your interest in our Revenue Operations Assessment. I'd be happy to schedule a discovery call to discuss how we can help optimize your sales pipeline.

Looking forward to connecting.

Best regards,"

THE EMAIL SIGNATURE (this is the STAR of the mockup):

Layout - Compact professional signature with LEFT-ALIGNED elements:

[HERON ICON]  Calvin Williams Jr.
              Founder & CEO, ScaleUp Ventures
              (555) 123-4567 | calvin@scaleupventures.com | scaleupventures.com
              "We Prove It Before You Buy"
              [LinkedIn Icon]

HERON LOGO DETAILS:
- Show TWO versions side by side in the mockup (as a comparison):
  LEFT SIGNATURE: "Elegant Standing Heron" - A sophisticated, tall heron standing gracefully in profile, rendered in navy blue (#0F1729) with a small gold (#D4A853) eye accent. Minimal, refined, icon-appropriate at ~50px.
  RIGHT SIGNATURE: "Single Stroke Heron" - An ultra-minimalist heron rendered almost like a single continuous brushstroke or line. Navy blue (#0F1729) with tiny gold eye. Abstract but recognizable as a heron.

SIGNATURE STYLING:
- Name: Bold, navy blue (#0F1729), slightly larger font
- Title: Regular weight, dark gray, professional
- Contact info: Smaller, gray, separated by vertical bars (|)
- Tagline: Italic, gold (#D4A853), elegant serif font
- LinkedIn icon: Small, subtle, navy blue
- Overall signature height: Compact, professional (not more than 4-5 lines visually)

MOCKUP ENVIRONMENT:
- Realistic email client interface (Gmail style preferred)
- Clean white email background
- Show just enough of the email UI to establish context (send button area visible, maybe compose toolbar)
- Professional desktop setting
- Sharp, high-resolution rendering

SPLIT VIEW:
- Show the mockup as a split comparison
- Left side: Signature with "Elegant Standing Heron" icon
- Right side: Signature with "Single Stroke Heron" icon
- Label each version subtly at the top: "Version A: Elegant Standing" and "Version B: Single Stroke"

TECHNICAL:
- Photorealistic mockup quality
- The signature should look EXACTLY as it would appear in a real email
- The heron icons should be clearly visible but appropriately sized for email (small, ~50px icons)
- Text should be crisp and legible
- Professional, polished presentation

This mockup demonstrates how the ScaleUp Ventures logo works at SMALL INLINE SIZES in professional business correspondence.`;

async function generateEmailSignatureMockup() {
  console.log("=".repeat(70));
  console.log("  SCALEUP VENTURES - EMAIL SIGNATURE MOCKUP");
  console.log("=".repeat(70));
  console.log("");
  console.log("Model: gemini-3-pro-image-preview (MAXIMUM CREATIVITY)");
  console.log("Temperature: 1.0 (Full creative power)");
  console.log(`Output Directory: ${OUTPUT_DIR}`);
  console.log("");
  console.log("Generating professional email signature mockup...");
  console.log("-".repeat(70));

  const genAI = new GoogleGenerativeAI(API_KEY);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`\n  Attempt ${attempt}/5 - Invoking Gemini 3 Pro Image...`);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-pro-image-preview",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          temperature: 1.0,  // MAXIMUM CREATIVITY
        },
      });

      const response = await model.generateContent(EMAIL_SIGNATURE_PROMPT);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      // Check for text response (model feedback)
      for (const part of parts) {
        if (part.text) {
          console.log(`\n  Model feedback: ${part.text.substring(0, 300)}...`);
        }
      }

      // Extract and save image
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");

          // Ensure directory exists
          if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
          }

          const outputPath = path.join(OUTPUT_DIR, "email-signature-mockup.png");
          fs.writeFileSync(outputPath, buffer);

          console.log("");
          console.log("=".repeat(70));
          console.log("  SUCCESS - EMAIL SIGNATURE MOCKUP CREATED!");
          console.log("=".repeat(70));
          console.log("");
          console.log(`  File saved: ${outputPath}`);
          console.log(`  File size: ${(buffer.length / 1024).toFixed(1)} KB`);
          console.log("");
          console.log("  This mockup shows how the ScaleUp Ventures heron logo");
          console.log("  performs at small inline sizes in email signatures.");
          console.log("");
          console.log("  Two versions compared:");
          console.log("  - Version A: Elegant Standing Heron");
          console.log("  - Version B: Single Stroke Heron");
          console.log("");

          return { success: true, path: outputPath, size: buffer.length };
        }
      }

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
        console.log(`  Error: ${errMsg.substring(0, 150)}`);
        await new Promise(r => setTimeout(r, 10000));
      }
    }
  }

  console.log("\n  FAILED after 5 attempts.");
  return { success: false };
}

generateEmailSignatureMockup().catch(console.error);
