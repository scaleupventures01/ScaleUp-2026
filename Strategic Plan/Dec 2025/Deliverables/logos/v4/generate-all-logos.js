const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// CORRECT API Key - SV Logo Creation
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const BASE_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts";

// Master brand style
const BRAND_STYLE = `CRITICAL REQUIREMENTS:
- Professional logo design for "ScaleUp Ventures" - a B2B advisory firm
- MANDATORY: Pure white background (#FFFFFF)
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with clean geometric forms
- Colors: Navy #0F1729 (primary), Gold #D4A853 (accent)
- Premium quality - like a $50,000 brand identity
- NOT clip art, NOT cartoonish, NOT generic
- Company name "ScaleUp Ventures" in elegant serif typography below symbol
`;

// HERON PROMPTS
const HERON_PROMPTS = [
  {
    name: "heron-01-minimal-geometric",
    description: "Minimal geometric silhouette (favicon-friendly)",
    prompt: `${BRAND_STYLE}
Create a MINIMAL GEOMETRIC logo featuring an abstract heron silhouette.

DESIGN:
- Highly simplified heron using clean geometric shapes
- Single continuous line or minimal stroke design
- Elegant standing pose, long neck in S-curve
- Navy (#0F1729) heron, gold (#D4A853) accent on beak or eye only
- Must work at 16x16px favicon size

STYLE: Saul Bass / Paul Rand aesthetic - geometric reduction
The heron symbolizes "patience before precision" - watching carefully then striking decisively.`
  },
  {
    name: "heron-02-elegant-standing",
    description: "Classic standing profile (medium detail)",
    prompt: `${BRAND_STYLE}
Create an ELEGANT STANDING logo featuring a heron in classic profile pose.

DESIGN:
- Heron in standing pose, facing left
- Medium detail - recognizable but stylized
- Long elegant neck with gentle S-curve
- Sharp pointed beak suggesting precision
- Slender legs, optional stylized water element
- Navy (#0F1729) primary, gold (#D4A853) accent on eye

STYLE: Refined, dignified, heritage brand aesthetic
Evokes patience, observation, precision - like a trusted advisor who waits for the right moment.`
  },
  {
    name: "heron-03-strike-pose",
    description: "Dynamic strike pose (most detailed)",
    prompt: `${BRAND_STYLE}
Create a DYNAMIC logo featuring a heron in strike pose.

DESIGN:
- Heron at moment of striking - neck extended, beak pointing down
- Suggests decisive action after patient observation
- Optional: small fish or water splash showing successful outcome
- More detailed while maintaining logo clarity
- Navy (#0F1729) heron, gold (#D4A853) accent elements

STYLE: Dynamic yet controlled - precision in motion
Represents the advisory philosophy: "patience then decisive action" - we prove it before you buy.`
  }
];

