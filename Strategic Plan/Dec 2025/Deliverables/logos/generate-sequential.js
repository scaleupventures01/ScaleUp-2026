const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio';
const MODEL = 'gemini-2.5-flash-image';
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos';

const MASTER_STYLE = `CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853
- Must look like it was designed by a senior brand designer
- NOT clip art, NOT stock imagery

`;

const prompts = [
  {
    name: 'watershed-1',
    creativity: 'Conservative',
    description: 'Clean converging lines meeting at gold point',
    prompt: MASTER_STYLE + 'Create an abstract geometric logo mark representing CONVERGENCE. Two or three navy (#0F1729) angular lines approach from above at 30-45 degree angles and meet at a single point. Below the convergence point, a single bolder line continues downward. The convergence point is marked with a gold (#D4A853) accent. Background white. Sophisticated flat vector logo style.'
  },
  {
    name: 'watershed-2',
    creativity: 'Medium-High',
    description: 'Negative space convergence',
    prompt: MASTER_STYLE + 'Create a geometric logo using NEGATIVE SPACE. A solid navy (#0F1729) shape (rectangle or trapezoid) has white negative space channels carved into it that converge at a point. A small gold (#D4A853) diamond marks the convergence point. Industrial, architectural feel like a makers mark stamped into steel. Background white. Bold vector logo.'
  },
  {
    name: 'watershed-3',
    creativity: 'Maximum',
    description: 'Keystone architecture mark',
    prompt: MASTER_STYLE + 'Create an EXTRAORDINARY architectural logo based on a KEYSTONE concept. Two angular navy (#0F1729) lines press inward from upper-left and upper-right toward a central gold (#D4A853) trapezoidal keystone shape. The keystone locks everything together. Feel of classical architecture meets modern Swiss design. Iconic standalone symbol. Background white. Premium vector logo.'
  }
];

async function sleep(ms) {
  console.log('Waiting ' + Math.round(ms/1000) + ' seconds...');
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateImage(prompt, outputPath, maxRetries = 5) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + MODEL + ':generateContent?key=' + API_KEY;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log('  Attempt ' + attempt + '/' + maxRetries + '...');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        })
      });

      if (response.status === 429) {
        const errorText = await response.text();
        let retryDelay = 30000; // default 30s
        try {
          const errData = JSON.parse(errorText);
          if (errData.error && errData.error.details) {
            for (const d of errData.error.details) {
              if (d.retryDelay) {
                retryDelay = Math.ceil(parseFloat(d.retryDelay) * 1000) + 5000;
                break;
              }
            }
          }
        } catch (e) {}
        console.log('  Rate limited. Waiting before retry...');
        await sleep(retryDelay);
        continue;
      }

      if (!response.ok) {
        console.log('  Error: ' + response.status);
        return { success: false };
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
            const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(outputPath, imageBuffer);
            console.log('  SUCCESS! Saved: ' + path.basename(outputPath));
            return { success: true, model: MODEL };
          }
        }
      }

      console.log('  No image in response');
      return { success: false };

    } catch (error) {
      console.log('  Error: ' + error.message);
      if (attempt < maxRetries) {
        await sleep(10000);
      }
    }
  }

  return { success: false };
}

async function main() {
  console.log('============================================================');
  console.log('ScaleUp Ventures - Watershed Mark Logo Generation');
  console.log('Model: ' + MODEL);
  console.log('============================================================');
  console.log('');
  console.log('This script will wait for rate limits and retry.');
  console.log('');

  const results = [];

  for (let i = 0; i < prompts.length; i++) {
    const p = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, p.name + '.png');

    console.log('');
    console.log('------------------------------------------------------------');
    console.log('[' + (i+1) + '/3] ' + p.name + ' (' + p.creativity + ')');
    console.log('Description: ' + p.description);
    console.log('------------------------------------------------------------');

    const result = await generateImage(p.prompt, outputPath);

    results.push({
      name: p.name,
      creativity: p.creativity,
      description: p.description,
      status: result.success ? 'success' : 'error',
      model: result.model || 'none',
      path: result.success ? outputPath : null,
      timestamp: new Date().toISOString()
    });

    // Wait between successful generations
    if (result.success && i < prompts.length - 1) {
      console.log('');
      await sleep(35000); // 35 seconds between requests
    }
  }

  // Save summary
  const summary = {
    brand: 'ScaleUp Ventures',
    concept: 'The Watershed Mark',
    conceptDescription: 'Represents convergence - separate streams becoming unified powerful direction',
    colors: { navy: '#0F1729', gold: '#D4A853', mutedGold: '#B8956E', cream: '#FAF8F5' },
    targetAudience: '50-65+ technology-hesitant business owners',
    tagline: 'We Prove It Before You Buy',
    generatedAt: new Date().toISOString(),
    model: MODEL,
    logos: results
  };

  const summaryPath = path.join(OUTPUT_DIR, 'watershed-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log('');
  console.log('============================================================');
  console.log('COMPLETE');
  console.log('============================================================');
  console.log('Successful: ' + results.filter(r => r.status === 'success').length + '/3');
  console.log('Summary: ' + summaryPath);

  results.filter(r => r.status === 'success').forEach(r => {
    console.log('Generated: ' + r.path);
  });
}

main().catch(console.error);
