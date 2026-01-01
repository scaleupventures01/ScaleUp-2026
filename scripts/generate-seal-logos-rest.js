const https = require("https");
const fs = require("fs");
const path = require("path");

// API Key
const API_KEY = "AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio";

// Output directory
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos";

// Master Style Directive
const MASTER_STYLE = `CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white or transparent background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E, Cream #FAF8F5
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic business icons
- The aesthetic of a $50,000 brand identity project, not a $50 Fiverr logo
- Think: The precision of Swiss design meets the warmth of a trusted advisor

`;

// Prompts
const PROMPT_2A = `${MASTER_STYLE}Create a distinctive VERIFICATION MARK logo — not a generic trust badge, but something with the weight and authority of a notary's embossed seal or an engineer's certification stamp.

VISUAL CONCEPT:
Three concentric circular elements with deliberate, measured spacing:
1. OUTER RING: A substantial circular border (not a thin hairline — this has WEIGHT)
2. MIDDLE: An open negative space ring creating rhythm and breathing room
3. CENTER: Three small circles arranged in precise triangular formation — these are "proof points" representing data points that converge to verify a thesis

COLOR EXECUTION:
- Outer ring and structural elements: Navy (#0F1729)
- Three proof points in center: Gold (#D4A853)
- Background: White

RENDER AS:
Professional emblem-style logo, flat vector design. Should look like it could be pressed into sealing wax or embossed on premium stationery.`;

const PROMPT_2B = `${MASTER_STYLE}Create a geometric verification mark where a TRIANGLE IS IMPLIED by three substantial circular points at each vertex, connected by thin precise lines. Make this MORE DISTINCTIVE and MEMORABLE than a typical seal.

VISUAL CONCEPT:
Three solid circles positioned at the vertices of an equilateral triangle. These circles are connected by thin, precise lines forming the triangle's edges. The entire composition is surrounded by a single substantial circular ring.

COLOR EXECUTION:
- Three vertex points: Gold (#D4A853)
- Connecting lines: Navy (#0F1729), thin
- Outer ring: Navy (#0F1729), substantial weight
- Background: White

RENDER AS:
Distinctive geometric logo mark, flat vector style. Clean, precise, authoritative.`;

const PROMPT_2C = `${MASTER_STYLE}Create a SEAL-STYLE emblem logo that is EXTRAORDINARY and MEMORABLE while remaining completely professional.

VISUAL CONCEPT:
A substantial circular border contains curved text:
- "SCALEUP" arcs along the TOP interior of the circle
- "VENTURES" arcs along the BOTTOM interior of the circle
- In the CENTER: three proof points arranged within a secondary geometric element

TYPOGRAPHY:
- Refined serif typeface, ALL CAPS, tracked out for readability on the curve

COLOR EXECUTION:
- Outer ring and text: Navy (#0F1729)
- Three center proof points: Gold (#D4A853)
- Background: White

RENDER AS:
Sophisticated emblem-style logo, flat vector design.`;

const prompts = [
  { name: "seal-1", prompt: PROMPT_2A, description: "Conservative interpretation - clean concentric rings with proof points" },
  { name: "seal-2", prompt: PROMPT_2B, description: "Push creativity - more distinctive seal/emblem execution" },
  { name: "seal-3", prompt: PROMPT_2C, description: "Maximum creativity - extraordinary verification mark while staying professional" },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function makeRequest(prompt, modelName) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"]
      }
    });

    const options = {
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode === 200) {
            resolve(json);
          } else {
            reject({ statusCode: res.statusCode, body: json });
          }
        } catch (e) {
          reject({ statusCode: res.statusCode, body: body });
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function generateLogo(prompt, outputPath, name) {
  console.log(`\nGenerating ${name}...`);

  // Try different models
  const models = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest"
  ];

  for (const modelName of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`  Attempt ${attempt}/3 with model: ${modelName}`);

        const response = await makeRequest(prompt, modelName);

        if (response.candidates && response.candidates[0] && response.candidates[0].content) {
          const parts = response.candidates[0].content.parts;

          for (const part of parts) {
            if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
              const buffer = Buffer.from(part.inlineData.data, "base64");
              fs.writeFileSync(outputPath, buffer);
              console.log(`  SUCCESS: Saved to ${outputPath}`);
              return { success: true, model: modelName };
            }
          }

          console.log(`  No image in response (got: ${parts.map(p => Object.keys(p)).join(", ")})`);
        }

      } catch (error) {
        if (error.statusCode === 429) {
          const retryDelay = 30 + (attempt * 15);
          console.log(`  Rate limited (429). Waiting ${retryDelay}s...`);
          await sleep(retryDelay * 1000);
        } else {
          console.log(`  Error: ${error.statusCode || error.message}`);
          if (error.body && typeof error.body === "object") {
            console.log(`  Details: ${JSON.stringify(error.body).substring(0, 200)}`);
          }
          break; // Try next model
        }
      }
    }
  }

  return { success: false };
}

async function main() {
  console.log("ScaleUp Ventures - Proof Seal Logo Generation (REST API)");
  console.log("=========================================================");
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Started at: ${new Date().toISOString()}\n`);

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const { name, prompt, description } = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);

    console.log(`\n--- ${name.toUpperCase()} (${i+1}/${prompts.length}) ---`);
    console.log(`Description: ${description}`);

    const result = await generateLogo(prompt, outputPath, name);
    results.push({
      name,
      description,
      path: outputPath,
      success: result.success,
      model: result.model || null,
      timestamp: new Date().toISOString()
    });

    if (i < prompts.length - 1) {
      const waitTime = result.success ? 30 : 60;
      console.log(`\n  Waiting ${waitTime}s before next request...`);
      await sleep(waitTime * 1000);
    }
  }

  // Write summary
  const summaryPath = path.join(OUTPUT_DIR, "seal-summary.json");
  const summary = {
    concept: "The Proof Seal",
    brand: "ScaleUp Ventures",
    tagline: "We Prove It Before You Buy",
    targetAudience: "50-65+ technology-hesitant business owners who've been burned by agencies",
    colors: {
      navy: "#0F1729",
      gold: "#D4A853",
      mutedGold: "#B8956E",
      cream: "#FAF8F5"
    },
    conceptDescription: "The Proof Seal represents verification - like a notary's embossed seal or engineer's stamp",
    generatedAt: new Date().toISOString(),
    logos: results
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n\nSummary saved to: ${summaryPath}`);

  const successCount = results.filter(r => r.success).length;
  console.log(`\nSuccessfully generated: ${successCount}/${results.length} logos`);
}

main().catch(console.error);
