const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Load API key from .env
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const API_KEY = process.env.GOOGLE_API_KEY;
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(API_KEY);

// Master style directive to prepend to all prompts
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

// Logo prompts with increasing creativity
const logoPrompts = [
  {
    name: "chevrons-1",
    creativity: "Conservative",
    prompt: `${MASTER_STYLE}Create a logo mark with THREE OR FOUR CHEVRON SHAPES (wide V-forms pointing upward) stacked vertically, conveying upward momentum and expansion.

VISUAL CONCEPT:
Multiple chevron forms nested within each other. The largest chevron at the base, with each subsequent chevron smaller and positioned above. NOT arrows - these are architectural V-shapes suggesting layered strategy building upon each other.

GEOMETRY:
- 3-4 chevrons, pointing upward
- Largest at bottom, decreasing in size toward top
- Consistent spacing between chevrons - they do NOT touch
- Apex angle: 70-80 degrees (wide enough to feel stable, not so wide they look flat)
- Solid filled shapes preferred over strokes
- The topmost chevron is gold - the pinnacle achievement

COLOR EXECUTION:
- Bottom chevron: Navy (#0F1729)
- Middle chevron(s): Navy (#0F1729) or Muted Gold (#B8956E)
- Top chevron: Bright Gold (#D4A853)
- Background: White

MOOD:
Architectural and structural. Like layers of foundation building upward. Not arrows, not checkmarks, not play buttons. These are load-bearing visual elements.

RENDER AS:
Geometric logo mark, flat vector style. Clean, precise, layered. Professional quality suitable for business cards and corporate materials.`
  },
  {
    name: "chevrons-2",
    creativity: "Medium - Badge/Contained",
    prompt: `${MASTER_STYLE}Create a BADGE-STYLE logo with nested chevrons CONTAINED within a geometric boundary shape.

VISUAL CONCEPT:
The nested chevron mark placed inside a circular or rounded-square container. This creates a more "seal" or "certification badge" quality - the chevrons become a verified symbol of upward momentum and proven growth.

GEOMETRY:
- Container: circle OR rounded square (corner radius 12-16% of width)
- Container is solid Navy (#0F1729)
- Three to four chevrons inside, pointing upward
- Chevrons rendered in lighter colors: Cream (#FAF8F5) for base chevrons, Gold (#D4A853) for top chevron
- Chevrons have comfortable padding from container edges (12-15% margin)
- Each chevron is smaller than the one below it, creating layered depth

COLOR EXECUTION:
- Container: Navy (#0F1729)
- Lower chevrons: Cream (#FAF8F5)
- Top chevron: Gold (#D4A853)
- Background: White

CREATIVE TREATMENT:
Make the chevrons feel like they're building toward something - perhaps subtle variation in stroke weight or slight dimensional interplay between layers. The badge should feel like a seal of quality, not a generic icon.

USE CASES:
Favicon, app icon, profile pictures, embroidery, stamp applications.

RENDER AS:
Contained badge-style logo, flat vector design. Should work beautifully at 32px and at 320px. Professional, substantial, trustworthy.`
  },
  {
    name: "chevrons-3",
    creativity: "Maximum - Architectural/Extraordinary",
    prompt: `${MASTER_STYLE}Create an EXTRAORDINARY and DISTINCTIVE logo featuring chevrons reimagined as architectural elements suggesting a building, monument, or structural achievement.

VISUAL CONCEPT:
Transform the nested chevron concept into something remarkable and memorable. Think of chevrons not as simple V-shapes, but as:
- The apex of a precision-engineered structure
- Layers of a building rising toward achievement
- Architectural brackets supporting upward momentum
- The crown of a monument to proven success

CREATIVE DIRECTION:
- Push beyond basic stacked chevrons into territory that feels monumental
- Consider chevrons that interlock or support each other structurally
- Perhaps chevrons that form negative space creating additional meaning
- The silhouette should be immediately distinctive and ownable
- Think about how this would look etched into the cornerstone of a building

GEOMETRY:
- 3-4 chevron-inspired forms with sophisticated proportions
- May incorporate additional geometric elements that enhance the architectural quality
- Consider subtle use of line weights to create depth without breaking flat design rules
- The gold accent should mark the pinnacle or transformative element
- Overall composition should feel like it could be a building's crown or capstone

COLOR EXECUTION:
- Primary structure: Navy (#0F1729)
- Accent/pinnacle element: Gold (#D4A853)
- Supporting elements: Muted Gold (#B8956E) or Cream (#FAF8F5)
- Background: White

MOOD & FEELING:
This should feel MONUMENTAL. Like it belongs cast in bronze at the entrance of a Fortune 500 headquarters. Something a 58-year-old business owner would look at and think "these people build empires." The precision of an architect's masterwork. Not trendy - TIMELESS.

WHAT THIS IS NOT:
- Not basic stacked chevrons
- Not arrows or play buttons
- Not generic or predictable
- Not something you'd see on a thousand other consulting firms

RENDER AS:
Distinctive architectural logo mark, flat vector style. Professional, substantial, remarkable. The kind of logo that stops people and makes them pay attention.`
  }
];

