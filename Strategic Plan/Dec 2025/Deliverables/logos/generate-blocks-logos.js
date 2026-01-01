const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';

// Use models with image generation capabilities
const MODELS_TO_TRY = [
  'gemini-2.5-flash-image',
  'gemini-2.0-flash-exp'
];

// Master style directive to apply to all prompts
const MASTER_STYLE = `
CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E, Cream #FAF8F5
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic business icons
- The aesthetic of a $50,000 brand identity project, not a $50 Fiverr logo
- Think: The precision of Swiss design meets the warmth of a trusted advisor
`;

// Three prompts with increasing creativity for Building Blocks concept
const prompts = [
  {
    name: 'blocks-1',
    creativity: 'Conservative',
    description: 'Diagonal stacked blocks - clean, professional foundation',
    prompt: `${MASTER_STYLE}

Create a professional logo mark featuring INTERLOCKING GEOMETRIC BLOCKS arranged in a stable diagonal stack, representing systematic building and solid groundwork.

VISUAL CONCEPT:
Three to four rectangular blocks arranged diagonally, stacking upward from bottom-left to top-right. Each block overlaps or interlocks with the previous one, creating a sense of foundation and methodical construction. The topmost block (the keystone) is rendered in gold, representing achievement and the final piece that completes the structure.

GEOMETRY:
- 3-4 rectangular blocks with uniform proportions (roughly 3:1 or 4:1 width to height ratio)
- Diagonal arrangement ascending from lower-left to upper-right
- Each block slightly overlaps or connects to the one below it
- Clean, squared corners - no rounded edges
- The blocks should suggest stability and intentional placement
- Negative space between blocks should be purposeful

COLOR EXECUTION:
- Bottom blocks: Navy (#0F1729)
- Middle block(s): Muted Gold (#B8956E)
- Top keystone block: Bright Gold (#D4A853)
- Background: Pure white

MOOD:
Solid foundation. Methodical construction. Each piece matters. Something a seasoned builder would respect. Not flashy - FOUNDATIONAL.

WHAT THIS IS NOT:
- Not children's toy blocks
- Not Lego or playful
- Not random stacking - every placement is intentional
- Not decorative - every block serves the structure

RENDER AS:
Professional geometric logo, flat vector style, suitable for business cards and corporate materials. Clean diagonal composition.`
  },
  {
    name: 'blocks-2',
    creativity: 'Distinctive',
    description: 'Stepped/pyramidal blocks - dynamic foundational structure',
    prompt: `${MASTER_STYLE}

Create a logo with GEOMETRIC BLOCKS in a STEPPED PYRAMIDAL ARRANGEMENT, suggesting a stable foundation that builds upward systematically.

VISUAL CONCEPT:
Blocks arranged in a stepped formation - like a pyramid or ziggurat viewed from the side. The base is wide and stable, with each successive level being smaller and building toward a golden capstone. This represents systematic growth built on solid groundwork. The arrangement suggests both stability (wide base) and upward progress (ascending levels).

LAYOUT:
- Base level: 2-3 blocks side by side creating a wide foundation
- Middle level: 1-2 blocks stacked above, slightly inset
- Top level: Single golden keystone block crowning the structure
- Total composition fits within a triangular or trapezoidal silhouette
- Consider subtle interlocking edges where blocks meet

GEOMETRY:
- Blocks with clean rectangular proportions
- Each level steps inward creating a stable pyramidal profile
- The structure should feel mathematically precise
- Negative space between levels creates visual rhythm
- Overall silhouette is balanced and symmetrical or near-symmetrical

COLOR EXECUTION:
- Base level blocks: Navy (#0F1729)
- Middle level blocks: Muted Gold (#B8956E)
- Top keystone block: Bright Gold (#D4A853)
- Background: White

MOOD:
Foundation that supports growth. Each level earned and solid. The structure couldn't exist without its base. Methodical yet progressive. Something an engineer would appreciate.

RENDER AS:
Complete logo mark with stepped pyramidal structure, flat vector style. Professional, balanced, distinctive.`
  },
  {
    name: 'blocks-3',
    creativity: 'Maximum Creativity',
    description: 'Extraordinary architectural foundation - abstract masterpiece',
    prompt: `${MASTER_STYLE}

Create an EXTRAORDINARY logo interpretation of the building blocks concept that pushes creative boundaries while maintaining the core message of systematic building and solid foundation.

VISUAL CONCEPT:
Reimagine interlocking blocks as an ABSTRACT ARCHITECTURAL FORM - like a modernist sculpture or a deconstructed foundation that has been transformed into high art. Consider:
- Blocks that form an IMPOSSIBLE ARCHITECTURE pattern - like Escher but geometric and stable
- OR blocks reimagined as NESTED ANGULAR FORMS that interlock in unexpected ways
- OR blocks abstracted into a CRYSTALLINE STRUCTURE suggesting natural growth patterns
- OR blocks transformed into an ISOMETRIC architectural wonder viewed from a dramatic angle
- OR blocks that create meaningful NEGATIVE SPACE within their arrangement, where the gaps matter as much as the solids

The design should make someone pause and look twice - it's unexpected, but when they understand it, they see the foundation story.

GEOMETRY:
- The essential DNA remains: multiple block elements, interlocking relationship, the keystone/top element in gold
- But the execution is artistic and memorable
- Think: Saul Bass meets Bauhaus architecture meets modern sculpture
- The silhouette should be distinctive and ownable
- Must work as a standalone icon
- The relationship between blocks should suggest both stability AND ambition

COLOR EXECUTION:
- Create visual hierarchy through the brand colors
- Foundation/base elements: Navy (#0F1729)
- Supporting elements: Muted Gold (#B8956E)
- Keystone/crowning element: Bright Gold (#D4A853) - the achievement marker
- Background: White

MOOD:
This is the logo that makes a 60-year-old business owner say "I've never seen anything quite like that - but I understand exactly what it means." Sophisticated disruption. Creative confidence. A firm that builds differently and delivers solidly.

WHAT THIS MUST ACHIEVE:
- Instantly memorable silhouette
- Clear sense of building/stacking/foundation
- Gold keystone moment visible
- Professional enough for a law firm, creative enough for a design studio
- Makes competitors' logos look generic

RENDER AS:
Extraordinary geometric logo, flat vector style. The intersection of architecture and commerce. A logo that wins design awards AND wins trust.`
  }
];

