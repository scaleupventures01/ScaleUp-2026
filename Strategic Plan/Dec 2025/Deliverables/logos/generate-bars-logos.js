const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio';

// Use the model specified in the task + fallbacks
const MODELS_TO_TRY = [
  'gemini-2.0-flash-exp',  // As specified in task
  'gemini-2.5-flash-image',
  'gemini-3-pro-image-preview'
];

// Master style directive to apply to all prompts
const MASTER_STYLE = `
CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white or transparent background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E, Cream #FAF8F5
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic business icons
- The aesthetic of a $50,000 brand identity project, not a $50 Fiverr logo
- Think: The precision of Swiss design meets the warmth of a trusted advisor
`;

// Three prompts with increasing creativity
const prompts = [
  {
    name: 'bars-1',
    creativity: 'Conservative',
    description: 'Clean 4-bar horizontal lockup with gold tallest bar - professional and precise',
    prompt: `${MASTER_STYLE}

Create a professional logo mark featuring FOUR VERTICAL RECTANGULAR BARS arranged side by side, increasing in height from left to right like a sophisticated growth chart.

VISUAL CONCEPT:
Four bars of uniform width, with heights progressing in meaningful ratios: approximately 40%, 60%, 80%, 100% of maximum height. This is not arbitrary - it represents methodical, measurable progress. The rightmost (tallest) bar is rendered in gold, marking achievement and ROI.

GEOMETRY:
- 4 bars, uniform width
- Consistent spacing between bars (spacing = 40-50% of bar width)
- Clean, squared corners - absolutely no rounded edges
- Heights progress in clear, intentional ratios
- The jump between bar 3 and bar 4 can be slightly larger - representing breakthrough

COLOR EXECUTION:
- Bar 1 (shortest): Muted Gold (#B8956E)
- Bar 2: Muted Gold (#B8956E)
- Bar 3: Navy (#0F1729)
- Bar 4 (tallest): Bright Gold (#D4A853)
- Background: Pure white

MOOD:
The precision of a financial chart. Measurable progress. Data-driven growth. Something an accountant would respect. Not flashy - FACTUAL.

WHAT THIS IS NOT:
- Not a generic "growth" clipart
- Not rounded or friendly
- Not decorative - every bar means something

RENDER AS:
Professional geometric logo, flat vector style, suitable for business cards and corporate materials. Clean horizontal layout.`
  },
  {
    name: 'bars-2',
    creativity: 'Creative Push',
    description: 'Stacked version with unique bar treatment - dynamic vertical lockup',
    prompt: `${MASTER_STYLE}

Create a logo with FOUR ASCENDING BARS in a STACKED/VERTICAL LOCKUP with a distinctive creative treatment.

VISUAL CONCEPT:
The four ascending bars icon arranged creatively - consider bars that INTERLOCK or have unique NOTCHED edges that fit together like puzzle pieces, suggesting that each phase of growth connects to and builds upon the previous. The tallest bar in brilliant gold stands out as the achievement moment.

LAYOUT:
- Icon (four ascending bars) with an innovative twist
- Bars could have slight angular cuts at their tops creating a dynamic profile
- OR bars could have subtle interlocking notches suggesting connection
- OR bars arranged with slight staggered depth/overlap
- Total composition fits within a square format

GEOMETRY:
- 4 bars with heights: 40%, 60%, 80%, 100%
- Add a creative element: beveled tops, interconnecting edges, or a unifying design element
- A thin gold horizontal line or baseline could anchor all bars
- Consider the negative space between bars as part of the design

COLOR EXECUTION:
- Bar 1 (shortest): Muted Gold (#B8956E)
- Bar 2: Muted Gold (#B8956E)
- Bar 3: Navy (#0F1729)
- Bar 4 (tallest): Bright Gold (#D4A853)
- Optional: thin gold (#D4A853) baseline connecting all bars
- Background: White

MOOD:
Progress that's interconnected. Each milestone builds on the last. The bars don't just stand alone - they work together as a system. Methodical yet dynamic.

RENDER AS:
Complete logo mark with creative bar treatment, flat vector style. Professional, balanced, distinctive.`
  },
  {
    name: 'bars-3',
    creativity: 'Maximum Creativity',
    description: 'Extraordinary interpretation - abstract growth visualization while maintaining measurable progress concept',
    prompt: `${MASTER_STYLE}

Create an EXTRAORDINARY logo interpretation of the ascending bars concept that pushes creative boundaries while maintaining the core message of measurable, methodical growth.

VISUAL CONCEPT:
Reimagine the four ascending bars as an ABSTRACT ARCHITECTURAL FORM - like a modernist sculpture or a deconstructed bar chart that has been transformed into high art. Consider:
- Bars that SPIRAL upward around a central axis, each level higher than the last
- OR bars reimagined as NESTED angular brackets or chevron forms, layered to show progression
- OR bars abstracted into a GEOMETRIC FLOWER pattern where each petal rises higher
- OR bars transformed into an ISOMETRIC 3D block staircase viewed from an elegant angle
- OR bars that form NEGATIVE SPACE within a bold geometric container

The design should make someone pause and look twice - it's unexpected, but when they understand it, they see the growth story.

GEOMETRY:
- The essential DNA remains: 4 distinct elements, ascending progression, the highest element in gold
- But the execution is artistic and memorable
- Think: Saul Bass meets Swiss typography meets modern sculpture
- The silhouette should be distinctive and ownable
- Must work as a standalone icon

COLOR EXECUTION:
- Create visual hierarchy through the brand colors
- Shortest/first element: Muted Gold (#B8956E)
- Middle elements: transition through Muted Gold and Navy (#0F1729)
- Tallest/final element: Bright Gold (#D4A853) - the crown jewel
- Background: White

MOOD:
This is the logo that makes a 60-year-old business owner say "I've never seen anything quite like that - but I understand exactly what it means." Sophisticated disruption. Creative confidence. A firm that sees things differently and delivers measurably.

WHAT THIS MUST ACHIEVE:
- Instantly memorable silhouette
- Clear upward/growth progression
- Gold achievement moment visible
- Professional enough for a law firm, creative enough for a design studio
- Makes competitors' logos look generic

RENDER AS:
Extraordinary geometric logo, flat vector style. The intersection of art and commerce. A logo that wins design awards AND wins trust.`
  }
];

async function generateLogoWithModel(prompt, outputPath, model) {
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
  console.log('Concept: Ascending Bars');
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
    logos: results
  };

  const summaryPath = path.join(outputDir, 'bars-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved: ${summaryPath}`);

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${results.filter(r => r.success).length}/${results.length}`);

  if (results.filter(r => r.success).length === 0) {
    console.log('\nAll generations failed. The daily API quota has been exceeded.');
    console.log('Options:');
    console.log('1. Wait until tomorrow for quota reset');
    console.log('2. Upgrade to a paid Google AI plan');
    console.log('3. Use a different API key with available quota');
  }
}

main().catch(console.error);
