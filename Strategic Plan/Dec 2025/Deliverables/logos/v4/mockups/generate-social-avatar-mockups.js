const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Using Gemini 3 Pro Image Preview with MAXIMUM CREATIVITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const MODEL = 'gemini-3-pro-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Output directory
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/mockups';

// Social Media Mockup Prompts
const MOCKUPS = [
  {
    name: 'linkedin-elegant-heron',
    filename: 'social-linkedin-elegant-heron.png',
    prompt: `ENVIRONMENT MOCKUP - LINKEDIN COMPANY PAGE

Create a realistic mockup of a LinkedIn company profile page featuring the ScaleUp Ventures heron logo.

MOCKUP LAYOUT:
- Show a portion of the LinkedIn company page interface
- Dark navy blue (#0F1729) banner/header area with subtle gold (#D4A853) accent line
- Circular company profile picture area (120px equivalent) in the bottom-left of the banner
- Below: Company name "ScaleUp Ventures" in bold
- Below name: "B2B Advisory | We Prove It Before You Buy"
- Include LinkedIn interface elements: Follow button, connection count, company info section

THE LOGO IN THE CIRCLE:
Inside the circular profile picture, show:
- A sophisticated standing heron in ELEGANT POSE
- Navy blue (#0F1729) heron silhouette
- Small gold (#D4A853) eye accent dot
- White background inside the circle
- The heron should be elegantly composed within the circle
- S-curve neck clearly visible even at small size
- The bird should feel dignified and professional

DESIGN NOTES:
- The circular crop should NOT cut off the heron's head or beak
- Position the heron so it fits beautifully in the circle
- Sharp, clean vector logo aesthetic
- Heritage brand quality

STYLE:
- Photorealistic mockup of LinkedIn interface
- Professional, polished presentation
- Show how the logo appears in a real social media context
- High resolution, crisp details

This tests whether the heron logo works as a circular social media avatar while maintaining brand presence.`
  },
  {
    name: 'linkedin-single-stroke-heron',
    filename: 'social-linkedin-single-stroke.png',
    prompt: `ENVIRONMENT MOCKUP - LINKEDIN COMPANY PAGE

Create a realistic mockup of a LinkedIn company profile page featuring the ScaleUp Ventures heron logo.

MOCKUP LAYOUT:
- Show a portion of the LinkedIn company page interface
- Dark navy blue (#0F1729) banner/header area with subtle gold (#D4A853) accent line
- Circular company profile picture area (120px equivalent) in the bottom-left of the banner
- Below: Company name "ScaleUp Ventures" in bold
- Below name: "B2B Advisory | We Prove It Before You Buy"
- Include LinkedIn interface elements: Follow button, connection count, company info section

THE LOGO IN THE CIRCLE:
Inside the circular profile picture, show:
- A SINGLE CONTINUOUS LINE heron design
- One elegant brush stroke that forms the S-curve of a heron
- Navy blue (#0F1729) stroke
- Minimal gold (#D4A853) eye dot
- White background inside the circle
- Like calligraphy - flowing, confident, minimal
- The S-curve should be immediately recognizable as a bird/heron

DESIGN NOTES:
- Single stroke aesthetic - zen-like simplicity
- The line flows from tail through body, up the neck, to the beak
- No filled shapes - just the confident stroke
- Should feel like expert brushwork

STYLE:
- Photorealistic mockup of LinkedIn interface
- Professional, polished presentation
- Show how the minimal logo appears in social context
- High resolution, crisp details

This tests whether a single-stroke heron has enough presence as a small avatar.`
  },
  {
    name: 'twitter-elegant-heron',
    filename: 'social-twitter-elegant-heron.png',
    prompt: `ENVIRONMENT MOCKUP - TWITTER/X PROFILE PAGE

Create a realistic mockup of a Twitter/X profile page featuring the ScaleUp Ventures heron logo.

MOCKUP LAYOUT:
- Twitter/X profile interface
- Header banner: Navy blue (#0F1729) gradient with subtle gold (#D4A853) accent
- Large circular avatar (100px equivalent) overlapping the banner edge
- Profile name: "ScaleUp Ventures" with verification badge
- Handle: "@ScaleUpVentures"
- Bio: "B2B Advisory that proves ROI before you invest. We Prove It Before You Buy."
- Location, website, join date row
- Follow/Following counts

THE LOGO IN THE CIRCLE:
Inside the circular avatar:
- Elegant standing heron in classic profile pose
- Navy blue (#0F1729) silhouette with gold (#D4A853) eye
- WHITE background - making the navy heron stand out crisp and clear
- The heron composed beautifully within the circle
- Professional, heritage brand aesthetic
- Sharp, vector-style rendering

COMPOSITION IN CIRCLE:
- Heron positioned to maximize presence in circular frame
- Head and beak visible, not cropped
- S-curve neck is the hero element
- Negative space around the bird within the circle

STYLE:
- Photorealistic Twitter/X interface mockup
- Shows the logo in actual social media context
- Clean, professional presentation
- High resolution

Test: Does the elegant heron maintain dignity at Twitter avatar size?`
  },
  {
    name: 'twitter-single-stroke-heron',
    filename: 'social-twitter-single-stroke.png',
    prompt: `ENVIRONMENT MOCKUP - TWITTER/X PROFILE PAGE

Create a realistic mockup of a Twitter/X profile page featuring the ScaleUp Ventures single-stroke heron logo.

MOCKUP LAYOUT:
- Twitter/X profile interface
- Header banner: Navy blue (#0F1729) gradient with subtle gold (#D4A853) accent
- Large circular avatar (100px equivalent) overlapping the banner edge
- Profile name: "ScaleUp Ventures" with verification badge
- Handle: "@ScaleUpVentures"
- Bio: "B2B Advisory that proves ROI before you invest. We Prove It Before You Buy."
- Location, website, join date row
- Follow/Following counts

THE LOGO IN THE CIRCLE:
Inside the circular avatar:
- SINGLE CONTINUOUS STROKE heron design
- One elegant flowing line forming the S-curve shape of a heron
- Navy blue (#0F1729) brush stroke on white background
- Minimal gold (#D4A853) eye accent
- Calligraphic, zen-like aesthetic
- The stroke should feel confident and masterful

SINGLE STROKE DESIGN:
- Like Chinese/Japanese brush calligraphy
- One continuous line: tail -> body -> neck curve -> head -> beak
- Varies in weight/thickness naturally
- Suggests a heron without literally drawing every detail
- Should read as "bird" or "heron" instantly

STYLE:
- Photorealistic Twitter/X interface mockup
- Shows the minimal logo in actual social media context
- Clean presentation
- High resolution

Test: Does the single-stroke heron have enough visual impact at small avatar sizes?`
  },
  {
    name: 'avatar-comparison-grid',
    filename: 'social-avatar-comparison-grid.png',
    prompt: `AVATAR COMPARISON GRID - SCALEUP VENTURES HERON LOGO

Create a clean comparison grid showing 4 different circular avatar variations of the ScaleUp Ventures heron logo.

LAYOUT: 2x2 grid with labels

ROW 1 - ELEGANT STANDING HERON:
[Left] Navy heron on WHITE background
- Circle with white (#FFFFFF) background
- Navy blue (#0F1729) elegant standing heron silhouette
- Gold (#D4A853) eye accent
- Label below: "White Background"

[Right] WHITE heron on NAVY background
- Circle with navy blue (#0F1729) background
- White (#FFFFFF) heron silhouette
- Gold (#D4A853) eye accent
- Label below: "Navy Background"

ROW 2 - SINGLE STROKE HERON:
[Left] Navy stroke on WHITE background
- Circle with white (#FFFFFF) background
- Navy blue (#0F1729) single brush stroke heron
- Gold (#D4A853) eye dot
- Label below: "White Background"

[Right] WHITE stroke on NAVY background
- Circle with navy blue (#0F1729) background
- White (#FFFFFF) single brush stroke heron
- Gold (#D4A853) eye dot
- Label below: "Navy Background"

HEADER TEXT:
"ScaleUp Ventures - Social Avatar Options"

DESIGN SPECIFICATIONS:
- Each circle should be the same size
- Clean spacing between circles
- Gray (#F0F0F0) background for the comparison sheet
- Professional presentation for client review
- Each heron should be well-composed within its circle
- The S-curve should read clearly in all versions

PURPOSE:
This comparison helps determine:
1. Which heron style works better at small sizes?
2. Which background color provides better contrast?
3. Does the logo maintain brand presence when circular-cropped?

Make this a polished, professional comparison document.`
  },
  {
    name: 'favicon-test-grid',
    filename: 'social-favicon-test.png',
    prompt: `FAVICON & SMALL SIZE TEST - SCALEUP VENTURES HERON

Create a test sheet showing the ScaleUp Ventures heron logo at various small sizes to test viability as favicons, app icons, and tiny avatars.

LAYOUT:
Show the logo at multiple sizes on a gray (#E5E5E5) background

SIZE TESTS (show both ELEGANT and SINGLE-STROKE versions):

ROW 1 - ELEGANT STANDING HERON:
- 128x128 circle - Full detail visible
- 64x64 circle - Medium detail
- 32x32 circle - Favicon size
- 16x16 circle - Tiny favicon
All with white background, navy (#0F1729) heron, gold (#D4A853) eye

ROW 2 - SINGLE STROKE HERON:
- 128x128 circle - Full detail visible
- 64x64 circle - Medium detail
- 32x32 circle - Favicon size
- 16x16 circle - Tiny favicon
All with white background, navy (#0F1729) stroke, gold (#D4A853) eye

ROW 3 - REVERSED (Navy background):
- Elegant heron at 64x64 - white heron on navy circle
- Single stroke at 64x64 - white stroke on navy circle

LABELS:
- Size labels under each icon
- "Elegant" and "Single Stroke" row labels
- Header: "ScaleUp Ventures - Small Size Viability Test"

PURPOSE:
Test which version maintains recognizability at small sizes:
- Can you still see it's a heron at 16px?
- Does the S-curve read at favicon size?
- Which style holds up better?

Professional presentation, clean grid layout, useful for brand review.`
  }
];

