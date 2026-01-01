const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key - SV Logo Creation (correct key)
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

// Output directory
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/lynx";

// Master Style Directive for ScaleUp Ventures Lynx Logo
const MASTER_STYLE = `CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- MANDATORY: Pure white background (#FFFFFF)
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette STRICTLY: Navy #0F1729 (primary), Gold #D4A853 (accent for eyes), Muted Gold #B8956E (optional accent)
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic animal illustrations
- The aesthetic of a $50,000 brand identity project
- Think: Sophisticated, powerful, wise - like the logos of top-tier consulting firms
- The lynx must feel AUTHORITATIVE and DISCERNING, not cute or aggressive

`;

// LYNX CONCEPT 1: Minimal - Piercing Eyes Only (Most Abstract)
const LYNX_MINIMAL = `${MASTER_STYLE}Create a MINIMAL, ABSTRACT logo for "ScaleUp Ventures" featuring only the PIERCING EYES of a lynx.

VISUAL CONCEPT - THE LYNX'S GAZE:
The lynx was revered as "the keeper of secrets" - able to see hidden truths others miss. This logo captures ONLY the essence: two intense, all-seeing eyes that seem to look through you and see what you're hiding.

SYMBOL DESIGN:
- Two almond-shaped eyes, angular and sharp at the outer corners (lynx eyes have distinctive angular shapes)
- Eyes should be stylized and geometric, not realistic
- The negative space between and around the eyes should feel intentional, creating a subtle suggestion of the lynx face shape
- Gold (#D4A853) irises or pupils - the gold represents valuable insight, truth revealed
- Navy (#0F1729) for the eye outlines and any structural elements
- The gaze should feel PENETRATING and KNOWING - like the eyes of someone who sees through deception
- Consider subtle angular lines extending from outer eye corners suggesting the lynx's distinctive facial markings

COMPOSITION:
- Eyes positioned horizontally, level, facing forward directly at the viewer
- Maintain enough negative space that the eyes feel powerful, not crowded
- Below the eyes: "ScaleUp Ventures" in an elegant, confident serif typeface
- The text should be in Navy (#0F1729)
- Text treatment: refined serif (think Crimson, Freight, or similar) - professional but warm
- Overall lockup should work as a horizontal logo

MOOD & FEELING:
Like being assessed by someone who can see your true intentions. Not threatening, but deeply perceptive. The quiet confidence of someone who knows they'll find the truth. Sophisticated wisdom, not predatory aggression.

WHAT THIS IS NOT:
- Not a full animal face
- Not cute or cartoonish
- Not aggressive or threatening
- Not a generic "eye" icon
- Not realistic or photographic
- Not busy or over-detailed

TECHNICAL:
- Must scale down beautifully to 32px favicon size (eyes should still read)
- Must work in single color (navy only) as well as two-color
- Clean white background (#FFFFFF)
- Vector-style flat design

RENDER AS:
Sophisticated minimal logo mark. This should feel like the logo of a $500M private equity firm that prides itself on due diligence.`;

// LYNX CONCEPT 2: Profile Head with Tufted Ears (Medium Detail)
const LYNX_PROFILE = `${MASTER_STYLE}Create a SOPHISTICATED PROFILE logo for "ScaleUp Ventures" featuring a lynx head in profile, emphasizing the distinctive tufted ears.

VISUAL CONCEPT - THE KEEPER OF SECRETS:
In mythology, the lynx was Lynceus, who could "see through the earth itself" - perceiving what was hidden from all others. This profile view captures the lynx as a symbol of piercing insight and professional discernment.

SYMBOL DESIGN:
- Lynx head in LEFT-FACING PROFILE (looking toward the future, forward-thinking)
- DISTINCTIVE TUFTED EARS are the key feature - those elegant black ear tufts that distinguish lynx from other cats
- The ear tufts should be prominent and elegantly rendered - like antennae receiving hidden signals
- Strong, angular jaw line suggesting determination and certainty
- A single visible eye with GOLD (#D4A853) - piercing, knowing, seeing the hidden truth
- Facial structure should feel GEOMETRIC and REFINED, not organic or fluffy
- Clean angular lines - think of how Saul Bass or Paul Rand would render an animal
- The silhouette should be instantly recognizable as a lynx due to those ear tufts

COMPOSITION:
- Profile head occupies the left or top portion of the logo
- "ScaleUp Ventures" positioned to the right of or below the symbol
- Typography: elegant serif, tracked for sophistication (Crimson Pro, Freight, or similar weight)
- Text in Navy (#0F1729)
- The overall composition should feel balanced and intentional
- Consider a subtle horizontal line or geometric element connecting symbol to text

COLOR EXECUTION:
- Lynx head and structural elements: Navy (#0F1729)
- Eye detail (iris or highlight): Gold (#D4A853)
- Optional: subtle gold accent on ear tufts or facial marking
- Background: Pure white (#FFFFFF)

MOOD & FEELING:
Noble watchfulness. The quiet confidence of an expert who has seen it all. Like a portrait of a trusted advisor who will see what others miss. Professional, sophisticated, trustworthy.

WHAT THIS IS NOT:
- Not a cute cat
- Not aggressive or snarling
- Not overly detailed or realistic
- Not a generic wildcat (the TUFTED EARS must be prominent)
- Not a crest or heraldic style

TECHNICAL:
- Must scale down to favicon size (the silhouette should still be recognizable)
- Must work in single color as well as two-color
- Clean geometric construction
- Vector-style flat design

RENDER AS:
Sophisticated corporate logo with distinctive animal symbol. Think: the kind of mark that would appear on a McKinsey or Goldman Sachs competitor's materials.`;

