const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key provided by user
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups";

// Footer Mockup Prompts - Testing WHITE LOGO on DARK background
const FOOTER_PROMPTS = [
  {
    name: "footer-mockup-filled-heron",
    prompt: `Create a PROFESSIONAL WEBSITE FOOTER MOCKUP for ScaleUp Ventures - an elite B2B advisory consulting firm.

MOCKUP LAYOUT (Desktop width, approximately 1400px wide):
This is a realistic website footer design mockup, NOT a logo - it shows the logo IN CONTEXT.

BACKGROUND: Dark navy (#0F1729) - rich, authoritative, premium feel

LEFT SECTION - LOGO AREA:
- WHITE heron logo (reversed from dark background) - elegant standing profile silhouette
- The heron is a filled white silhouette - graceful, patient, confident
- A small GOLD (#D4A853) circle or dot for the eye accent
- Below logo: "ScaleUp Ventures" in white, elegant sans-serif
- Tagline underneath in muted gold: "We Prove It Before You Buy"

CENTER-RIGHT SECTION - NAVIGATION COLUMNS:
Three columns of footer links in white/light gray text:

Column 1 - "Services"
- Revenue Growth
- Operational Excellence
- Strategic Advisory
- Performance Audits

Column 2 - "Company"
- About Us
- Our Team
- Case Studies
- Careers

Column 3 - "Resources"
- Insights Blog
- Whitepapers
- Webinars
- Contact

FAR RIGHT - CONTACT INFO:
- Email: hello@scaleupventures.com
- Phone: (555) 123-4567
- Social icons: LinkedIn, Twitter (white outline style)

BOTTOM BAR:
- Thin separator line (subtle gold or white at 20% opacity)
- Left: Copyright symbol 2025 ScaleUp Ventures. All rights reserved.
- Right: Privacy Policy | Terms of Service

DESIGN REQUIREMENTS:
- Premium consulting firm aesthetic - think McKinsey, Bain level polish
- Clean typography hierarchy
- Proper spacing and alignment
- The WHITE heron logo should be the visual anchor
- Desktop browser footer dimensions
- Realistic UI mockup quality
- Typography should be crisp and professional

This mockup demonstrates brand versatility - the logo works beautifully REVERSED (white on dark) for digital applications.`
  },
  {
    name: "footer-mockup-line-heron",
    prompt: `Create a PROFESSIONAL WEBSITE FOOTER MOCKUP for ScaleUp Ventures - an elite B2B advisory consulting firm.

MOCKUP LAYOUT (Desktop width, approximately 1400px wide):
This is a realistic website footer design mockup showing the logo IN CONTEXT.

BACKGROUND: Dark navy (#0F1729) - rich, authoritative, premium feel

LEFT SECTION - LOGO AREA:
- WHITE heron logo rendered as ELEGANT LINE ART / SINGLE STROKE design
- The heron is drawn with graceful continuous lines - minimalist, sophisticated
- Standing profile pose with long elegant neck and legs
- Line weight: medium-thin, consistent, refined
- A small GOLD (#D4A853) dot or circle accent for the eye
- Below logo: "ScaleUp Ventures" in white, modern serif typeface
- Tagline underneath in muted gold: "We Prove It Before You Buy"

CENTER-RIGHT SECTION - NAVIGATION COLUMNS:
Three columns of footer links in white/light gray text:

Column 1 - "Services"
- Revenue Growth
- Operational Excellence
- Strategic Advisory
- Performance Audits

Column 2 - "Company"
- About Us
- Our Team
- Case Studies
- Careers

Column 3 - "Resources"
- Insights Blog
- Whitepapers
- Webinars
- Contact

FAR RIGHT - CONTACT INFO:
- Email: hello@scaleupventures.com
- Phone: (555) 123-4567
- Social icons: LinkedIn, Twitter (white outline style)

BOTTOM BAR:
- Thin separator line (subtle gold or white at 20% opacity)
- Left: Copyright symbol 2025 ScaleUp Ventures. All rights reserved.
- Right: Privacy Policy | Terms of Service

DESIGN REQUIREMENTS:
- Premium consulting firm aesthetic - sophisticated and trustworthy
- The LINE ART heron should feel elegant and refined
- Clean typography hierarchy with proper spacing
- The WHITE LINE HERON logo should be the visual anchor
- Desktop browser footer dimensions (wide format)
- Realistic UI/UX mockup quality
- Professional typography throughout

This mockup demonstrates the single-stroke/line-art version of the logo working in REVERSE (white on dark) for web applications.`
  }
];