async function generateLogoWithModel(prompt, outputPath, model) {
  let url, requestBody;

  if (model.startsWith('imagen')) {
    // Imagen API has different endpoint structure
    url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${GOOGLE_API_KEY}`;
    requestBody = {
      instances: [{ prompt: prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1"
      }
    };
  } else {
    url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GOOGLE_API_KEY}`;
    requestBody = {
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
  }

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

    // Handle Imagen response format
    if (model.startsWith('imagen')) {
      if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
        const imageData = data.predictions[0].bytesBase64Encoded;
        const buffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(outputPath, buffer);
        console.log(`  SUCCESS: Saved ${outputPath}`);
        return { success: true, path: outputPath, model };
      }
    }

    // Handle Gemini response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType && part.inlineData.mimeType.startsWith('image/')) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`  SUCCESS: Saved ${outputPath}`);
          return { success: true, path: outputPath, model };
        }
      }
    }

    // Check if response has text explaining why image wasn't generated
    let textResponse = '';
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.text) {
          textResponse = part.text;
        }
      }
    }

    console.log(`  No image in response${textResponse ? ': ' + textResponse.substring(0, 200) : ''}`);
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
    const result = await generateLogoWithModel(promptConfig.prompt, outputPath, model);
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
    // Wait before trying next model to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  return {
    name: promptConfig.name,
    creativity: promptConfig.creativity,
    description: promptConfig.description,
    success: false,
    path: null,
    error: 'All models failed or quota exceeded'
  };
}

async function main() {
  const outputDir = path.dirname(process.argv[1]);
  const results = [];

  console.log('\n=== ScaleUp Ventures Logo Generation ===');
  console.log('Concept: Building Blocks');
  console.log('Models to try:', MODELS_TO_TRY.join(', '));
  console.log('Starting generation with delays to avoid rate limits...\n');

  for (let i = 0; i < prompts.length; i++) {
    const promptConfig = prompts[i];
    const result = await generateLogo(promptConfig, outputDir);
    results.push(result);

    // Longer delay between logo generations
    if (i < prompts.length - 1) {
      console.log('\n  Waiting 10 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }

  // Generate summary JSON
  const summary = {
    concept: 'Building Blocks',
    generatedAt: new Date().toISOString(),
    modelsAttempted: MODELS_TO_TRY,
    brand: {
      name: 'ScaleUp Ventures',
      tagline: 'We Prove It Before You Buy',
      targetAudience: '50-65+ technology-hesitant business owners',
      colors: {
        navy: '#0F1729',
        gold: '#D4A853',
        mutedGold: '#B8956E',
        cream: '#FAF8F5'
      }
    },
    logos: results
  };

  const summaryPath = path.join(outputDir, 'blocks-results.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved: ${summaryPath}`);

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${results.filter(r => r.success).length}/${results.length}`);

  if (results.filter(r => r.success).length === 0) {
    console.log('\nAll generations failed. The daily API quota may be exceeded.');
    console.log('Options:');
    console.log('1. Wait until tomorrow for quota reset');
    console.log('2. Upgrade to a paid Google AI plan');
    console.log('3. Use a different API key with available quota');
  }
}

main().catch(console.error);
