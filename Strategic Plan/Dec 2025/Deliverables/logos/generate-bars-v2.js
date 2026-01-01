const fs = require('fs');
const path = require('path');

// API key from .env file
const GOOGLE_API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';

// Models to try in order
const MODELS_TO_TRY = [
  'gemini-2.0-flash-exp',
  'gemini-2.5-flash-preview-05-20',
  'imagen-3.0-generate-002'
];

// Master style directive
const MASTER_STYLE = `
CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E
- Must look like it was designed by a senior brand designer
- NOT clip art, NOT stock imagery, NOT generic business icons
`;

// Three prompts with increasing creativity
const prompts = [
  {
    name: 'bars-1',
    creativity: 'Conservative',
    description: 'Horizontal stacked bars - clean and professional',
    prompt: `${MASTER_STYLE}

Create a professional logo mark featuring THREE VERTICAL RECTANGULAR BARS arranged side by side in a horizontal row, increasing in height from left to right.

GEOMETRY:
- 3 bars of uniform width
- Heights: short (40%), medium (70%), tall (100%)
- Consistent spacing between bars
- Clean squared corners - no rounded edges
- Simple horizontal arrangement

COLOR:
- Bar 1 (shortest): Navy (#0F1729)
- Bar 2 (medium): Navy (#0F1729)
- Bar 3 (tallest): Gold (#D4A853)
- Background: Pure white

STYLE:
Simple, clean, geometric. Like a minimal bar chart. Professional business aesthetic. Flat vector logo suitable for business cards.`
  },
  {
    name: 'bars-2',
    creativity: 'Distinctive',
    description: 'Slanted/dynamic bars with angular energy',
    prompt: `${MASTER_STYLE}

Create a logo mark featuring THREE BARS arranged with DYNAMIC ANGLES - the bars are slanted or tilted to create a sense of forward momentum and upward trajectory.

GEOMETRY:
- 3 bars increasing in height
- Bars are SLANTED at an angle (like //) creating dynamic energy
- OR bars have angled/beveled tops creating a diagonal line across
- Heights progress: short, medium, tall
- Clean geometric forms

COLOR:
- Shortest bar: Navy (#0F1729)
- Medium bar: Navy (#0F1729)
- Tallest bar: Gold (#D4A853)
- Background: White

STYLE:
Dynamic yet professional. The angle suggests forward motion and growth. Modern corporate aesthetic. Flat vector logo.`
  },
  {
    name: 'bars-3',
    creativity: 'Maximum',
    description: 'Architectural interpretation with creative flair',
    prompt: `${MASTER_STYLE}

Create an ARCHITECTURAL interpretation of ascending bars - three rising columns that evoke a modern building or sculptural monument.

GEOMETRY:
- 3 vertical elements rising to different heights (ascending progression)
- Could be styled as: building columns, abstract towers, or modernist pillars
- Consider adding subtle architectural details: stepped tops, keystone shapes, or a unifying base element
- The tallest element should be prominent and distinctive
- Think: abstract skyline, modern monument, or geometric sculpture

COLOR:
- Shortest element: Navy (#0F1729)
- Middle element: Muted Gold (#B8956E)
- Tallest element: Bright Gold (#D4A853)
- Background: White

STYLE:
Sophisticated and architectural. Like a modernist sculpture or abstract building facade. Professional yet distinctive. Memorable silhouette. Flat vector logo.`
  }
];

async function generateWithGemini(prompt, outputPath, model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_API_KEY}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      temperature: 1.0
    }
  };

  console.log(`  Trying model: ${model}...`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorText;
      } catch {
        errorMessage = errorText;
      }
      throw new Error(`API error ${response.status}: ${errorMessage}`);
    }

    const data = await response.json();

    // Extract image from response
    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`  SUCCESS: Saved ${path.basename(outputPath)}`);
          return { success: true, path: outputPath, model };
        }
      }
    }

    // Check for text response
    let textResponse = '';
    if (data.candidates?.[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.text) textResponse = part.text;
      }
    }

    console.log(`  No image in response${textResponse ? ': ' + textResponse.substring(0, 150) : ''}`);
    return { success: false, error: 'No image in response', textResponse };

  } catch (error) {
    const msg = error.message || String(error);
    console.log(`  Error: ${msg.substring(0, 200)}`);
    return { success: false, error: msg };
  }
}

async function generateLogo(promptConfig, outputDir) {
  const outputPath = path.join(outputDir, `${promptConfig.name}.png`);

  console.log(`\n[${promptConfig.creativity}] ${promptConfig.description}`);
  console.log(`Generating: ${promptConfig.name}.png`);

  // Try each model until one works
  for (const model of MODELS_TO_TRY) {
    const result = await generateWithGemini(promptConfig.prompt, outputPath, model);
    if (result.success) {
      return {
        name: promptConfig.name,
        creativity: promptConfig.creativity,
        description: promptConfig.description,
        success: true,
        path: outputPath,
        model: result.model
      };
    }
    // Wait before trying next model
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return {
    name: promptConfig.name,
    creativity: promptConfig.creativity,
    description: promptConfig.description,
    success: false,
    path: null,
    error: 'All models failed'
  };
}

async function main() {
  const outputDir = path.dirname(process.argv[1]);
  const results = [];

  console.log('\n=== ScaleUp Ventures - Ascending Bars Logo Generation ===');
  console.log('Models to try:', MODELS_TO_TRY.join(', '));
  console.log('Output directory:', outputDir);

  for (let i = 0; i < prompts.length; i++) {
    const result = await generateLogo(prompts[i], outputDir);
    results.push(result);

    // Delay between generations
    if (i < prompts.length - 1) {
      console.log('\n  Waiting 8 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 8000));
    }
  }

  // Generate summary JSON
  const summary = {
    concept: 'Ascending Bars',
    generatedAt: new Date().toISOString(),
    modelsAttempted: MODELS_TO_TRY,
    brand: {
      name: 'ScaleUp Ventures',
      tagline: 'We Prove It Before You Buy',
      colors: {
        navy: '#0F1729',
        gold: '#D4A853',
        mutedGold: '#B8956E',
        cream: '#FAF8F5'
      }
    },
    variations: [
      { name: 'bars-1', creativity: 'Conservative', concept: 'Horizontal stacked bars' },
      { name: 'bars-2', creativity: 'Distinctive', concept: 'Slanted/dynamic bars' },
      { name: 'bars-3', creativity: 'Maximum', concept: 'Architectural interpretation' }
    ],
    results: results,
    successCount: results.filter(r => r.success).length,
    totalCount: results.length
  };

  const summaryPath = path.join(outputDir, 'bars-results.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved: ${summaryPath}`);

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${summary.successCount}/${summary.totalCount}`);

  results.forEach(r => {
    const status = r.success ? 'OK' : 'FAILED';
    console.log(`  ${r.name}: ${status}${r.model ? ` (${r.model})` : ''}`);
  });
}

main().catch(console.error);
