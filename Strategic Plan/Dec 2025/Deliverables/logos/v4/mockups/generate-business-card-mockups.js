const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Using Gemini 3 Pro Image Preview with MAXIMUM CREATIVITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const MODEL = 'gemini-3-pro-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Output directory
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups';

// Business Card Mockup Prompts
const MOCKUP_PROMPTS = [
  {
    name: 'business-card-mockup-elegant-standing',
    prompt: `PROFESSIONAL PHOTOGRAPHY: Premium business card mockup for ScaleUp Ventures

SCENE SETUP:
Create a sophisticated product photography shot of premium business cards on a clean desk surface. This should look like a professional brand photography session - the kind you'd see in a brand identity portfolio from Pentagram or Landor.

BUSINESS CARD SPECIFICATIONS:
Standard business card dimensions (3.5" x 2")
Premium 400gsm cotton paper stock with subtle texture
Soft touch matte finish

CARD FRONT (white background side):
- Clean white (#FFFFFF) background
- Centered logo: A NAVY BLUE (#0F1729) heron silhouette in elegant standing profile
  - The heron is standing on one leg, S-curved neck, sharp beak pointing left
  - Filled silhouette style (not line art)
  - Small GOLD (#D4A853) dot for the eye - the only accent color
- Below the heron: "ScaleUp Ventures" in elegant serif typography, navy blue
- Below that in smaller text: "We Prove It Before You Buy" (tagline)
- The front card should feel like a luxury heritage brand - think Hermes, Burberry level sophistication

CARD BACK (navy background side):
- Deep NAVY (#0F1729) background
- White text layout:
  - "Calvin Williams Jr." (name, prominent)
  - "Founder & CEO" (title)
  - Contact information in clean layout:
    - Email line
    - Phone line
    - Website line
- Small white heron icon in corner (simplified version of main logo)
- Elegant, minimal, executive aesthetic

MOCKUP COMPOSITION:
- Show BOTH front and back of the card
- One card laying flat showing the front
- Another card at an angle showing the back, overlapping slightly
- Perhaps a third card visible at edge for depth
- Realistic soft shadows cast on the surface
- Shot from above at slight angle (product photography style)

SURFACE & ENVIRONMENT:
- Clean, minimal desk surface
- Could be: polished white marble, light grey concrete, or warm oak wood
- Subtle texture visible but not distracting
- Soft, diffused lighting (no harsh shadows)
- The kind of surface you'd see in a Fortune 500 executive's office

PHOTOGRAPHIC QUALITY:
- Sharp focus on the cards
- Shallow depth of field (background slightly soft)
- Professional studio lighting
- Color accurate
- High-end brand photography aesthetic

MOOD:
This is the business card a Fortune 500 CFO would respect. Premium, established, serious. Not trendy, not startup-y, not cheap. These cards say "This firm has been doing this for decades."

DO NOT include:
- Hands or people
- Office clutter
- Multiple colorful objects
- Cheap paper appearance
- Generic clip art heron
- Pixelated or low quality rendering`
  },
  {
    name: 'business-card-mockup-single-stroke',
    prompt: `PROFESSIONAL PHOTOGRAPHY: Premium business card mockup for ScaleUp Ventures - Modern Line Art Version

SCENE SETUP:
Create a sophisticated product photography shot of premium business cards. Professional brand photography quality - the kind you'd see in a design agency portfolio or Print magazine feature.

BUSINESS CARD SPECIFICATIONS:
Standard business card dimensions (3.5" x 2")
Premium heavy stock paper with subtle cotton texture
Luxurious soft touch matte finish

CARD FRONT (white background side):
- Clean white (#FFFFFF) background
- Centered logo: A NAVY BLUE (#0F1729) heron in SINGLE CONTINUOUS LINE style
  - Elegant standing profile, S-curved neck, sharp beak
  - Rendered as OUTLINE / LINE ART - not filled silhouette
  - Single stroke weight, continuous flowing line like calligraphy
  - Small GOLD (#D4A853) dot for the eye accent
  - Modern, artistic interpretation while remaining clearly a heron
- Below the heron: "ScaleUp Ventures" in clean sans-serif or modern serif typography, navy blue
- Below that: "We Prove It Before You Buy" (tagline) in smaller text
- The front should feel modern yet sophisticated - artistic line work with executive polish

CARD BACK (navy background side):
- Deep NAVY (#0F1729) background
- White text, clean modern layout:
  - "Calvin Williams Jr." (name, prominent)
  - "Founder & CEO" (title)
  - Contact details elegantly arranged:
    - Email
    - Phone
    - Website
- Small white line-art heron icon in corner
- Minimal, contemporary, high-end aesthetic

MOCKUP COMPOSITION:
- Display BOTH front and back cards
- Cards arranged artistically - one flat, one angled
- Overlapping composition creates depth and interest
- Third card edge visible for additional dimension
- Natural-looking soft shadows
- Product photography angle (slightly above, angled view)

SURFACE & ENVIRONMENT:
- Premium minimal surface
- Light concrete, white marble, or pale wood
- Clean and uncluttered
- Soft diffused lighting
- Modern creative office aesthetic

PHOTOGRAPHIC QUALITY:
- Crisp focus on card details
- Professional shallow depth of field
- Studio-quality lighting
- True color rendering
- High-resolution appearance

MOOD:
This is a modern interpretation of heritage quality. The line art feels artistic and contemporary while the overall presentation remains executive-level premium. A creative director would appreciate the artistry; a CFO would respect the sophistication.

This version appeals to clients who appreciate design thinking and modern aesthetics while still demanding premium quality.

DO NOT include:
- Hands or people
- Busy backgrounds
- Cheap paper look
- Cartoon or clip art style heron
- Multiple bright colors
- Cluttered scene elements`
  },
  {
    name: 'business-card-mockup-stack',
    prompt: `PROFESSIONAL PHOTOGRAPHY: Premium business card stack mockup for ScaleUp Ventures

SCENE SETUP:
A sophisticated product shot showing a neat stack of ScaleUp Ventures business cards, the kind of photography you'd see in a premium brand identity case study.

THE STACK:
- Clean stack of 20-30 business cards
- Edges perfectly aligned
- Top card shows the FRONT design:
  - White background
  - Navy blue (#0F1729) heron silhouette (elegant standing pose, S-curved neck)
  - Gold (#D4A853) eye accent
  - "ScaleUp Ventures" in distinguished serif typography
  - "We Prove It Before You Buy" tagline
- A few cards fanned out or offset to show depth
- One card laying beside the stack shows the BACK:
  - Navy (#0F1729) background
  - White text: "Calvin Williams Jr." / "Founder & CEO"
  - Contact details
  - Small white heron icon

PAPER QUALITY:
- Thick premium stock (clearly visible 400gsm+ thickness on stack edge)
- Subtle cotton texture
- Soft touch matte finish visible
- The cards LOOK expensive and substantial

SURFACE:
- Polished white marble surface OR dark charcoal slate
- Clean, minimal
- Slight reflection visible
- Executive desk aesthetic

LIGHTING:
- Soft studio lighting
- Gentle shadows defining the stack
- No harsh contrasts
- Professional product photography quality

COMPOSITION:
- Stack slightly off-center for visual interest
- Dramatic but elegant
- Conveys abundance and success
- The image says "This is a serious, established firm"

This should look like it belongs in the brand section of a Fortune 500 company's annual report.

DO NOT include:
- Hands
- Messy arrangement
- Cheap paper appearance
- Blurry or low quality
- Colorful distracting elements`
  }
];

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
                console.log(`SUCCESS! Saved mockup to:`);
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

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('='.repeat(70));
  console.log('  SCALEUP VENTURES - PREMIUM BUSINESS CARD MOCKUPS');
  console.log('  Professional Brand Collateral Generation');
  console.log('='.repeat(70));
  console.log('');
  console.log('Brand: ScaleUp Ventures');
  console.log('Tagline: "We Prove It Before You Buy"');
  console.log('Logo: Navy blue heron with gold eye accent');
  console.log('');
  console.log('Generating mockups for:');
  console.log('  1. Elegant Standing Heron (filled silhouette) - Heritage/Classic');
  console.log('  2. Single Stroke Heron (line art) - Modern/Artistic');
  console.log('  3. Business Card Stack - Premium Presentation');
  console.log('');
  console.log('-'.repeat(70));
  console.log('');

  const results = [];

  for (let i = 0; i < MOCKUP_PROMPTS.length; i++) {
    const mockup = MOCKUP_PROMPTS[i];
    const outputPath = path.join(OUTPUT_DIR, `${mockup.name}.png`);

    console.log(`\n[${ i + 1}/${MOCKUP_PROMPTS.length}] Generating: ${mockup.name}`);
    console.log('-'.repeat(50));

    try {
      const result = await generateImage(mockup.prompt, outputPath);
      results.push({ name: mockup.name, success: true, path: outputPath });
      console.log(`Completed: ${mockup.name}\n`);
    } catch (error) {
      console.error(`FAILED: ${mockup.name} - ${error.message}\n`);
      results.push({ name: mockup.name, success: false, error: error.message });
    }

    // Wait between requests to avoid rate limiting
    if (i < MOCKUP_PROMPTS.length - 1) {
      console.log('Waiting 3 seconds before next generation...\n');
      await delay(3000);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('  GENERATION COMPLETE');
  console.log('='.repeat(70));
  console.log('\nResults Summary:');
  results.forEach(r => {
    const status = r.success ? 'SUCCESS' : 'FAILED';
    console.log(`  [${status}] ${r.name}`);
    if (r.success) {
      console.log(`           ${r.path}`);
    }
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\nTotal: ${successCount}/${results.length} mockups generated successfully`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
}

main();