// Sleep helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate with retry logic
async function generateWithRetry(model, prompt, maxRetries = 3, initialDelay = 20000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return await result.response;
    } catch (error) {
      if (error.message && error.message.includes("429")) {
        // Rate limit - extract retry delay or use exponential backoff
        const retryMatch = error.message.match(/retry in (\d+\.?\d*)/i);
        const retryDelay = retryMatch ? parseFloat(retryMatch[1]) * 1000 + 2000 : initialDelay * attempt;

        console.log(`  Rate limited. Waiting ${Math.round(retryDelay/1000)}s before retry ${attempt}/${maxRetries}...`);
        await sleep(retryDelay);
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
}

async function generateLogo(prompt, outputPath, name) {
  console.log(`\nGenerating ${name}...`);
  console.log(`Creativity level: ${prompt.creativity}`);

  try {
    // Use gemini-2.0-flash-exp with image generation config
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      },
    });

    const response = await generateWithRetry(model, prompt.prompt);

    // Check for image in response
    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      const parts = response.candidates[0].content.parts;

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
          // Decode base64 image and save
          const imageData = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, imageData);
          console.log(`SUCCESS: Saved to ${outputPath}`);
          return {
            success: true,
            path: outputPath,
            name: name,
            creativity: prompt.creativity
          };
        }
      }
    }

    console.log("No image found in response.");
    return {
      success: false,
      name: name,
      error: "No image in response"
    };

  } catch (error) {
    console.error(`ERROR generating ${name}:`, error.message);
    return {
      success: false,
      name: name,
      error: error.message
    };
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("ScaleUp Ventures Logo Generation - Nested Chevrons Concept");
  console.log("=".repeat(60));
  console.log(`\nUsing model: gemini-2.0-flash-exp`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`\nNote: Will retry on rate limits with delays up to 60 seconds.`);

  const results = [];

  for (let i = 0; i < logoPrompts.length; i++) {
    const prompt = logoPrompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${prompt.name}.png`);

    const result = await generateLogo(prompt, outputPath, prompt.name);
    results.push(result);

    // Longer delay between API calls to respect rate limits
    if (i < logoPrompts.length - 1) {
      console.log("\nWaiting 25 seconds before next generation...");
      await sleep(25000);
    }
  }

  // Generate summary JSON
  const summary = {
    concept: "Nested Chevrons",
    generatedAt: new Date().toISOString(),
    model: "gemini-2.0-flash-exp",
    brand: {
      name: "ScaleUp Ventures",
      tagline: "We Prove It Before You Buy",
      colors: {
        navy: "#0F1729",
        gold: "#D4A853",
        mutedGold: "#B8956E",
        cream: "#FAF8F5"
      }
    },
    logos: results.map((r, i) => ({
      filename: `chevrons-${i + 1}.png`,
      creativityLevel: logoPrompts[i].creativity,
      description: i === 0
        ? "Conservative - Clean 3-4 stacked chevrons with gold top"
        : i === 1
        ? "Badge/Contained - Chevrons within circular/rounded container"
        : "Maximum creativity - Architectural/monumental chevron interpretation",
      success: r.success,
      error: r.error || null
    }))
  };

  const summaryPath = path.join(OUTPUT_DIR, "chevrons-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved to: ${summaryPath}`);

  console.log("\n" + "=".repeat(60));
  console.log("GENERATION COMPLETE");
  console.log("=".repeat(60));

  const successful = results.filter(r => r.success).length;
  console.log(`\nSuccessful: ${successful}/${results.length}`);

  if (successful > 0) {
    console.log("\nGenerated files:");
    results.filter(r => r.success).forEach(r => {
      console.log(`  - ${r.path}`);
    });
  }
}

main().catch(console.error);
