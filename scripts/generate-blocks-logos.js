const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API key from .env
const API_KEY = "AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio";

const genAI = new GoogleGenerativeAI(API_KEY);

// Master style directive to be prepended to all prompts
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

// Three progressively creative prompts
const prompts = [
  {
    id: 1,
    name: "Conservative Diagonal Blocks",
    description: "Clean 4 blocks on 45-degree diagonal with gold top block - faithful to Prompt 8",
    prompt: `${MASTER_STYLE}Create a logo mark with FOUR SQUARE BLOCKS arranged in an ASCENDING DIAGONAL pattern from lower-left to upper-right.

VISUAL CONCEPT:
Four identical squares positioned on a 45-degree diagonal axis. Like stepping stones or building blocks, each one representing a milestone achieved. The progression moves from muted (lower-left) to bright gold (upper-right).

GEOMETRY:
- 4 squares, all identical in size
- Arranged on a 45-degree ascending diagonal
- Squares nearly touch (1-2px gap at scale) or slightly overlap
- Creates impression of forward momentum and systematic building
- Overall footprint roughly square

COLOR EXECUTION:
- Block 1 (lower-left): Dark muted (#8B7355)
- Block 2: Muted Gold (#B8956E)
- Block 3: Navy (#0F1729)
- Block 4 (upper-right): Bright Gold (#D4A853)
- Background: Pure white

MOOD:
Methodical progress. One block at a time. Each milestone built on the foundation of those before. The patience of systematic building. NOT random - every block is intentional.

RENDER AS:
Geometric logo mark, flat vector style. Clean, modular, architectural. No text, just the icon.`
  },
  {
    id: 2,
    name: "Staircase Formation Badge",
    description: "Stair-step blocks in a contained badge format - creative interpretation of Prompt 9",
    prompt: `${MASTER_STYLE}Create a sophisticated BADGE-STYLE logo with FOUR BLOCKS arranged in a STAIR-STEP formation inside a circular container.

VISUAL CONCEPT:
Four square blocks arranged as ascending stairs - each subsequent block positioned one step UP and one step RIGHT (offset by approximately 50% of block size). This staircase pattern is contained within a substantial circular Navy (#0F1729) border, creating a seal-like certification badge quality.

GEOMETRY:
- Container: solid circular ring with substantial weight
- 4 square blocks inside arranged as climbing stairs
- Each block offset up and right from the previous
- Creates a diagonal staircase silhouette within the circle
- Generous padding from container edges (15% margin)
- The circular frame transforms the blocks into a mark of achievement

COLOR EXECUTION:
- Circular container ring: Navy (#0F1729) with substantial stroke weight
- Block 1 (lower-left): Dark muted (#8B7355) or Cream (#FAF8F5) for contrast
- Block 2: Muted Gold (#B8956E)
- Block 3: Navy (#0F1729) or lighter navy
- Block 4 (upper-right, pinnacle): Bright Gold (#D4A853) - the achievement moment
- Background: Pure white

MOOD:
The seriousness of a professional certification. Climbing toward achievement through systematic effort. Every step built on the last. The satisfaction of earned success rendered as a badge of accomplishment.

RENDER AS:
Contained badge-style logo, flat vector design. Should work beautifully at small sizes like favicon. No text, just the icon mark.`
  },
  {
    id: 3,
    name: "Extraordinary Block Construction",
    description: "Maximum creativity - blocks suggesting building something lasting and permanent",
    prompt: `${MASTER_STYLE}Create an EXTRAORDINARY abstract logo mark where BUILDING BLOCKS transcend simple geometry to suggest constructing something PERMANENT and LASTING.

VISUAL CONCEPT:
Reimagine building blocks as architectural foundation elements. Multiple blocks of varying sizes create a dynamic composition that suggests both upward momentum AND structural solidity. Not just stacked squares - these blocks interlock, support each other, and form something greater than their sum.

Think: the cornerstone of a great building, where each block's placement is critical to the whole.

GEOMETRY:
- 4-6 rectangular/square elements of VARYING proportions (not all identical)
- Blocks arranged to suggest architectural assembly - some horizontal, some vertical
- One prominent block in Gold (#D4A853) positioned as the KEYSTONE or CAPSTONE
- Creates a distinctive asymmetrical silhouette that's instantly recognizable
- Negative space between blocks creates visual interest and rhythm
- The composition suggests something BEING BUILT, caught at the moment of completion

ADVANCED COLOR EXECUTION:
- Foundation blocks: Navy (#0F1729) - substantial, load-bearing, trustworthy
- Transitional blocks: Muted Gold (#B8956E) - showing progress
- Capstone/Keystone block: Bright Gold (#D4A853) - the achievement, the crowning element
- Consider using scale variation - larger foundation, smaller finishing elements
- Background: Pure white

MOOD & FEELING:
This is not generic "growth" - this is CONSTRUCTION. Building something that will LAST. The permanence of well-laid foundations. The satisfaction of seeing a structure take shape. The precision of a master builder who knows that each block matters.

A 58-year-old business owner who has built something should look at this and think: "These people understand what it takes to build."

WHAT THIS IS NOT:
- Not a simple diagonal line of squares
- Not a bar chart
- Not decorative or trendy
- Not symmetrical or static - there's ENERGY here

RENDER AS:
Sophisticated geometric logo mark, flat vector style with architectural sensibility. Something that could be cast in bronze or carved in stone. Memorable, distinctive, substantial. No text, just the icon mark.`
  }
];