async function generateImage(prompt, outputPath, mockupName) {
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

    console.log(`\nGenerating: ${mockupName}`);
    console.log('Sending request to Gemini 3 Pro Image Preview...');

    const req = https.request(API_URL, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error('API Error:', response.error.message);
            reject(new Error(`API Error: ${response.error.message}`));
            return;
          }

          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                const imageBuffer = Buffer.from(part.inlineData.data, 'base64');

                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                  fs.mkdirSync(dir, { recursive: true });
                }

                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`SUCCESS! Saved to: ${outputPath}`);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

            // Check for text response
            for (const part of parts) {
              if (part.text) {
                console.log('Model response:', part.text.substring(0, 200));
              }
            }
            reject(new Error('No image data in response'));
          } else {
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('='.repeat(70));
  console.log('  SCALEUP VENTURES - SOCIAL MEDIA AVATAR MOCKUPS');
  console.log('  Testing the Heron Logo in Circular Social Media Contexts');
  console.log('='.repeat(70));
  console.log('');
  console.log('Brand: ScaleUp Ventures');
  console.log('Logo: Navy (#0F1729) Heron with Gold (#D4A853) Eye');
  console.log('Testing: Circular avatar viability for LinkedIn, Twitter/X, favicons');
  console.log('');
  console.log(`Generating ${MOCKUPS.length} mockups...`);
  console.log('-'.repeat(70));

  const results = [];

  for (let i = 0; i < MOCKUPS.length; i++) {
    const mockup = MOCKUPS[i];
    const outputPath = path.join(OUTPUT_DIR, mockup.filename);

    console.log(`\n[${i + 1}/${MOCKUPS.length}] ${mockup.name}`);

    try {
      const result = await generateImage(mockup.prompt, outputPath, mockup.name);
      results.push({ ...mockup, success: true, path: outputPath });
    } catch (error) {
      console.error(`FAILED: ${error.message}`);
      results.push({ ...mockup, success: false, error: error.message });
    }

    // Rate limiting - wait between requests
    if (i < MOCKUPS.length - 1) {
      console.log('Waiting 3 seconds before next request...');
      await delay(3000);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('  GENERATION COMPLETE - SUMMARY');
  console.log('='.repeat(70));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\nSuccessful: ${successful.length}/${results.length}`);

  if (successful.length > 0) {
    console.log('\nGenerated files:');
    successful.forEach(r => console.log(`  - ${r.path}`));
  }

  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach(r => console.log(`  - ${r.name}: ${r.error}`));
  }

  console.log('\n' + '-'.repeat(70));
  console.log('WHAT THESE MOCKUPS TEST:');
  console.log('');
  console.log('1. LINKEDIN MOCKUPS:');
  console.log('   - Does the heron look professional on a company page?');
  console.log('   - Is the brand recognizable at LinkedIn avatar size?');
  console.log('');
  console.log('2. TWITTER/X MOCKUPS:');
  console.log('   - How does the logo appear in Twitter\'s circular frame?');
  console.log('   - Does it stand out in a timeline?');
  console.log('');
  console.log('3. COMPARISON GRID:');
  console.log('   - Elegant vs Single-Stroke: which works better?');
  console.log('   - White vs Navy background: which has more impact?');
  console.log('');
  console.log('4. FAVICON TEST:');
  console.log('   - Can you recognize the heron at 16x16 pixels?');
  console.log('   - Which style maintains clarity at tiny sizes?');
  console.log('='.repeat(70));
}

main();
