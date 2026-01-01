const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration
const API_KEY = 'AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio';

// Try different models for image generation
const MODELS_TO_TRY = [
  'gemini-2.0-flash-preview-image-generation',
  'imagen-3.0-generate-002',
  'imagen-3.0-generate-001',
  'gemini-1.5-flash'
];

// Output paths
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos';

// Brand Style Directive (applied to all prompts)
const STYLE_DIRECTIVE = `CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white or transparent background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E, Cream #FAF8F5
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic business icons
- The aesthetic of a $50,000 brand identity project, not a $50 Fiverr logo
- Think: The precision of Swiss design meets the warmth of a trusted advisor`;

// Three prompts with increasing creativity
const prompts = [
  {
    name: "fulcrum-1",
    title: "Conservative Fulcrum - Classic Interpretation",
    prompt: `${STYLE_DIRECTIVE}

Create a sophisticated abstract logo mark representing a FULCRUM — the precise pivot point where leverage transforms small force into significant movement.

VISUAL CONCEPT:
A single elegant geometric form: an inverted triangle or chevron shape balanced perfectly on its apex point. The shape should appear poised at the exact moment of transformation — stable yet charged with potential energy. NOT falling, NOT static — perfectly balanced at the tipping point.

GEOMETRY:
- Clean angular form with razor-sharp edges
- The apex (bottom point) touches an implied baseline
- Proportions suggest engineered precision, like an architectural detail
- A small circular element or diamond shape at the apex point rendered in gold (#D4A853) — this is the "golden" fulcrum point where transformation occurs

COLOR EXECUTION:
- Primary geometric form: Deep navy (#0F1729)
- Fulcrum point accent: Rich gold (#D4A853)
- Background: Pure white

MOOD & FEELING:
This should feel like something you'd see etched into the glass door of a respected consulting firm that's been in business for 40 years. The confidence of earned expertise. The precision of an engineer's instrument. Something a 58-year-old business owner would respect — not something trying to impress them.

WHAT THIS IS NOT:
- Not a play button or arrow
- Not a pyramid scheme logo
- Not a tech startup aesthetic
- Not decorative or trendy
- Not cute or friendly — it's SUBSTANTIVE

RENDER AS:
Professional logo mark, flat vector style, suitable for business cards and letterhead. Clean lines, perfect geometry, the aesthetic of serious money and serious expertise.`
  },
  {
    name: "fulcrum-2",
    title: "Distinctive Fulcrum - The Wedge Variation",
    prompt: `${STYLE_DIRECTIVE}

Create a minimalist yet DISTINCTIVE logo mark based on a WEDGE — the most fundamental tool for creating mechanical advantage. Push the concept further with bold, memorable geometry.

VISUAL CONCEPT:
An elongated isosceles triangle lying on its longest side, with the sharp apex pointing to the right. This is not a decorative triangle — it's a TOOL, rendered with the proportions and intentionality of an actual lever's fulcrum wedge. The design should feel DYNAMIC and PURPOSEFUL.

GEOMETRY:
- Proportions approximately 5:1 (length to height) — long and purposeful
- The sharp apex point features a striking gold (#D4A853) element — either a bold gold tip or the last 15% of the wedge in solid gold
- Consider adding a subtle secondary element: a thin horizontal baseline in gold that grounds the wedge
- Horizontal orientation suggests forward momentum without being a generic arrow
- The overall shape should be MEMORABLE — something that sticks in your mind

COLOR EXECUTION:
- Main wedge body: Navy (#0F1729) with a CRISP transition to Gold (#D4A853) at the apex
- The gold tip should be substantial enough to catch attention
- Consider a thin gold accent line underneath as a baseline
- Background: Pure white

MOOD:
The precision of a machinist's tool. The intentionality of engineering. This wedge means business — it's designed to move mountains, one precise application of force at a time. MORE CONFIDENT, MORE BOLD than a typical corporate logo.

RENDER AS:
Professional geometric logo mark, vector-style, flat design. Should look like it belongs stamped into brushed steel or embossed on premium stationery. DISTINCTIVE and MEMORABLE.`
  },
  {
    name: "fulcrum-3",
    title: "Maximum Creativity - Intersection Point Transformation",
    prompt: `${STYLE_DIRECTIVE}

Create an EXTRAORDINARY abstract geometric logo representing the EXACT INTERSECTION POINT where two forces meet and profound transformation occurs. This should be the most CREATIVE and VISUALLY STRIKING interpretation while maintaining professional elegance.

VISUAL CONCEPT:
Two rectangular planes of DIFFERENT sizes intersecting at a precise corner point in a DYNAMIC composition. The smaller plane (representing strategic input) meets the larger plane (representing amplified results) at their corners, creating visual TENSION and ENERGY. The intersection point is marked with a bold gold diamond — the "golden" coordinate where leverage creates transformation.

ADVANCED GEOMETRY:
- Smaller rectangle: approximately 1 unit, positioned at an angle (perhaps 15-20 degrees off vertical)
- Larger rectangle: approximately 2.5-3 units (showing dramatic amplification), at a complementary angle
- Rectangles intersect at their corners, creating an angular, DYNAMIC composition
- The intersection point highlighted with a BOLD gold (#D4A853) diamond shape — larger and more prominent than typical
- Consider adding subtle geometric accents: thin gold lines extending from the intersection point like coordinate markers
- The overall composition should feel like architectural INNOVATION — fresh yet timeless

COLOR EXECUTION:
- Both rectangles: Deep Navy (#0F1729) with SHARP, CLEAN edges
- Intersection marker: Bold Gold (#D4A853) diamond — make it STRIKING
- Optional: thin gold coordinate lines extending from the intersection point
- Background: White

EXTRAORDINARY TOUCHES:
- The angles and proportions should feel UNEXPECTED yet perfectly balanced
- The composition should create visual intrigue — something that makes people look twice
- Like an architectural diagram from a prize-winning building that breaks conventions
- The precision of structural engineering meets artistic vision

MOOD:
This is what INNOVATIVE strategy looks like when rendered as geometry. Not safe corporate minimalism — BOLD, CONFIDENT, VISIONARY while remaining sophisticated. A logo that says "We don't think like everyone else." Something a successful business owner would be PROUD to have represent their partnership.

RENDER AS:
Sophisticated geometric logo pushing creative boundaries, flat vector style. The aesthetic of architectural drawings from a visionary firm. SERIOUS but EXTRAORDINARY. The kind of logo that wins design awards while still working perfectly on a business card.`
  }
];