// LYNX CONCEPT 3: Full Front-Facing Head with Intense Stare (Most Detailed)
const LYNX_FRONTAL = `${MASTER_STYLE}Create a POWERFUL FRONT-FACING logo for "ScaleUp Ventures" featuring a full lynx head looking directly at the viewer with an intense, knowing stare.

VISUAL CONCEPT - THE ALL-SEEING ADVISOR:
The lynx confronts you directly. There is no hiding from this gaze. This is the moment when a master due diligence expert looks at your business and you realize they will find everything - every hidden liability, every undisclosed risk, every truth you've tried to bury.

SYMBOL DESIGN:
- Lynx head viewed straight-on, SYMMETRICAL, facing directly at the viewer
- BOTH TUFTED EARS prominently displayed, rising like peaks on either side
- Strong angular face structure - lynx have distinctive triangular faces with prominent cheek ruffs
- The EYES are the focal point: GOLD (#D4A853) - intense, piercing, all-seeing
- Eyes should be level, unwavering, penetrating - the gaze of someone who sees through pretense
- Geometric interpretation: angular lines, clean shapes - NOT realistic fur texture
- The facial markings of a lynx (the lines extending from inner eye corners) can be subtly suggested
- The overall form should feel like it was constructed with compass and ruler, not sketched freehand

COMPOSITION:
- Lynx head centered or positioned prominently above text
- "ScaleUp Ventures" below the symbol, centered
- Typography: confident serif typeface, substantial weight (not light or thin)
- Text in Navy (#0F1729)
- The lynx symbol and text should feel like one unified mark, not separate elements
- Consider how the angular lines of the lynx face might echo the letterforms

COLOR EXECUTION:
- Primary lynx structure: Navy (#0F1729)
- Eyes: Gold (#D4A853) - these should be the visual accent point
- Possible subtle gold accent on ear tufts or nose
- Background: Pure white (#FFFFFF)

MOOD & FEELING:
Direct, commanding, authoritative - but wise rather than aggressive. The feeling of sitting across from someone who will see through any pretense. Not intimidating in a threatening way, but intimidating in an "I will find the truth" way. The confidence of proven expertise.

WHAT THIS IS NOT:
- Not cute, cartoon, or mascot-like
- Not snarling, aggressive, or predatory
- Not so detailed it becomes illustration rather than logo
- Not generic "big cat" - must be distinctly LYNX with those tufted ears
- Not a coat of arms or heraldic treatment

TECHNICAL:
- Must maintain impact when scaled to small sizes
- The symmetry should be precise and intentional
- Works in single color and two-color
- Clean geometric construction throughout
- Vector-style flat design

RENDER AS:
Authoritative corporate logo with powerful animal symbol. The kind of mark that makes people take the company seriously before they even read about what it does.`;

