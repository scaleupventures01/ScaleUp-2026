const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration
const API_KEY = 'AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio';

// Try Imagen 4 with correct endpoint
const IMAGE_MODEL = 'imagen-4.0-generate-001';

// Output paths
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/heron';

// Three heron prompts - optimized for Imagen
const prompts = [
  {
    name: "heron-minimal-geometric",
    title: "Minimal Geometric Heron Silhouette",
    prompt: `Professional vector logo design for "ScaleUp Ventures" business advisory firm.

A highly MINIMALIST GEOMETRIC heron silhouette rendered as an abstract logo mark. The heron reduced to essential angular forms - just 5-7 clean geometric shapes. Long neck as a single elegant diagonal line, body as a simple angular wedge shape, two thin vertical lines for legs.

STYLE: Clean vector logo, flat design, professional corporate identity
COLORS: Deep navy blue (#0F1729) for the heron, small gold (#D4A853) accent on eye or beak
BACKGROUND: Pure white
TYPOGRAPHY: Company name "ScaleUp Ventures" in elegant serif typeface below the mark, navy color

The aesthetic of a $50,000 brand identity from Pentagram. Sophisticated, minimal, appeals to 50-65 year old business executives. NOT cute, NOT cartoonish, NOT clip art.`
  },
  {
    name: "heron-elegant-standing",
    title: "Elegant Standing Heron Profile",
    prompt: `Professional vector logo design for "ScaleUp Ventures" business advisory firm.

An ELEGANT STANDING HERON in classic profile pose (side view). Medium detail - clearly recognizable heron silhouette but simplified for logo use. Shows: graceful S-curved neck, sharp dagger-like beak, distinctive head plume rendered as 2-3 elegant lines, dignified body, long thin patient legs.

STYLE: Refined corporate logo, flat vector design, sophisticated simplification
COLORS: Heron in deep navy blue (#0F1729), gold (#D4A853) accent on eye and beak tip
BACKGROUND: Pure white
TYPOGRAPHY: "ScaleUp Ventures" in elegant serif typeface, positioned to the right or below the heron mark

The heron symbolizes patience before precision, watching before acting. Design should feel like the logo of a trusted 40-year-old advisory firm. Professional, dignified, timeless. NOT cute, NOT cartoonish.`
  },
  {
    name: "heron-strike-pose",
    title: "Heron in Strike Pose with Fish",
    prompt: `Professional vector logo design for "ScaleUp Ventures" business advisory firm.

A distinguished HERON in its moment of triumph - neck extended downward with a stylized fish captured in its sharp beak. This is NOT aggressive - it's dignified success. The patient watching has led to precise action. The fish represents captured opportunity.

STYLE: Sophisticated corporate logo with narrative element, flat vector design
COLORS: Heron body in deep navy blue (#0F1729), fish rendered in rich gold (#D4A853), gold accent on heron's eye
BACKGROUND: Pure white
TYPOGRAPHY: "ScaleUp Ventures" in authoritative serif typeface

The most detailed of the three concepts but still logo-appropriate simplification. Like a Hermes illustration meets modern logo design. Shows "We don't just promise - we deliver proven results." Professional, confident, NOT aggressive or predatory.`
  }
];

async function generateImage(prompt, outputPath, retryCount = 0) {
  // Imagen 4 uses predict endpoint
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:predict?key=${API_KEY}`;

  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      instances: [
        {
          prompt: prompt
        }
      ],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        outputOptions: {
          mimeType: "image/png"
        }
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

      res.on('end', async () => {
        try {
          if (!data || data.trim() === '') {
            reject(new Error('Empty response from API'));
            return;
          }

          const response = JSON.parse(data);

          if (response.error) {
            if ((response.error.message.includes('quota') || response.error.message.includes('RESOURCE_EXHAUSTED')) && retryCount < 5) {
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

          // Check various response formats
          let imageData = null;

          // Format 1: predictions array
          if (response.predictions && response.predictions[0]) {
            const pred = response.predictions[0];
            if (pred.bytesBase64Encoded) {
              imageData = pred.bytesBase64Encoded;
            } else if (pred.image && pred.image.bytesBase64Encoded) {
              imageData = pred.image.bytesBase64Encoded;
            }
          }

          // Format 2: generatedImages array
          if (!imageData && response.generatedImages && response.generatedImages[0]) {
            const img = response.generatedImages[0];
            if (img.image && img.image.bytesBase64Encoded) {
              imageData = img.image.bytesBase64Encoded;
            } else if (img.bytesBase64Encoded) {
              imageData = img.bytesBase64Encoded;
            }
          }

          if (imageData) {
            const imageBuffer = Buffer.from(imageData, 'base64');
            fs.writeFileSync(outputPath, imageBuffer);
            console.log(`  Saved image to: ${outputPath}`);
            resolve({ success: true, path: outputPath, model: IMAGE_MODEL });
            return;
          }

          console.log('Full response:', JSON.stringify(response, null, 2));
          reject(new Error('No image data found in response'));
        } catch (e) {
          console.log('Raw response data:', data.substring(0, 500));
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
  console.log('='.repeat(60));
  console.log('ScaleUp Ventures - HERON Logo Generation (Imagen 4)');
  console.log('='.repeat(60));
  console.log('');
  console.log(`Using model: ${IMAGE_MODEL}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const { name, title, prompt } = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);

    console.log(`\n[${i + 1}/3] Generating: ${title}`);
    console.log('-'.repeat(50));

    try {
      const result = await generateImage(prompt, outputPath);
      results.push({
        name,
        title,
        status: 'success',
        path: outputPath,
        model: result.model
      });
      console.log(`  SUCCESS!`);
    } catch (error) {
      console.error(`  ERROR: ${error.message.substring(0, 300)}`);
      results.push({
        name,
        title,
        status: 'error',
        error: error.message
      });
    }

    // Delay between requests
    if (i < prompts.length - 1) {
      console.log('\nWaiting 10 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  // Save summary
  const summaryPath = path.join(OUTPUT_DIR, 'heron-summary.json');
  const summary = {
    generated: new Date().toISOString(),
    brand: 'ScaleUp Ventures',
    concept: 'The Heron Symbol',
    model: IMAGE_MODEL,
    results: results
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved to: ${summaryPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.status === 'success').length;
  console.log(`Results: ${successful}/${results.length} logos generated successfully`);

  if (successful > 0) {
    console.log('\nGenerated files:');
    results.filter(r => r.status === 'success').forEach(r => {
      console.log(`  - ${r.path}`);
    });
  }
}

main().catch(console.error);
