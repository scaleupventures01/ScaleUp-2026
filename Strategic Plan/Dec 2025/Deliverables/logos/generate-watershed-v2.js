const fs = require('fs');
const path = require('path');

// API configuration from .env
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';

// Use imagen-3.0-generate-001 for image generation
const MODEL = 'imagen-3.0-generate-001';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

// Output directory
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos';

// Master style directive
const MASTER_STYLE = `Professional logo design, vector-style rendering, clean white background, NO gradients, NO glows, NO shadows, NO 3D effects, flat design with precise geometric forms. Color palette ONLY: Navy #0F1729, Gold #D4A853. Must look like premium brand identity design. NOT clip art, NOT stock imagery. `;

// The three Watershed prompts with escalating creativity
const prompts = [
  {
    name: 'watershed-1',
    creativity: 'Conservative',
    description: 'Clean angular peak with flow lines',
    prompt: `${MASTER_STYLE}Create a minimalist geometric logo representing a WATERSHED - an angular mountain peak or ridge viewed head-on. The peak is a clean angular apex in Gold #D4A853, with two descending ridgelines in Navy #0F1729 flowing down from the summit. Simple, architectural, like a continental divide. Two or three flow lines emanate downward from each side of the peak, suggesting water or energy flowing in opposite directions. Clean white background. The mark should feel structural and permanent, suitable for a serious business consultancy targeting experienced business owners.`
  },
  {
    name: 'watershed-2',
    creativity: 'Distinctive',
    description: 'Dramatic watershed moment with bold geometry',
    prompt: `${MASTER_STYLE}Create a bold geometric logo of a WATERSHED MOMENT - the critical tipping point. Design shows an abstract angular peak or apex where everything changes direction. The apex/peak rendered in Gold #D4A853 represents the decisive moment. Two bold angular forms in Navy #0F1729 converge at this golden peak, then continue outward in transformed directions. Use negative space creatively. The composition suggests both a mountain summit and a moment of transformation. Should feel like a mark carved in stone - permanent, institutional, commanding respect. White background.`
  },
  {
    name: 'watershed-3',
    creativity: 'Maximum',
    description: 'Extraordinary tipping point interpretation',
    prompt: `${MASTER_STYLE}Create an extraordinary, iconic logo representing the TIPPING POINT concept - where small input creates massive transformation. Abstract the watershed/continental divide into a striking geometric form. A bold angular shape suggests the critical apex where direction fundamentally changes. Gold #D4A853 marks the pivotal moment at the peak. Navy #0F1729 geometric forms show the before-and-after states of transformation. The design should be memorable and distinctive - like the best corporate marks (Apple, Nike level simplicity with maximum impact). Push creative boundaries while maintaining professional elegance. Could incorporate subtle visual tension, asymmetry, or unexpected negative space. White background.`
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithImagen(prompt, outputPath) {
  console.log(`Generating: ${path.basename(outputPath)}...`);

  const requestBody = {
    instances: [{ prompt: prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "1:1",
      personGeneration: "dont_allow",
      safetySetting: "block_few"
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
      const imageBuffer = Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`Saved: ${outputPath}`);
      return { success: true };
    }

    // Log response for debugging
    console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
    throw new Error('No image data in response');

  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}

// Alternative: Try gemini-2.0-flash-exp with image generation
async function generateWithGeminiFlash(prompt, outputPath) {
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;

  console.log(`Generating with Gemini Flash: ${path.basename(outputPath)}...`);

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      responseMimeType: "image/png"
    }
  };

  try {
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, imageBuffer);
          console.log(`Saved: ${outputPath}`);
          return { success: true };
        }
      }
    }

    console.log('Response structure:', JSON.stringify(data, null, 2).substring(0, 1000));
    throw new Error('No image data found');

  } catch (error) {
    console.error(`Gemini Flash error: ${error.message}`);
    throw error;
  }
}

async function main() {
  const results = [];

  console.log('='.repeat(60));
  console.log('ScaleUp Ventures - Watershed Mark Logo Generation v2');
  console.log('='.repeat(60));
  console.log(`Using API key from .env`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log('');

  for (const promptData of prompts) {
    const outputPath = path.join(OUTPUT_DIR, `${promptData.name}.png`);

    console.log(`\n[${promptData.creativity}] ${promptData.name}`);
    console.log(`Description: ${promptData.description}`);
    console.log('-'.repeat(40));

    let result = {
      name: promptData.name,
      creativity: promptData.creativity,
      description: promptData.description,
      path: outputPath,
      timestamp: new Date().toISOString()
    };

    try {
      // Try Imagen first
      await generateWithImagen(promptData.prompt, outputPath);
      result.status = 'success';
      result.model = 'imagen-3.0-generate-001';
    } catch (imagenError) {
      console.log('Imagen failed, trying Gemini Flash...');
      try {
        await generateWithGeminiFlash(promptData.prompt, outputPath);
        result.status = 'success';
        result.model = 'gemini-2.0-flash-exp';
      } catch (geminiError) {
        result.status = 'error';
        result.error = geminiError.message;
      }
    }

    results.push(result);

    // Delay between requests
    if (prompts.indexOf(promptData) < prompts.length - 1) {
      console.log('Waiting 5 seconds before next request...');
      await sleep(5000);
    }
  }

  // Save results summary
  const summary = {
    brand: 'ScaleUp Ventures',
    concept: 'The Watershed Mark',
    conceptDescription: 'Angular peak/ridge representing the tipping point moment - where direction fundamentally changes',
    colors: {
      navy: '#0F1729',
      gold: '#D4A853',
      mutedGold: '#B8956E',
      cream: '#FAF8F5'
    },
    targetAudience: '50-65+ technology-hesitant business owners',
    tagline: 'We Prove It Before You Buy',
    generatedAt: new Date().toISOString(),
    logos: results
  };

  const summaryPath = path.join(OUTPUT_DIR, 'watershed-results.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nResults saved: ${summaryPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete');
  console.log('='.repeat(60));
  console.log(`Total: ${results.length}`);
  console.log(`Success: ${results.filter(r => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'error').length}`);

  return summary;
}

main().catch(console.error);
