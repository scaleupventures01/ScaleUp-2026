const fs = require('fs');
const path = require('path');

// API Key from .env file
const GOOGLE_API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';

// Models to try in order
const MODELS_TO_TRY = [
  'gemini-2.0-flash-exp',
  'gemini-2.5-flash-image',
  'gemini-3-pro-image-preview'
];

// Master style directive
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

// Three Fulcrum Mark prompts with increasing creativity
const prompts = [
  {
    name: 'fulcrum-1',
    creativity: 'Conservative',
    description: 'Classic balanced triangle on apex - timeless precision',
    prompt: `${MASTER_STYLE}

Create a professional logo mark featuring THE FULCRUM CONCEPT: A balanced triangular form resting on its apex point.

VISUAL CONCEPT:
A single inverted triangle (chevron pointing downward) perfectly balanced on its lowest point. This represents the fulcrum - the precise pivot point where leverage transforms small force into significant movement. The apex point where the triangle touches its base is highlighted in gold, representing the critical moment of leverage.

GEOMETRY:
- One clean inverted triangle (equilateral or slightly isoceles for elegance)
- The triangle points DOWNWARD, balanced on its apex
- Apex point rendered in bright gold as the focal point
- Clean, sharp corners - absolutely no rounded edges
- Proportions: width approximately 1.5x the height
- A subtle horizontal baseline may anchor the composition

COLOR EXECUTION:
- Main triangle body: Navy (#0F1729)
- Apex point/tip: Bright Gold (#D4A853) - this is the leverage point, the fulcrum
- The gold accent should be visible but refined - not overpowering
- Background: Pure white

MOOD:
Precision engineering. The moment before movement. Potential energy. Something an engineer or physicist would appreciate. Not flashy - MATHEMATICAL.

WHAT THIS IS NOT:
- Not a play button
- Not a generic arrow or chevron
- Not decorative - every angle means something

RENDER AS:
Professional geometric logo, flat vector style, suitable for business cards and corporate materials. Clean, balanced, iconic.`
  },
  {
    name: 'fulcrum-2',
    creativity: 'Distinctive',
    description: 'Elongated wedge with bold gold tip - dynamic and substantial',
    prompt: `${MASTER_STYLE}

Create a distinctive logo mark featuring AN ELONGATED FULCRUM WEDGE - a more dramatic interpretation of the balanced pivot concept.

VISUAL CONCEPT:
An elongated, narrow inverted triangle (wedge shape) balanced on its point - like a precision knife edge or a sleek architectural spire inverted. The extreme elongation creates tension and drama. The sharp gold tip at the bottom represents concentrated force and precision leverage.

GEOMETRY:
- Elongated inverted triangle, much taller than it is wide
- Height to width ratio approximately 3:1 or 4:1 - notably stretched
- The wedge tapers to a sharp gold point at the bottom
- Upper edge is a clean horizontal line
- Sides angle dramatically inward to the apex
- The gold tip extends slightly beyond just the point - perhaps the bottom 15-20% of the wedge

COLOR EXECUTION:
- Upper portion of wedge: Navy (#0F1729)
- Lower tip/point section: Bright Gold (#D4A853) - creating a distinctive two-tone effect
- The transition between navy and gold should be a clean horizontal line, no gradient
- Optional: thin gold line at the base where the point touches the implied ground
- Background: Pure white

MOOD:
Dynamic tension. A blade poised to move. The moment of maximum potential before action. Sophisticated yet bold. Something a design-forward CEO would immediately respect.

WHAT THIS ACHIEVES:
- More distinctive silhouette than a standard triangle
- The elongation creates drama and memorability
- The gold tip stands out as the critical leverage point
- Feels premium and intentional

RENDER AS:
Professional geometric logo, flat vector style. Bold yet refined. A wedge of possibility.`
  },
  {
    name: 'fulcrum-3',
    creativity: 'Maximum Creativity',
    description: 'Two intersecting planes with gold diamond at intersection - architectural and extraordinary',
    prompt: `${MASTER_STYLE}

Create an EXTRAORDINARY logo mark that reimagines the fulcrum concept as TWO INTERSECTING GEOMETRIC PLANES with a gold diamond marking their critical intersection point.

VISUAL CONCEPT:
Two angular planes (like folded paper or architectural surfaces) that cross each other at a single point. Where they intersect, a small gold diamond marks the fulcrum - the pivot point where leverage happens. This is NOT a simple X - it's two distinct forms that share one critical point of contact.

GEOMETRY:
- Two elongated triangular or trapezoidal planes
- They intersect at ONE specific point, not overlapping entirely
- Think: Two paper airplanes touching nose-to-nose, OR two angular brackets crossing
- OR two chevron shapes that share a single vertex
- At the exact intersection point: a small gold diamond shape (not a circle)
- The overall composition should be balanced but asymmetric in an interesting way
- One plane could be slightly larger/longer than the other

POSSIBLE INTERPRETATIONS:
- Two V shapes that touch at their points, forming an hourglass-like figure with a gold center
- Two elongated chevrons crossing in the middle, gold diamond at the cross point
- An angular X-like form where the crossing point is clearly the focal element
- Two triangular sails meeting at their tips

COLOR EXECUTION:
- Plane 1: Navy (#0F1729)
- Plane 2: Muted Gold (#B8956E) - creating visual depth and distinction
- Intersection diamond: Bright Gold (#D4A853) - the most luminous element
- Background: Pure white

MOOD:
Architectural precision meets artistic vision. The intersection of forces. Sophisticated complexity that resolves into clarity. Something that makes a 60-year-old business owner say "That's different - but I understand exactly what it means."

WHAT THIS MUST ACHIEVE:
- Instantly memorable and ownable silhouette
- Clear focal point at the gold intersection
- Feels premium and intentional, not random
- Professional enough for a law firm, creative enough for a design studio
- The gold diamond is clearly the "leverage point" - the fulcrum moment

RENDER AS:
Extraordinary geometric logo, flat vector style. Where precision meets poetry. An intersection of intent.`
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
        model: result.model,
        prompt: promptConfig.prompt
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
    error: 'All models failed or quota exceeded',
    prompt: promptConfig.prompt
  };
}