async function generateImageWithModel(prompt, outputPath, model) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 1.0
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(apiUrl, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            reject(new Error(`API Error (${model}): ${response.error.message}`));
            return;
          }

          // Look for image data in the response
          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                // Decode base64 image and save
                const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`Saved image to: ${outputPath}`);
                resolve({ success: true, path: outputPath, model });
                return;
              }
            }

            // If no image found, log the response structure
            console.log('Response parts:', JSON.stringify(parts, null, 2).substring(0, 500));
            reject(new Error(`No image data found in response from ${model}`));
          } else {
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 1000));
            reject(new Error(`Unexpected response structure from ${model}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`Request error: ${e.message}`));
    });

    req.write(requestBody);
    req.end();
  });
}

async function generateImage(prompt, outputPath) {
  // Try each model in sequence until one works
  for (const model of MODELS_TO_TRY) {
    try {
      console.log(`  Trying model: ${model}...`);
      const result = await generateImageWithModel(prompt, outputPath, model);
      return result;
    } catch (error) {
      console.log(`  ${model}: ${error.message.substring(0, 100)}`);
      // Wait before trying next model
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error('All models failed to generate image');
}

async function main() {
  console.log('='.repeat(60));
  console.log('ScaleUp Ventures - Fulcrum Logo Generation');
  console.log('='.repeat(60));
  console.log('');
  console.log('Models to try:', MODELS_TO_TRY.join(', '));

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const { name, title, prompt } = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);

    console.log(`\n[${ i + 1}/3] Generating: ${title}`);
    console.log('-'.repeat(50));

    try {
      const result = await generateImage(prompt, outputPath);
      results.push({
        name,
        title,
        status: 'success',
        path: outputPath,
        model: result.model,
        prompt: prompt.substring(0, 500) + '...'
      });
      console.log(`SUCCESS: ${outputPath} (using ${result.model})`);
    } catch (error) {
      console.error(`ERROR: ${error.message}`);
      results.push({
        name,
        title,
        status: 'error',
        error: error.message,
        prompt: prompt.substring(0, 500) + '...'
      });
    }

    // Small delay between requests
    if (i < prompts.length - 1) {
      console.log('Waiting 5 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Save summary
  const summaryPath = path.join(OUTPUT_DIR, 'fulcrum-summary.json');
  const summary = {
    generated: new Date().toISOString(),
    brand: 'ScaleUp Ventures',
    concept: 'The Fulcrum Mark',
    description: 'Three logo variations based on the fulcrum concept - the precise pivot point where leverage transforms small force into significant movement',
    results: results.map((r, i) => ({
      ...r,
      creativityLevel: i === 0 ? 'Conservative' : i === 1 ? 'Distinctive' : 'Maximum Creativity',
      fullPrompt: prompts[i].prompt
    }))
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved to: ${summaryPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.status === 'success').length;
  console.log(`Results: ${successful}/${results.length} logos generated successfully`);
}

main().catch(console.error);
