const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';

// Use models that support image generation
const MODELS_TO_TRY = [
  'gemini-2.0-flash-exp',
  'gemini-2.5-flash-preview-05-20'
];

// Master style directive for Proof Seal concept
const MASTER_STYLE = `
CRITICAL STYLE REQUIREMENTS:
- Professional logo design, vector-style rendering
- Clean white background
- NO gradients, NO glows, NO shadows, NO 3D effects
- Flat design with precise geometric forms
- Color palette ONLY: Navy #0F1729, Gold #D4A853, Muted Gold #B8956E, Cream #FAF8F5
- Must look like it was designed by a senior brand designer at Pentagram or Wolff Olins
- NOT clip art, NOT stock imagery, NOT generic certification badges
- The aesthetic of a $50,000 brand identity project, not a $50 Fiverr logo
- Think: The authority of a notary seal meets the precision of Swiss design
`;

// Three prompts with increasing creativity for the Proof Seal concept
const prompts = [
  {
    name: 'seal-1',
    creativity: 'Conservative',
    description: 'Clean concentric rings - professional notary-style seal',
    prompt: `${MASTER_STYLE}

Create a professional PROOF SEAL logo mark inspired by a notary's embossed seal or engineer's certification stamp.

VISUAL CONCEPT:
A circular seal composed of CONCENTRIC RINGS that convey authority, verification, and trust. This is for ScaleUp Ventures, a firm that proves ROI before clients invest. The seal represents their guarantee of verification.

GEOMETRY:
- Outer ring: Bold Navy (#0F1729) circle border, substantial weight
- Second ring: Thin Gold (#D4A853) accent line
- Third ring: Contains subtle geometric patterns or small repeated elements suggesting data/proof points
- Center: Clean circular area that could contain "SV" monogram or be left as negative space
- Total diameter creates a balanced, stamp-like proportion

COMPOSITION:
- Perfect circular symmetry
- 3-4 concentric rings with varying weights
- Clean, geometric precision - every line is intentional
- The rings should have the satisfying completeness of a wax seal impression

COLOR EXECUTION:
- Primary rings: Navy (#0F1729)
- Accent elements: Gold (#D4A853)
- Fine details: Muted Gold (#B8956E)
- Background: Pure white

MOOD:
The gravitas of a professional certification. The trust of an official stamp. Something a skeptical business owner would see and think "this firm takes verification seriously." Not flashy - AUTHORITATIVE.

WHAT THIS IS NOT:
- Not a generic badge or shield
- Not a ribbon or award icon
- Not decorative - every ring means something
- Not complex or busy - elegant simplicity

RENDER AS:
Professional geometric logo, flat vector style, clean circular seal form. Suitable for business cards, letterheads, and as a trust mark on documents.`
  },
  {
    name: 'seal-2',
    creativity: 'Distinctive',
    description: 'Emblem-style seal with proof points - verification mark with character',
    prompt: `${MASTER_STYLE}

Create a distinctive PROOF SEAL logo that functions as an emblem of verification with unique visual character.

VISUAL CONCEPT:
A seal that incorporates PROOF POINTS - small geometric elements arranged around the circular form that suggest checkmarks, data points, or verification markers. Think of an engineer's stamp that has been elevated to fine design. This represents ScaleUp Ventures' rigorous proof process.

GEOMETRY:
- Primary form: Circular seal with strong Navy (#0F1729) outer ring
- Secondary elements: 4-6 small geometric proof point markers positioned at compass points around the ring
- These markers could be: small gold dots, tiny chevron checkmarks, or minimal square notches
- Interior: Could feature interlocking "SV" letterforms or an abstract verification symbol
- The proof points break the perfect circle in a controlled, intentional way

COMPOSITION:
- Circular base with strategic interruptions
- Proof points create visual rhythm around the circumference
- Interior element provides focal point
- Balance between the solidity of the ring and the dynamism of the markers

DESIGN ELEMENTS TO CONSIDER:
- Small gold (#D4A853) dots at 12, 3, 6, 9 o'clock positions
- OR subtle notches cut into the outer ring creating a gear-like precision
- OR thin radiating lines suggesting rays of verification
- Interior could have a stylized checkmark formed from brand colors

COLOR EXECUTION:
- Main seal ring: Navy (#0F1729)
- Proof point markers: Gold (#D4A853)
- Interior element: Combination of Navy and Gold
- Any fine details: Muted Gold (#B8956E)
- Background: White

MOOD:
More dynamic than a traditional seal, but still commanding authority. This is verification with personality. A seal that says "we don't just certify - we prove with precision."

RENDER AS:
Distinctive emblem logo, flat vector style. The sophistication of a European certification mark with American directness. Professional yet memorable.`
  },
  {
    name: 'seal-3',
    creativity: 'Maximum Creativity',
    description: 'Extraordinary verification mark - reimagined proof seal that challenges conventions',
    prompt: `${MASTER_STYLE}

Create an EXTRAORDINARY proof seal logo that reimagines what a verification mark can be while maintaining the core message of trust and proven results.

VISUAL CONCEPT:
Push the seal concept into unexpected territory. Consider:
- A seal that appears to be in the act of EMBOSSING - showing the dimensional moment of impression
- Concentric rings that SPIRAL inward like a fingerprint of authenticity
- A seal formed by NEGATIVE SPACE within bold geometric forms
- Overlapping circles that create a Venn diagram of proof (where the intersection is gold)
- A seal reimagined as an ABSTRACT EYE - verification as clear-sighted examination
- Geometric forms that suggest both a seal AND an upward arrow/growth indicator

This is for ScaleUp Ventures whose tagline is "We Prove It Before You Buy" - the seal should feel like PROOF INCARNATE.

GEOMETRY:
- Start with circular DNA but transform it
- Could incorporate angular elements that give it forward momentum
- Consider how the seal would look partially "opened" or "activated"
- The silhouette should be instantly recognizable yet unprecedented
- Think: if Saul Bass designed a notary seal

CREATIVE DIRECTIONS TO EXPLORE:
- Concentric rings that break and reconnect, suggesting process and verification
- A seal formed by the intersection of multiple geometric elements
- The suggestion of layered/stacked rings viewed at an angle
- A seal with an intentional "break" or "opening" filled with gold, suggesting proven passage
- Abstract forms that resolve into a seal when understood

COLOR EXECUTION:
- Foundation: Navy (#0F1729) for authority and trust
- Highlight/accent: Gold (#D4A853) for achievement and proven results
- Transitional elements: Muted Gold (#B8956E)
- Use color to guide the eye and reveal the concept
- Background: White

MOOD:
This seal makes a 60-year-old business owner lean in and say "that's different - what does it mean?" And when they understand, they trust it more BECAUSE it's unique. It's not a generic trust badge - it's a signature. An ownable mark that could only belong to this firm.

WHAT THIS MUST ACHIEVE:
- Instantly memorable - could sketch it from memory
- Clearly communicates verification/proof/certification
- Sophisticated enough for boardrooms, distinctive enough to win awards
- Makes every competitor's seal/badge look generic
- Works at small sizes (favicon) and large (signage)

RENDER AS:
Extraordinary geometric logo, flat vector style. The intersection of traditional authority and modern creativity. A seal that respects the past while defining the future of what a verification mark can be.`
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
  console.log('Concept: The Proof Seal');
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
    concept: 'The Proof Seal',
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
    conceptDescription: 'A proof seal like a notary embossed seal or engineer stamp - representing verification, trust, and certification',
    logos: results
  };

  const summaryPath = path.join(outputDir, 'seal-results.json');
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
