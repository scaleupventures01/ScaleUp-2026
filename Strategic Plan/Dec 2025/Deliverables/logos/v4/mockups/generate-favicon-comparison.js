const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups';

// Favicon comparison showing multiple contexts
const FAVICON_COMPARISON_PROMPT = `
CREATE A PROFESSIONAL FAVICON SURVIVABILITY TEST showing the ScaleUp Ventures heron logo at multiple sizes.

LAYOUT - PRESENTATION BOARD STYLE:
A clean, professional presentation showing favicon testing across multiple contexts.
White/light gray background with organized sections.

TITLE at top:
"ScaleUp Ventures - Favicon Survivability Test"
Subtitle: "Testing logo recognition at small scales"

SECTION 1 - SIZE COMPARISON (left side):
Show the heron logo at different sizes, arranged vertically:
- 128x128 px - Full detail visible
- 64x64 px - App icon size
- 32x32 px - Retina favicon
- 16x16 px - Standard favicon
- 8x8 px - Extreme test

The heron design:
- Elegant S-curve neck shape
- Deep navy (#0F1729) color
- Small gold (#D4A853) eye dot
- Simplified, minimal design

SECTION 2 - BROWSER CONTEXT (right side):
Small browser tab mockups showing:

"Chrome Tab Row:"
[G] Google | [in] LinkedIn | [Heron] ScaleUp Ventures | [M] Gmail

"Safari Tab Row:"
[Apple] Apple | [Heron] ScaleUp Ventures | [G] Google Docs

"Bookmarks Bar:"
[Heron] ScaleUp | [G] Google | [in] LinkedIn | [folder] Work

SECTION 3 - APP ICON CONTEXTS (bottom):
Show the heron as:
- iOS app icon (rounded square)
- Android app icon
- Desktop app icon
- Browser pinned site icon

ANNOTATIONS:
Small text labels explaining:
- "Recognizable at 16px" with checkmark
- "S-curve silhouette reads clearly"
- "Gold eye adds distinctiveness"
- "Stands out from competitors"

COLOR PALETTE shown:
- Deep Navy #0F1729
- Burnished Gold #D4A853
- Pure White #FFFFFF

THE HERON FAVICON DESIGN:
At small sizes, the heron is simplified to:
- The distinctive S-curve of the neck (the "DNA" of the logo)
- A simple head shape with pointed beak
- One gold dot for the eye
- Clean navy silhouette on white

VISUAL STYLE:
- Clean, professional presentation layout
- High contrast for readability
- Organized grid structure
- Professional typography
- Design system presentation feel
- Like a brand guidelines page showing favicon specifications

This is a TECHNICAL PRESENTATION showing that the ScaleUp Ventures heron logo maintains recognition and distinctiveness even at the smallest favicon sizes.
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
        temperature: 1.0
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

          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`    SUCCESS: Saved to ${outputPath}`);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

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
  console.log('   SCALEUP VENTURES - FAVICON SIZE COMPARISON');
  console.log('   Model: gemini-3-pro-image-preview | Temperature: 1.0');
  console.log('='.repeat(70));
  console.log('');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'favicon-size-comparison.png');

  console.log('Generating favicon size comparison presentation...');
  console.log('-'.repeat(60));

  try {
    await generateImage(FAVICON_COMPARISON_PROMPT, outputPath);
    console.log('\n' + '='.repeat(70));
    console.log('   GENERATION COMPLETE');
    console.log('='.repeat(70));
    console.log(`\nOutput: ${outputPath}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

main().catch(console.error);
