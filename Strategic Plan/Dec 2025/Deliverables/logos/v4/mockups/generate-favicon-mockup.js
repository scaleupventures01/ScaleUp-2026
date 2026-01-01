const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Gemini 3 Pro Image Preview with MAXIMUM CREATIVITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

// Output path
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups';

// The favicon mockup prompt
const FAVICON_MOCKUP_PROMPT = `
CREATE A PHOTOREALISTIC BROWSER MOCKUP showing favicon survivability test.

SCENE SETUP:
A modern Chrome or Safari browser window, realistically rendered with:
- Proper browser chrome (address bar, navigation buttons, bookmarks bar)
- Multiple browser tabs visible at the top
- Clean, modern macOS or Windows styling

BROWSER TABS (left to right):
1. Google tab with Google "G" favicon
2. LinkedIn tab with LinkedIn "in" favicon
3. ACTIVE TAB: "ScaleUp Ventures - B2B Advisory" with the HERON FAVICON
4. Gmail tab with Google Mail envelope favicon
5. Maybe one more generic tab

THE SCALEUP VENTURES FAVICON - CRITICAL ELEMENT:
The favicon shows a SIMPLIFIED HERON mark:
- Deep Navy (#0F1729) silhouette on white/light background
- The heron reduced to its ESSENTIAL S-CURVE shape
- Just the elegant curved neck line forming an "S" shape
- A tiny gold (#D4A853) dot for the eye
- Must be recognizable at 16x16 pixel scale
- The simplest possible abstraction that still reads as "heron"

FAVICON MUST APPEAR IN MULTIPLE LOCATIONS:
1. In the active browser tab (prominent)
2. In the address bar (left of the URL)
3. In the bookmarks bar (showing "ScaleUp Ventures" bookmark)

THE URL BAR shows:
https://scaleupventures.com

BOOKMARKS BAR shows:
[ScaleUp heron favicon] ScaleUp Ventures | [Google favicon] Google | [LinkedIn favicon] LinkedIn

WEBPAGE CONTENT (partially visible):
A professional, clean website header showing "ScaleUp Ventures" with the full heron logo larger, demonstrating how the favicon relates to the full logo.

COMPOSITION:
- Photorealistic browser window rendering
- Slight shadow beneath browser window
- Light gray or white background behind the browser
- Sharp, crisp details especially on the favicons
- The ScaleUp favicon should be clearly visible and recognizable

THE FAVICON TEST:
This mockup demonstrates "favicon survivability" - proving that the ScaleUp Ventures heron logo works at the smallest possible scale (16x16 pixels) while remaining distinctive and recognizable among other favicons.

STYLE:
- Photorealistic UI mockup
- Clean, professional
- High resolution details
- The browser should look like a real screenshot
- Modern browser styling (Chrome 2024 or Safari latest)

IMPORTANT - THE HERON FAVICON DESIGN:
The favicon version of the heron is SIMPLIFIED to:
- A single elegant S-curve representing the neck
- Possibly a small angular head shape
- One tiny gold eye dot
- Navy blue (#0F1729) on white background
- Abstract enough to work at 16x16 but clearly suggests a heron/bird

This mockup proves the logo has excellent "favicon survivability" - it remains recognizable and distinctive even at tiny sizes.
`;

async function generateImage(prompt, outputPath, retryCount = 0) {
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

    const req = https.request(API_URL, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            // Check if it's a rate limit error - retry with backoff
            if (response.error.message && response.error.message.includes('quota') && retryCount < 5) {
              const waitMatch = response.error.message.match(/retry in ([\d.]+)s/);
              const waitTime = waitMatch ? Math.ceil(parseFloat(waitMatch[1])) * 1000 : 60000;
              console.log(`    Rate limited. Waiting ${Math.ceil(waitTime / 1000)}s before retry ${retryCount + 1}/5...`);
              await new Promise(r => setTimeout(r, waitTime + 2000));
              try {
                const result = await generateImage(prompt, outputPath, retryCount + 1);
                resolve(result);
              } catch (retryError) {
                reject(retryError);
              }
              return;
            }
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
                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`    SUCCESS: Saved to ${outputPath}`);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

            // If text response found but no image, show it
            for (const part of parts) {
              if (part.text) {
                console.log(`    Model text: ${part.text.substring(0, 200)}`);
              }
            }
            reject(new Error('No image data found in response'));
          } else {
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 1000));
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
  console.log('');
  console.log('='.repeat(70));
  console.log('   SCALEUP VENTURES - FAVICON BROWSER MOCKUP GENERATION');
  console.log('   Model: gemini-3-pro-image-preview | Temperature: 1.0');
  console.log('='.repeat(70));
  console.log('');
  console.log('Testing: Favicon survivability - Does the heron logo work at 16x16?');
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const outputPath = path.join(OUTPUT_DIR, 'favicon-mockup.png');

  console.log('Generating favicon browser mockup...');
  console.log('-'.repeat(60));

  try {
    const result = await generateImage(FAVICON_MOCKUP_PROMPT, outputPath);
    console.log('\n' + '='.repeat(70));
    console.log('   GENERATION COMPLETE');
    console.log('='.repeat(70));
    console.log(`\nOutput: ${outputPath}`);
    console.log('\nThis mockup demonstrates how the ScaleUp Ventures heron logo');
    console.log('performs as a favicon at 16x16 pixel scale.');
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

main().catch(console.error);