// LYNX PROMPTS
const LYNX_PROMPTS = [
  {
    name: "lynx-01-minimal-eyes",
    description: "Piercing eyes only (most abstract)",
    prompt: `${BRAND_STYLE}
Create a MINIMAL ABSTRACT logo featuring only the piercing EYES of a lynx.

DESIGN:
- Just two intense lynx eyes, nothing else
- Almond-shaped, angular at outer corners
- Gold (#D4A853) irises - representing valuable insight
- Navy (#0F1729) outlines and pupils
- The gaze should feel penetrating and knowing

STYLE: Maximum simplicity - must work at favicon size
The lynx was the "keeper of secrets" in mythology - able to see hidden truths others miss.`
  },
  {
    name: "lynx-02-profile-tufted",
    description: "Profile with tufted ears (medium detail)",
    prompt: `${BRAND_STYLE}
Create a PROFILE logo featuring a lynx head with distinctive tufted ears.

DESIGN:
- Lynx head in LEFT-FACING profile
- Prominent TUFTED EARS - the lynx's signature feature
- Single visible eye with gold (#D4A853) iris
- Strong angular jaw line
- Geometric and refined, not organic or fluffy
- Navy (#0F1729) for the head

STYLE: Saul Bass aesthetic - clean angular lines
The ear tufts are like antennae receiving hidden signals - seeing what others miss.`
  },
  {
    name: "lynx-03-frontal-intense",
    description: "Front-facing with intense stare (most detailed)",
    prompt: `${BRAND_STYLE}
Create a POWERFUL FRONTAL logo featuring a lynx head looking directly at viewer.

DESIGN:
- Full front-facing lynx head, symmetrical
- Both tufted ears prominently displayed
- Direct, intense stare - authoritative presence
- GOLD (#D4A853) eyes as the focal point
- Angular geometric face structure
- Navy (#0F1729) for all structural elements

STYLE: Powerful but wise, not aggressive
"The keeper of secrets" - the gaze of someone who sees through pretense and finds the truth.`
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateLogo(genAI, promptData, outputDir) {
  const { name, prompt, description } = promptData;
  const outputPath = path.join(outputDir, `${name}.png`);

  console.log(`\n[${name}]`);
  console.log(`  ${description}`);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/3...`);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-pro-image-preview",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      });

      const response = await model.generateContent(prompt);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, buffer);
          console.log(`  ✓ SUCCESS: ${outputPath}`);
          return { success: true, path: outputPath };
        }
      }

      console.log(`  No image in response, retrying...`);
      await sleep(5000);

    } catch (error) {
      const errMsg = error.message || String(error);
      if (errMsg.includes("429") || errMsg.includes("quota")) {
        console.log(`  Rate limited, waiting 60s...`);
        await sleep(60000);
      } else {
        console.log(`  Error: ${errMsg.substring(0, 100)}`);
        await sleep(10000);
      }
    }
  }

  return { success: false };
}

async function main() {
  console.log("=".repeat(60));
  console.log("ScaleUp Ventures Logo Generation");
  console.log("=".repeat(60));
  console.log(`API Key: AIzaSyA1OV...d6lw (SV Logo Creation)`);
  console.log(`Started: ${new Date().toISOString()}\n`);

  const genAI = new GoogleGenerativeAI(API_KEY);
  const results = { heron: [], lynx: [] };

  // Create directories
  const heronDir = path.join(BASE_DIR, "heron");
  const lynxDir = path.join(BASE_DIR, "lynx");
  fs.mkdirSync(heronDir, { recursive: true });
  fs.mkdirSync(lynxDir, { recursive: true });

  // Generate HERON logos
  console.log("\n--- HERON LOGOS (3) ---");
  for (const prompt of HERON_PROMPTS) {
    const result = await generateLogo(genAI, prompt, heronDir);
    results.heron.push({ ...prompt, ...result });
    if (result.success) {
      console.log("  Waiting 30s before next...");
      await sleep(30000);
    }
  }

  // Generate LYNX logos
  console.log("\n--- LYNX LOGOS (3) ---");
  for (const prompt of LYNX_PROMPTS) {
    const result = await generateLogo(genAI, prompt, lynxDir);
    results.lynx.push({ ...prompt, ...result });
    if (result.success) {
      console.log("  Waiting 30s before next...");
      await sleep(30000);
    }
  }

  // Summary
  const heronSuccess = results.heron.filter(r => r.success).length;
  const lynxSuccess = results.lynx.filter(r => r.success).length;

  console.log("\n" + "=".repeat(60));
  console.log("GENERATION COMPLETE");
  console.log("=".repeat(60));
  console.log(`Heron logos: ${heronSuccess}/3`);
  console.log(`Lynx logos: ${lynxSuccess}/3`);
  console.log(`Total: ${heronSuccess + lynxSuccess}/6`);

  // Save summary
  fs.writeFileSync(
    path.join(BASE_DIR, "generation-results.json"),
    JSON.stringify(results, null, 2)
  );
}

main().catch(console.error);