async function main() {
  const outputDir = path.dirname(process.argv[1]);
  const results = [];

  console.log('\n=== ScaleUp Ventures Logo Generation ===');
  console.log('Concept: The Fulcrum Mark');
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
    concept: 'The Fulcrum Mark',
    conceptDescription: 'A fulcrum - the precise pivot point where leverage transforms small force into significant movement. An inverted triangle/chevron balanced on its apex.',
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
    variations: [
      {
        file: 'fulcrum-1.png',
        name: 'Conservative',
        description: 'Classic balanced triangle on apex - timeless precision'
      },
      {
        file: 'fulcrum-2.png',
        name: 'Distinctive',
        description: 'Elongated wedge with bold gold tip - dynamic and substantial'
      },
      {
        file: 'fulcrum-3.png',
        name: 'Maximum Creativity',
        description: 'Two intersecting planes with gold diamond at intersection - architectural and extraordinary'
      }
    ],
    logos: results
  };

  const summaryPath = path.join(outputDir, 'fulcrum-results.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved: ${summaryPath}`);

  console.log('\n=== Generation Complete ===');
  console.log(`Success: ${results.filter(r => r.success).length}/${results.length}`);

  if (results.filter(r => r.success).length === 0) {
    console.log('\nAll generations failed. The daily API quota may have been exceeded.');
    console.log('Options:');
    console.log('1. Wait until tomorrow for quota reset');
    console.log('2. Upgrade to a paid Google AI plan');
    console.log('3. Use a different API key with available quota');
  }
}

main().catch(console.error);