async function generateFooterMockup(promptData, genAI) {
  const outputPath = path.join(OUTPUT_DIR, `${promptData.name}.png`);

  console.log(`\n${"=".repeat(70)}`);
  console.log(`  Generating: ${promptData.name}`);
  console.log(`${"=".repeat(70)}`);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`\n  Attempt ${attempt}/5...`);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-pro-image-preview",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          temperature: 1.0,  // MAXIMUM CREATIVITY
        },
      });

      const response = await model.generateContent(promptData.prompt);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      // Check for text response
      for (const part of parts) {
        if (part.text) {
          console.log(`  Model notes: ${part.text.substring(0, 150)}...`);
        }
      }

      // Extract and save image
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, buffer);

          console.log(`  SUCCESS! Saved: ${outputPath}`);
          console.log(`  Size: ${(buffer.length / 1024).toFixed(1)} KB`);

          return { success: true, path: outputPath };
        }
      }

      console.log("  No image in response, retrying...");
      await new Promise(r => setTimeout(r, 5000));

    } catch (error) {
      const errMsg = error.message || String(error);

      if (errMsg.includes("429") || errMsg.includes("quota")) {
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

  console.log(`  FAILED after 5 attempts: ${promptData.name}`);
  return { success: false };
}

async function main() {
  console.log("\n");
  console.log("=".repeat(70));
  console.log("  SCALEUP VENTURES - WEBSITE FOOTER MOCKUPS");
  console.log("  Testing WHITE LOGO on DARK BACKGROUND");
  console.log("=".repeat(70));
  console.log("");
  console.log("  Model: gemini-3-pro-image-preview");
  console.log("  Temperature: 1.0 (Maximum Creativity)");
  console.log(`  Output: ${OUTPUT_DIR}`);
  console.log("");
  console.log("  Generating 2 footer mockup variations:");
  console.log("  1. Filled heron silhouette (white on navy)");
  console.log("  2. Line art heron (white strokes on navy)");
  console.log("");

  const genAI = new GoogleGenerativeAI(API_KEY);
  const results = [];

  for (const promptData of FOOTER_PROMPTS) {
    const result = await generateFooterMockup(promptData, genAI);
    results.push({ name: promptData.name, ...result });

    // Delay between generations
    if (FOOTER_PROMPTS.indexOf(promptData) < FOOTER_PROMPTS.length - 1) {
      console.log("\n  Waiting 15 seconds before next generation...");
      await new Promise(r => setTimeout(r, 15000));
    }
  }

  // Summary
  console.log("\n");
  console.log("=".repeat(70));
  console.log("  GENERATION COMPLETE - FOOTER MOCKUPS");
  console.log("=".repeat(70));
  console.log("");

  const successful = results.filter(r => r.success);
  console.log(`  Generated: ${successful.length}/${results.length} mockups`);
  console.log("");

  for (const result of results) {
    const status = result.success ? "SUCCESS" : "FAILED";
    console.log(`  [${status}] ${result.name}`);
    if (result.path) {
      console.log(`           ${result.path}`);
    }
  }

  console.log("");
  console.log("  These mockups demonstrate logo versatility:");
  console.log("  - White logo reversed out on dark backgrounds");
  console.log("  - Professional website footer context");
  console.log("  - Gold accent maintaining brand identity");
  console.log("");
}

main().catch(console.error);