const prompts = [
  {
    name: "lynx-01-minimal-eyes",
    prompt: LYNX_MINIMAL,
    description: "Minimal - Piercing lynx eyes only (most abstract)"
  },
  {
    name: "lynx-02-profile-tufted",
    prompt: LYNX_PROFILE,
    description: "Profile view with prominent tufted ears (medium detail)"
  },
  {
    name: "lynx-03-frontal-intense",
    prompt: LYNX_FRONTAL,
    description: "Front-facing head with intense direct stare (most detailed)"
  },
];

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateLogo(genAI, prompt, outputPath, name, retries = 3) {
  console.log(`\nGenerating ${name}...`);

  // Try multiple models in order of preference
  const models = [
    "gemini-2.0-flash-exp-image-generation",
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash"
  ];

  let modelName = models[0];

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${retries} with model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      });

      const response = await model.generateContent(prompt);
      const result = response.response;

      if (result.candidates && result.candidates[0] && result.candidates[0].content) {
        const parts = result.candidates[0].content.parts;

        for (const part of parts) {
          if (part.inlineData && part.inlineData.mimeType.startsWith("image/")) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync(outputPath, buffer);
            console.log(`  SUCCESS: Saved to: ${outputPath}`);
            return { success: true, path: outputPath, model: modelName };
          }
        }

        console.log(`  Response parts:`, parts.map(p => Object.keys(p)));
      }

      console.log(`  No image in response from ${modelName}`);

    } catch (error) {
      const errMsg = error.message || String(error);
      console.log(`  Error: ${errMsg.substring(0, 200)}`);

      if (errMsg.includes("429") || errMsg.includes("quota")) {
        // Try next model if available
        const currentModelIndex = models.indexOf(modelName);
        if (currentModelIndex < models.length - 1) {
          modelName = models[currentModelIndex + 1];
          console.log(`  Switching to alternate model: ${modelName}`);
          await sleep(2000);
        } else {
          const retryMatch = errMsg.match(/retry in (\d+)/i);
          const waitTime = retryMatch ? (parseInt(retryMatch[1]) + 5) * 1000 : 30000 + (attempt * 15000);
          console.log(`  Rate limited. Waiting ${waitTime/1000}s before retry...`);
          await sleep(waitTime);
        }
      } else {
        await sleep(5000);
      }
    }
  }

  return { success: false, error: "All attempts failed" };
}

async function main() {
  console.log("==============================================");
  console.log("ScaleUp Ventures - THE LYNX Logo Generation");
  console.log("==============================================");
  console.log("Symbol: The Lynx - Keeper of Secrets, Seer of Hidden Truths");
  console.log("Using model: gemini-2.0-flash-exp");
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`Started at: ${new Date().toISOString()}\n`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const { name, prompt, description } = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);
    console.log(`\n--- ${name.toUpperCase()} (${i+1}/${prompts.length}) ---`);
    console.log(`Description: ${description}`);

    const result = await generateLogo(genAI, prompt, outputPath, name);
    results.push({
      name,
      description,
      path: outputPath,
      success: result.success,
      model: result.model || null,
      error: result.error || null,
      timestamp: new Date().toISOString(),
    });

    // Wait between requests to avoid rate limits
    if (i < prompts.length - 1 && result.success) {
      console.log("\n  Waiting 30 seconds before next generation...");
      await sleep(30000);
    } else if (i < prompts.length - 1) {
      console.log("\n  Waiting 45 seconds before next attempt...");
      await sleep(45000);
    }
  }

  // Write summary JSON
  const summaryPath = path.join(OUTPUT_DIR, "lynx-summary.json");
  const summary = {
    concept: "The Lynx - Keeper of Secrets",
    brand: "ScaleUp Ventures",
    tagline: "We Prove It Before You Buy",
    targetAudience: "50-65 year old skeptical business owners who've been burned by consultants",
    symbolMeaning: {
      mythology: "Lynceus from Greek mythology - could see through the earth itself",
      qualities: "Piercing insight, revealing hidden truths, seeing what others miss",
      features: "Distinctive tufted ears, intense piercing eyes, angular face"
    },
    colors: {
      navy: "#0F1729",
      gold: "#D4A853",
      mutedGold: "#B8956E",
      background: "#FFFFFF"
    },
    generatedAt: new Date().toISOString(),
    model: "gemini-2.0-flash-exp",
    logos: results,
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n\nSummary saved to: ${summaryPath}`);

  console.log("\n==============================================");
  console.log("Generation Complete!");
  console.log("==============================================");

  const successCount = results.filter(r => r.success).length;
  console.log(`Successfully generated: ${successCount}/${results.length} logos`);

  if (successCount > 0) {
    console.log("\nGenerated logos:");
    results.filter(r => r.success).forEach(r => {
      console.log(`  - ${r.name}: ${r.path}`);
    });
  }

  if (successCount === 0) {
    console.log("\n*** QUOTA EXHAUSTED ***");
    console.log("The free tier daily quota appears to be exhausted.");
    console.log("\nOptions:");
    console.log("1. Wait until quota resets (typically midnight PT)");
    console.log("2. Enable billing on Google Cloud Console");
    console.log("3. Use AI Studio directly: https://aistudio.google.com/");
  }
}

main().catch(console.error);
