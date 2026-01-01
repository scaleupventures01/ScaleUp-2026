const fs = require('fs');
const path = require('path');

// API configuration
const API_KEY = 'AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio';

// Master style directive to prepend to all prompts
const MASTER_STYLE = `CRITICAL STYLE REQUIREMENTS:
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

// The three Watershed prompts with escalating creativity
const prompts = [
  {
    name: 'watershed-1',
    creativity: 'Conservative',
    description: 'Clean converging lines meeting at gold point',
    prompt: `${MASTER_STYLE}Create an abstract geometric mark representing a WATERSHED — the critical turning point where separate streams converge into a single, powerful unified direction.

VISUAL CONCEPT:
Two or three straight angular LINE ELEMENTS approaching from different trajectories (suggest angles between 15-45 degrees from vertical). These lines MEET at a single convergence point positioned in the lower-center of the composition. From this intersection, a SINGLE UNIFIED ELEMENT continues downward — this continuation should feel MORE SUBSTANTIAL than the individual approaching lines (bolder weight or expanded form).

GEOMETRY:
- 2-3 angular lines approaching from above (like tributaries)
- Lines converge at a precise point
- Below the convergence, a single stronger element continues
- The unified element is approximately 1.5x the weight of the approaching lines
- Angles should feel structural: prefer 30, 45, or 60 degrees — architectural, not chaotic
- Consider using negative space at the convergence to create visual interest

