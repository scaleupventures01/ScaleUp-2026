const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Using Gemini 3 Pro Image Preview
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

// Output path
const OUTPUT_PATH = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/lynx/lynx-02-profile-tufted.png';

// The Legendary Lynx Prompt
const LYNX_PROMPT = `PROFESSIONAL LOGO DESIGN - VECTOR STYLE

Create a LEGENDARY logo mark featuring a LYNX head in PERFECT LEFT-FACING PROFILE for "ScaleUp Ventures" - an elite B2B advisory firm.

=== ABSOLUTE VISUAL REQUIREMENTS ===
- Background: PURE WHITE (#FFFFFF) - absolutely non-negotiable
- Primary Color: Deep Navy (#0F1729) for the lynx silhouette
- Accent Color: Burnished Gold (#D4A853) ONLY for the eye iris
- NO gradients, NO shadows, NO 3D effects, NO glows
- FLAT vector-style design with clean geometric construction
- Professional logo suitable for executive stationery

=== THE LYNX - LEFT-FACING PROFILE ===

THE TUFTED EARS ARE THE HERO:
- The lynx's most distinctive feature: those magnificent TUFTED EARS
- They rise like antennae, like radar dishes, like the towers of a medieval castle scanning the horizon
- The ear tufts should rise like flames, like exclamation points, like signals receiving hidden frequencies
- Sharp, pointed, elegant - NOT fluffy, NOT cute
- These tufts create striking negative space above the head
- They say: "I hear what you're not saying. I perceive what you're trying to hide."

HEAD CONSTRUCTION:
- Perfect LEFT-FACING PROFILE - the classical pose of heraldry and heritage
- Strong angular jaw line - this is NOT a soft creature
- The silhouette should be INSTANTLY recognizable as a lynx (NOT a generic cat)
- Geometric interpretation: Think Saul Bass meets ancient Egyptian cat art
- Clean angular lines - as if constructed with compass and straightedge
- The triangular face shape with those characteristic lynx cheek ruffs suggested geometrically

THE EYE:
- ONE visible eye with GOLD (#D4A853) iris - piercing, knowing, alert
- The eye is the window to wisdom and perception
- Set within the navy silhouette, a single gold point of focused intelligence

PROPORTIONS & COMPOSITION:
- The silhouette should feel noble, like a portrait coin or a wax seal
- Generous negative space - let the lynx command attention
- The ear tufts should be the HIGHEST point of the design
- The profile should have architectural elegance

STYLE REFERENCE:
- The precision of Swiss design
- The timelessness of heraldic emblems
- The sophistication of a $50,000 brand identity
- NOT clip art, NOT stock imagery, NOT generic
- The aesthetic of serious money and serious expertise

EMOTIONAL IMPACT:
A seasoned executive (50-65 years old) should look at this and think:
"This firm sees things others miss. Those ears aren't just for show - they LISTEN. They PERCEIVE. This is wisdom, not cleverness."

=== WHAT THIS IS NOT ===
- NOT a cute cartoon cat
- NOT a fierce/aggressive attack pose
- NOT a full body lynx
- NOT facing forward or right
- NOT photorealistic
- NOT decorated with patterns or textures

RENDER AS:
Professional logo mark, flat vector style, square 1:1 aspect ratio. The lynx profile in deep navy (#0F1729) with a single gold (#D4A853) eye, against pure white background. Clean geometric construction. ICONIC ear tufts that make this instantly recognizable and memorable.

Make the ear tufts LEGENDARY.`;

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
        temperature: 1.0  // Maximum creativity as requested
      }
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    console.log('Sending request to Gemini 3 Pro Image Preview...');
    console.log('Model: gemini-3-pro-image-preview');
    console.log('Temperature: 1.0 (Maximum Creativity)');
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
                console.log(`SUCCESS: Image saved to ${outputPath}`);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

            // If no image found, log the response structure
            console.log('Response parts:', JSON.stringify(parts, null, 2).substring(0, 500));
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
  console.log('='.repeat(70));
  console.log('SCALEUP VENTURES - THE LYNX: TUFTED PROFILE LOGO');
  console.log('='.repeat(70));
  console.log('');
  console.log('Brand: ScaleUp Ventures');
  console.log('Concept: Left-facing lynx profile with ICONIC ear tufts');
  console.log('Colors: Navy #0F1729 + Gold #D4A853 on White');
  console.log('Output: ' + OUTPUT_PATH);
  console.log('');
  console.log('-'.repeat(70));
  console.log('');

  try {
    await generateImage(LYNX_PROMPT, OUTPUT_PATH);

    console.log('');
    console.log('='.repeat(70));
    console.log('GENERATION COMPLETE');
    console.log('='.repeat(70));
    console.log('');
    console.log('The legendary lynx has been created.');
    console.log(`View your logo at: ${OUTPUT_PATH}`);

  } catch (error) {
    console.error('');
    console.error('ERROR:', error.message);
    console.error('');
    process.exit(1);
  }
}

main();
