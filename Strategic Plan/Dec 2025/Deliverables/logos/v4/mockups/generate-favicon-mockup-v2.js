const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Gemini 3 Pro Image Preview with MAXIMUM CREATIVITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

// Output path
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups';

// Single Stroke favicon mockup - the S-curve line version
const SINGLE_STROKE_FAVICON_PROMPT = `
CREATE A PHOTOREALISTIC BROWSER MOCKUP showing the SINGLE STROKE heron favicon.

BROWSER WINDOW:
A photorealistic Safari browser window on macOS with:
- Safari's clean, minimal chrome design
- Address bar with site icon
- Tab bar showing multiple tabs
- Favorites/bookmarks bar

TAB BAR (showing these tabs):
1. [Apple icon] Apple
2. [LinkedIn "in" icon] LinkedIn
3. ACTIVE: [Single Stroke Heron] ScaleUp Ventures - B2B Advisory
4. [Google "G"] Google Docs
5. [Slack icon] Slack

THE SINGLE STROKE HERON FAVICON - THIS IS THE KEY ELEMENT:
The favicon is an ULTRA-MINIMAL design:
- A SINGLE CONTINUOUS CURVED LINE forming an elegant S-shape
- This S-curve represents the heron's distinctive curved neck
- Deep Navy (#0F1729) stroke on white background
- The line varies in thickness - thinner at ends, fuller in middle
- ONE tiny gold (#D4A853) dot positioned as the eye
- Like Japanese calligraphy - one masterful brushstroke
- At 16x16 pixels, it reads as an elegant "S" curve with a gold dot

FAVICON LOCATIONS TO SHOW:
1. In the Safari tab (most prominent)
2. In the address bar next to the URL
3. In the favorites bar bookmark

ADDRESS BAR shows:
scaleupventures.com with lock icon and the single stroke favicon

FAVORITES BAR:
[Single stroke heron] ScaleUp | [Apple] Apple | [Google] Drive | [folder] Documents

WEBPAGE CONTENT visible below:
A clean, professional website showing:
- The full Single Stroke heron logo larger (showing how favicon relates to full logo)
- "ScaleUp Ventures" wordmark in elegant serif
- Clean white/navy color scheme
- Maybe a tagline: "We Prove It Before You Buy"

COMPARISON TEST:
The mockup should clearly demonstrate that even reduced to 16x16 pixels:
- The S-curve is still recognizable
- The gold eye dot adds distinctiveness
- It stands out from other favicons
- It's NOT generic or forgettable

VISUAL STYLE:
- Photorealistic macOS Safari browser
- Crisp, high-resolution rendering
- Subtle shadow under browser window
- Light gray background
- Modern, clean aesthetic
- The favicons should be sharp and detailed

IMPORTANT - SINGLE STROKE FAVICON DESIGN:
The essence is ONE FLOWING LINE that suggests a heron's curved neck:
- Starts thin (beak area)
- Curves elegantly through an S-shape (the neck)
- Ends in a point or thickens slightly (body suggestion)
- Gold dot eye placed at the head position
- When tiny, it's a distinctive curved "S" mark

This proves the logo has "favicon survivability" - recognizable at any size.
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
  console.log('   SCALEUP VENTURES - SINGLE STROKE FAVICON MOCKUP');
  console.log('   Model: gemini-3-pro-image-preview | Temperature: 1.0');
  console.log('='.repeat(70));
  console.log('');
  console.log('Testing: Single Stroke S-curve heron as favicon');
  console.log('');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'favicon-mockup-single-stroke.png');

  console.log('Generating Single Stroke favicon mockup...');
  console.log('-'.repeat(60));

  try {
    await generateImage(SINGLE_STROKE_FAVICON_PROMPT, outputPath);
    console.log('\n' + '='.repeat(70));
    console.log('   GENERATION COMPLETE');
    console.log('='.repeat(70));
    console.log(`\nOutput: ${outputPath}`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
  }
}

main().catch(console.error);