COLOR EXECUTION:
- Approaching lines: Navy (#0F1729)
- Convergence point and/or unified path below: Gold (#D4A853) — marking where transformation occurs
- Background: White

MOOD & FEELING:
This is about CONSOLIDATION and the resulting power of unified direction. Architectural — like structural lines where load-bearing elements meet. The mark should feel like it could be etched in steel or cast in bronze. Permanent, not trendy. A 60-year-old business owner should think "these people are serious."

WHAT THIS IS NOT:
- Not about "connection" or "collaboration" in a soft way
- Not a network diagram
- Not trendy intersecting lines
- Not decorative — every angle is intentional

RENDER AS:
Sophisticated geometric logo, flat vector style. The precision of architectural drawings. Strong, structural, meaningful.`
  },
  {
    name: 'watershed-2',
    creativity: 'Medium-High',
    description: 'Negative space or keystone variation with more visual interest',
    prompt: `${MASTER_STYLE}Create a geometric logo where NEGATIVE SPACE tells the story of convergence within a solid shape.

VISUAL CONCEPT:
A solid geometric shape in navy — perhaps a modified rectangle, angular bracket, or bold trapezoid form. WITHIN this solid shape, NEGATIVE SPACE (white) carves out the convergence pattern: two or three angular paths meeting at a point. The solid navy provides the frame; the white negative space reveals the transformation story. A minimal gold accent marks the exact convergence point.

GEOMETRY:
- Solid containing shape: bold, substantial, architectural
- White negative space channels: angular, purposeful, like tributaries carved into stone
- Gold accent at convergence point: small but visible, like a surveyor's mark on a blueprint
- The overall silhouette should be distinctive and memorable

COLOR EXECUTION:
- Solid shape: Navy (#0F1729)
- Negative space (carved channels): White (background shows through)
- Convergence point marker: Gold (#D4A853)

MOOD:
Industrial. Architectural. Like a maker's mark stamped into steel. The channels carved by intention, not accident. This is engineering made visible.

RENDER AS:
Bold geometric logo with negative space design, flat vector style. Strong silhouette, clever use of positive/negative interplay. Make this MORE CREATIVE and visually striking than a simple convergence mark — use the negative space to create an unexpected, memorable form.`
  },
  {
    name: 'watershed-3',
    creativity: 'Maximum',
    description: 'Extraordinary convergence mark with keystone architecture',
    prompt: `${MASTER_STYLE}Create an EXTRAORDINARY logo based on the architectural concept of a KEYSTONE — the wedge-shaped piece at the apex of an arch that locks all other stones in place.

VISUAL CONCEPT:
Multiple linear elements converge upon and are SUPPORTED BY a central keystone form. The keystone is the critical piece that holds everything together. Abstract this into clean geometric lines: two angled lines pressing inward toward a central angular shape that holds them in tension.

This design should be BOLD, MEMORABLE, and ARCHITECTURALLY STRIKING. Push beyond the ordinary — this should be a mark that commands attention and respect.

GEOMETRY:
- Two angular lines approaching from upper-left and upper-right
- These lines press inward toward a central keystone shape
- The keystone: a trapezoidal or wedge form, positioned where the lines would meet
- The keystone element is gold — it's the transformative piece
- Supporting angular elements in navy
- The overall composition suggests an arch, abstracted to pure geometry
- Consider adding subtle geometric complexity: perhaps the keystone has internal structure, or the supporting lines have precise weight variations
- The mark should work as a standalone symbol that could become iconic

COLOR EXECUTION:
- Angled supporting lines: Navy (#0F1729)
- Central keystone element: Gold (#D4A853)
- Background: White

MOOD:
The precision of classical architecture. The keystone is what makes an arch work — without it, everything falls. This is the critical element. Substantial, load-bearing, essential. This should feel PERMANENT — like something carved into the facade of a century-old institution.

CREATIVE DIRECTION:
This is the MOST CREATIVE iteration. Push beyond simple geometric convergence. Create something that feels both ancient (like Roman architecture) and modern (like contemporary Swiss design). The kind of mark that becomes synonymous with excellence. Think of the most memorable corporate marks — Apple, Nike, Mercedes — and aim for that level of iconic simplicity with maximum impact.

RENDER AS:
Architectural geometric logo, flat vector style. The elegance of classical principles rendered in modern minimalism. This should be EXTRAORDINARY — a mark worthy of becoming legendary.`
  }
];

// Try multiple model configurations
const MODELS_CONFIG = [
  {
    name: 'gemini-2.0-flash-preview-image-generation',
    endpoint: (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    buildRequest: (prompt) => ({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"]
      }
    }),
    extractImage: (data) => {
      if (data.candidates?.[0]?.content?.parts) {
        for (const part of data.candidates[0].content.parts) {
          if (part.inlineData?.mimeType?.startsWith('image/')) {
            return Buffer.from(part.inlineData.data, 'base64');
          }
        }
      }
      return null;
    }
  },
  {
    name: 'imagen-3.0-generate-002',
    endpoint: (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`,
    buildRequest: (prompt) => ({
      instances: [{ prompt: prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: "1:1",
        safetyFilterLevel: "BLOCK_ONLY_HIGH"
      }
    }),
    extractImage: (data) => {
      if (data.predictions?.[0]?.bytesBase64Encoded) {
        return Buffer.from(data.predictions[0].bytesBase64Encoded, 'base64');
      }
      return null;
    }
  }
];

async function sleep(ms) {
  console.log(`Waiting ${ms/1000}s...`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryGenerateImage(prompt, outputPath) {
  for (const config of MODELS_CONFIG) {
    console.log(`\n  Trying model: ${config.name}...`);

    const url = `${config.endpoint(config.name)}?key=${API_KEY}`;
    const requestBody = config.buildRequest(prompt);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`  ${config.name} failed: ${response.status}`);

        // Check if it's a rate limit that might clear
        if (response.status === 429) {
          try {
            const errorData = JSON.parse(errorText);
            if (errorData.error?.details) {
              for (const detail of errorData.error.details) {
                if (detail['@type']?.includes('RetryInfo') && detail.retryDelay) {
                  const delay = Math.ceil(parseFloat(detail.retryDelay) * 1000) + 5000;
                  console.log(`  Rate limited. Suggested retry in ${delay/1000}s`);
                }
              }
            }
          } catch {}
        }
        continue;
      }

      const data = await response.json();
      const imageBuffer = config.extractImage(data);

      if (imageBuffer) {
        fs.writeFileSync(outputPath, imageBuffer);
        console.log(`  SUCCESS with ${config.name}!`);
        console.log(`  Saved: ${outputPath}`);
        return { success: true, model: config.name };
      }

      console.log(`  ${config.name} returned no image data`);
      console.log('  Response:', JSON.stringify(data, null, 2).slice(0, 500));

    } catch (error) {
      console.log(`  ${config.name} error: ${error.message}`);
    }
  }

  return { success: false };
}

async function main() {
  const outputDir = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos';
  const results = [];

  console.log('='.repeat(60));
  console.log('ScaleUp Ventures - Watershed Mark Logo Generation');
  console.log('Trying multiple Gemini/Imagen models...');
  console.log('='.repeat(60));

  for (let i = 0; i < prompts.length; i++) {
    const promptData = prompts[i];
    const outputPath = path.join(outputDir, `${promptData.name}.png`);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`[${i+1}/3] ${promptData.name} (${promptData.creativity})`);
    console.log(`Description: ${promptData.description}`);
    console.log('-'.repeat(40));

    const result = await tryGenerateImage(promptData.prompt, outputPath);

    results.push({
      name: promptData.name,
      creativity: promptData.creativity,
      description: promptData.description,
      status: result.success ? 'success' : 'error',
      model: result.model || 'none',
      path: result.success ? outputPath : null,
      timestamp: new Date().toISOString()
    });

    // Delay between requests
    if (i < prompts.length - 1) {
      await sleep(5000);
    }
  }

  // Save summary
  const summary = {
    brand: 'ScaleUp Ventures',
    concept: 'The Watershed Mark',
    conceptDescription: 'Represents convergence - separate streams becoming unified powerful direction',
    colors: {
      navy: '#0F1729',
      gold: '#D4A853',
      mutedGold: '#B8956E',
      cream: '#FAF8F5'
    },
    targetAudience: '50-65+ technology-hesitant business owners',
    tagline: 'We Prove It Before You Buy',
    generatedAt: new Date().toISOString(),
    modelsAttempted: MODELS_CONFIG.map(c => c.name),
    logos: results
  };

  const summaryPath = path.join(outputDir, 'watershed-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved: ${summaryPath}`);

  console.log('\n' + '='.repeat(60));
  console.log('Generation Complete');
  console.log('='.repeat(60));
  console.log(`Total logos: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.status === 'success').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'error').length}`);

  if (results.filter(r => r.status === 'error').length > 0) {
    console.log('\nNote: The Gemini API has daily request limits on the free tier.');
    console.log('Options to resolve:');
    console.log('1. Wait for quota reset (usually 24 hours)');
    console.log('2. Upgrade to a paid Gemini API plan');
    console.log('3. Use a different API key');
  }
}

main().catch(console.error);
