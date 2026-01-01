const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Using Gemini 3 Pro Image Preview with MAXIMUM CREATIVITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const MODEL = 'gemini-3-pro-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Output path
const OUTPUT_PATH = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/heron/heron-02-elegant-standing.png';

// The LEGENDARY Heron Logo Prompt
const HERON_PROMPT = `CRITICAL STYLE REQUIREMENTS - READ CAREFULLY:
- This is a PROFESSIONAL LOGO DESIGN, not an illustration
- Vector-style flat design rendering - ABSOLUTELY NO gradients, NO shadows, NO 3D effects
- Background MUST be PURE WHITE (#FFFFFF) - completely clean, no texture
- The aesthetic of a $100,000 heritage brand identity from Pentagram or Landor
- Think: Hermes, Burberry, Ralph Lauren - dignified animal symbols that stand for decades
- NOT clip art, NOT stock imagery, NOT a nature illustration
- This is a BRAND MARK that will be embossed on leather, etched in glass, printed on business cards

===== THE HERON: PATIENT GUARDIAN OF PROVEN RESULTS =====

CONCEPT:
Picture a great blue heron at dawn, standing perfectly still in calm water. It has been watching for 20 minutes. It will watch for 20 more. The heron knows that patience IS the strategy. It never strikes until the moment is certain.

This is the symbol of ScaleUp Ventures - a B2B advisory firm that proves ROI before clients invest. Their tagline: "We Prove It Before You Buy." The audience is 50-65 year old successful business owners who have been BURNED by consultants. This logo must instantly communicate: HERITAGE, WISDOM, PATIENCE, EXCELLENCE.

DESIGN DIRECTION:
- A single great heron in CLASSIC LEFT-FACING PROFILE (facing toward the future/right side of the page)
- Standing pose - one leg visible, perhaps with a subtle indication of a second leg
- Medium stylization - clearly a heron, but rendered as a sophisticated logo mark, not a bird illustration
- The S-CURVE NECK is essential - elegant, serpentine, flowing from body to head like calligraphy
- SHARP, precise beak - this bird does not miss, pointed and decisive
- Long, slender legs - confident stance, grounded but ready
- Optional: the faintest suggestion of still water/ripple at the feet - just a thin horizontal line
- The silhouette should feel like it could be embossed on fine leather or stamped in wax

THE EYE - CRITICAL DETAIL:
A single small circle or dot in BURNISHED GOLD (#D4A853) for the eye. This is the only gold accent in the entire mark. It represents alertness, wisdom, the watchful patience of earned expertise. This golden eye should feel like the heron sees EVERYTHING.

PROPORTIONS & COMPOSITION:
- The heron should be tall and elegant, with vertical emphasis
- Generous negative space around the bird - let it breathe like Renaissance composition
- The overall shape should work as a standalone symbol
- Consider the composition for a horizontal lockup: symbol on left, "ScaleUp Ventures" text on right

COLOR PALETTE (STRICT):
- Heron body/silhouette: Deep Navy (#0F1729) - authority, depth, trustworthiness
- Eye accent ONLY: Burnished Gold (#D4A853) - wisdom, value, the watching eye
- Background: PURE WHITE (#FFFFFF) - clean, premium, professional

TYPOGRAPHY NOTE (if including text):
"ScaleUp Ventures" in a distinguished serif typeface
- Think: the brass nameplate on a prestigious law firm's mahogany door
- Deep Navy (#0F1729), with slightly generous letter-spacing
- Feels permanent, established, like it has been there for 40 years

EMOTIONAL IMPACT:
When a Fortune 500 CFO sees this logo, they should think:
"This firm has been doing this for decades. They know what they're doing. They're not going anywhere. These are serious people with serious expertise."

WHAT THIS IS NOT:
- Not a nature illustration or wildlife art
- Not trendy, cute, or friendly
- Not a tech startup aesthetic
- Not a bird in flight (we want stillness, patience, watching)
- Not colorful or playful
- Not generic "bird icon" clip art

RENDER AS:
A timeless, heritage-grade logo mark in flat vector style. The kind of symbol that looks like it was designed in 1960 and will still look distinguished in 2060. Something that could be etched into the glass of a corner office door, embossed on a leather portfolio, or rendered as a 2-inch business card icon without losing any presence.

THIS IS A LEGENDARY LOGO. CREATE SOMETHING TIMELESS.`;

async function generateImage(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 1.0  // MAXIMUM CREATIVITY
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    console.log('Sending request to Gemini 3 Pro Image Preview...');
    console.log(`Temperature: 1.0 (MAXIMUM CREATIVITY)`);
    console.log(`Model: ${MODEL}`);
    console.log('');

    const req = https.request(API_URL, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error('API Error Details:', JSON.stringify(response.error, null, 2));
            reject(new Error(`API Error: ${response.error.message}`));
            return;
          }

          // Look for image data in the response
          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                // Decode base64 image and save
                const imageBuffer = Buffer.from(part.inlineData.data, 'base64');

                // Ensure directory exists
                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }

                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`\nSUCCESS! Saved legendary heron logo to:`);
                console.log(outputPath);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

            // If no image found, log the response structure
            console.log('Response parts:', JSON.stringify(parts, null, 2).substring(0, 1000));
            reject(new Error('No image data found in response'));
          } else {
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 2000));
            reject(new Error('Unexpected response structure'));
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

async function main() {
  console.log('='.repeat(70));
  console.log('  SCALEUP VENTURES - LEGENDARY HERON LOGO GENERATION');
  console.log('  "The Elegant Standing Heron - Patient Guardian of Proven Results"');
  console.log('='.repeat(70));
  console.log('');
  console.log('Brand: ScaleUp Ventures');
  console.log('Concept: Heron - Symbol of patience, precision, and proven expertise');
  console.log('Tagline: "We Prove It Before You Buy"');
  console.log('');
  console.log('Visual Direction:');
  console.log('  - Classic left-facing profile, standing pose');
  console.log('  - Elegant S-curve neck, sharp precise beak');
  console.log('  - Deep Navy (#0F1729) with Gold (#D4A853) eye accent');
  console.log('  - Pure white background, flat vector style');
  console.log('  - Heritage brand aesthetic (think Hermes, Burberry)');
  console.log('');
  console.log('-'.repeat(70));
  console.log('');

  try {
    await generateImage(HERON_PROMPT, OUTPUT_PATH);

    console.log('\n' + '='.repeat(70));
    console.log('  GENERATION COMPLETE');
    console.log('='.repeat(70));
    console.log('\nOutput file:');
    console.log(OUTPUT_PATH);
    console.log('\nThis logo embodies:');
    console.log('  - HERITAGE: Timeless design that looks established');
    console.log('  - WISDOM: The watchful golden eye sees everything');
    console.log('  - PATIENCE: Still, poised, never rushing to judgment');
    console.log('  - EXCELLENCE: Premium brand aesthetic worthy of serious clients');

  } catch (error) {
    console.error('\nERROR:', error.message);
    process.exit(1);
  }
}

main();