// Sleep helper
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry helper with exponential backoff
async function generateLogoWithRetry(model, promptText, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxRetries}...`);
      const response = await model.generateContent(promptText);
      return response;
    } catch (error) {
      const errorMsg = error.message || '';
      if (errorMsg.includes("429") && attempt < maxRetries) {
        // Extract retry delay from error message or use exponential backoff
        const waitTime = Math.pow(2, attempt) * 45000; // 45s, 90s, 180s
        console.log(`  Rate limited. Waiting ${waitTime / 1000} seconds before retry...`);
        await sleep(waitTime);
      } else {
        throw error;
      }
    }
  }
}

async function generateLogo(promptData, outputPath) {
  console.log(`\n--- Generating Logo ${promptData.id}: ${promptData.name} ---`);
  console.log(`Description: ${promptData.description}`);

  try {
    // Use gemini-3-pro-image-preview (Nano Banana Pro) model
    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-image-preview",
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });

    const response = await generateLogoWithRetry(model, promptData.prompt);

    // Extract the image from the response
    const result = response.response;

    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const parts = result.candidates[0].content.parts;

      for (const part of parts) {
        if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith("image/")) {
          // Decode base64 and save
          const imageData = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, imageData);
          console.log(`SUCCESS: Saved to ${outputPath}`);
          return {
            success: true,
            path: outputPath,
            promptId: promptData.id,
            name: promptData.name,
            description: promptData.description
          };
        }
      }
    }

    console.log("No image found in response");
    console.log("Response structure:", JSON.stringify(result, null, 2).substring(0, 1500));
    return {
      success: false,
      promptId: promptData.id,
      name: promptData.name,
      error: "No image in response"
    };

  } catch (error) {
    console.error(`Error generating logo ${promptData.id}:`, error.message);
    return {
      success: false,
      promptId: promptData.id,
      name: promptData.name,
      error: error.message
    };
  }
}

async function main() {
  const outputDir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos";

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("=== ScaleUp Ventures Building Blocks Logo Generation ===");
  console.log("Target: 50-65+ technology-hesitant business owners");
  console.log("Concept: Building Blocks - systematic growth one milestone at a time");
  console.log("Model: gemini-3-pro-image-preview (Nano Banana Pro)");
  console.log("");

  const results = [];

  for (const promptData of prompts) {
    const outputPath = path.join(outputDir, `blocks-${promptData.id}.png`);
    const result = await generateLogo(promptData, outputPath);
    results.push(result);

    // Wait between requests to avoid rate limits
    if (promptData.id < prompts.length) {
      console.log("Waiting 60 seconds before next generation to avoid rate limits...");
      await sleep(60000);
    }
  }

  // Create summary JSON
  const summary = {
    concept: "Building Blocks",
    brand: "ScaleUp Ventures",
    targetAudience: "50-65+ technology-hesitant business owners",
    tagline: "We Prove It Before You Buy",
    colors: {
      navy: "#0F1729",
      gold: "#D4A853",
      mutedGold: "#B8956E",
      cream: "#FAF8F5"
    },
    generatedAt: new Date().toISOString(),
    model: "gemini-3-pro-image-preview",
    logos: results.map(r => ({
      id: r.promptId,
      name: r.name,
      description: r.description,
      success: r.success,
      path: r.success ? r.path : null,
      error: r.error || null
    }))
  };

  const summaryPath = path.join(outputDir, "blocks-summary.json");
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n=== Summary saved to ${summaryPath} ===`);

  // Final report
  console.log("\n=== GENERATION COMPLETE ===");
  const successful = results.filter(r => r.success).length;
  console.log(`Successfully generated: ${successful}/${results.length} logos`);

  if (successful < results.length) {
    console.log("\nFailed generations:");
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - Logo ${r.promptId} (${r.name}): ${r.error}`);
    });
  }
}

main().catch(console.error);
