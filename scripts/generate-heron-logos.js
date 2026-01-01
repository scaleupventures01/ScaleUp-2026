const fs = require('fs');
const path = require('path');
const https = require('https');

// API Configuration - Gemini 3 Pro Image Preview for MAXIMUM QUALITY
const API_KEY = 'AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${API_KEY}`;

// Output path
const OUTPUT_DIR = '/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/heron';

// The Brand Essence
const BRAND_ESSENCE = `
BRAND: ScaleUp Ventures
TAGLINE: "We Prove It Before You Buy"
TARGET: Skeptical 50-65 year old successful business owners who've been burned by consultants
CORE VALUES: TRUSTWORTHY, PRECISE, PATIENT, PROVEN
`;

// Style requirements - NON-NEGOTIABLE
const STYLE_REQUIREMENTS = `
MANDATORY VISUAL CONSTRAINTS:
- Background: PURE WHITE (#FFFFFF) - absolutely non-negotiable
- Primary Color: Deep Navy (#0F1729) - the color of midnight authority
- Accent Color: Burnished Gold (#D4A853) - the color of proven value
- NO gradients, NO shadows, NO 3D effects, NO glows, NO textures
- FLAT vector-style design ONLY
- Clean, precise geometric forms
- Must scale perfectly from billboard to 16px favicon
- This is NOT clip art, NOT stock imagery, NOT generic
- The aesthetic of a $100,000 brand identity project
- Think: Paul Rand meets Japanese calligraphy master
`;

// Six distinct Heron logo prompts - from classic to innovative
const prompts = [
  {
    name: "heron-01-minimal-geometric",
    title: "The Essence - Purest Geometric Abstraction",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - Reduced to Its Purest Geometric Essence

CONCEPTUAL FOUNDATION:
The heron embodies: "I watch. I wait. I strike with precision." This is exactly what ScaleUp Ventures does for clients. The heron is the anti-consultant - patient, observant, precise. Not the frantic energy of a hawk, but the calculated stillness of a master.

DESIGN DIRECTION:
Abstract the heron to 3-5 geometric shapes MAXIMUM. This is the Saul Bass approach - find the ONE geometric truth that captures the entire bird's spirit.

THE SACRED ELEMENT:
The elegant S-curve of the heron's neck is SACRED - this curved line is the visual hook, the memorable gesture. One continuous flowing line that moves like water but feels solid as steel.

GEOMETRY:
- The neck: A single elegant curve, perhaps rendered as a flowing thick line or a thin crescent form
- The body: A single geometric shape - triangle, teardrop, or abstract wedge
- Maximum 4 total elements including the eye
- The silhouette should be recognizable at a GLANCE, memorable after ONE viewing

GOLD ACCENT - USE SPARINGLY:
- ONLY on the eye (a perfect small circle) OR the beak tip (a subtle point)
- Like a glint of sunlight on still water
- This tiny gold detail (#D4A853) should feel PRECIOUS, not decorative

TYPOGRAPHY BELOW THE MARK:
"ScaleUp Ventures" in a refined serif typeface (like Crimson Pro or Freight Display)
- Tracked with elegant letterspacing
- Deep Navy (#0F1729) color
- Positioned below the mark with appropriate breathing room
- The type should feel carved in marble, not printed

EMOTIONAL IMPACT:
When a skeptical 60-year-old CEO sees this logo, they should feel:
"These people are serious. They're patient. They don't rush. I can trust them."

RENDER AS:
Professional logo mark with wordmark, flat vector style, pure white background. The aesthetic of a century-old institution combined with timeless modern design.`
  },
  {
    name: "heron-02-single-stroke",
    title: "The Single Stroke - Japanese Calligraphy Influence",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - As a Single Continuous Stroke

CONCEPTUAL FOUNDATION:
Imagine a Japanese calligraphy master who has practiced drawing herons for 40 years. This is their final masterwork - ONE fluid stroke that captures the bird's entire essence. Years of practice distilled into a single gesture.

DESIGN DIRECTION:
The entire heron rendered as ONE continuous line that never lifts from the page. The line flows from beak tip, curves elegantly through the S-shaped neck, sweeps through the body, and extends through the leg to a single point.

THE LINE:
- Varying thickness to suggest form - thinner at extremities, fuller at the body
- Navy blue (#0F1729) - solid, confident, unwavering
- The curve of the neck is the HERO of this design
- Organic flow with geometric precision - it feels natural but is mathematically perfect

GOLD ACCENT - THE EYE:
- A single perfect gold circle (#D4A853) marking the eye position
- This is the ONLY departure from the continuous stroke
- Positioned precisely where the curve of the head meets the neck line
- Small but luminous - like a drop of molten gold

THE OVERALL SHAPE:
- Should suggest the heron in elegant stillness - standing, watching, waiting
- The single leg implied by the line descending to a point
- Height-to-width ratio approximately 3:1 (tall and elegant)

TYPOGRAPHY:
"ScaleUp Ventures" below the mark
- Elegant serif with generous letter-spacing
- Navy blue (#0F1729)
- The wordmark should feel like it belongs with this brushstroke aesthetic
- Perhaps slightly lighter weight than the mark itself

MOOD:
The confidence that comes from mastery. The patience of wisdom. This logo whispers rather than shouts - and that whisper commands attention.

RENDER AS:
Professional logo mark with integrated wordmark, flat vector style, pure white background. The aesthetic of a master's final brushstroke.`
  },
  {
    name: "heron-03-geometric-silhouette",
    title: "The Silhouette - Architectural Precision",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - Architectural Silhouette

CONCEPTUAL FOUNDATION:
This is the heron as architecture - as if the bird were designed by a master architect. Every angle is intentional. Every proportion is calculated. The result is a silhouette so refined it feels like a building as much as a bird.

DESIGN DIRECTION:
A solid navy silhouette of an abstract heron, but with ARCHITECTURAL precision:
- Sharp, deliberate angles where curves might typically be
- The neck as a series of 2-3 connected straight segments forming an elegant angle
- The body as a confident geometric mass
- No organic flourishes - this is ENGINEERED beauty

GEOMETRY:
- The beak: A precise narrow triangle pointing forward
- The head: A small geometric form (circle or angular shape)
- The neck: Angular, like an elegant bracket or architectural detail
- The body: A bold, solid mass - perhaps trapezoidal or wedge-shaped
- Total silhouette should read clearly at any size

NEGATIVE SPACE:
- Consider using negative space within the form
- Perhaps the eye is created by absence rather than addition
- Clean, crisp edges throughout

GOLD ACCENT:
- The eye: A perfect gold (#D4A853) circle, small and precise
- OR: The tip of the beak in gold - a golden point of precision
- This accent should feel like inlaid metal, precious and permanent

TYPOGRAPHY:
"ScaleUp Ventures" in a geometric serif (like Playfair Display or similar)
- Strong, confident letterforms
- Navy blue (#0F1729)
- Tracking should echo the precision of the mark

MOOD:
Engineering confidence. Architectural permanence. This is not a logo designed last week - it feels like it could have been designed 50 years ago and will still look perfect 50 years from now.

RENDER AS:
Professional logo mark with wordmark, flat vector style, pure white background. The aesthetic of a corporate identity that has weathered decades with dignity.`
  },
  {
    name: "heron-04-elegant-abstraction",
    title: "The Abstraction - Refined Minimalism",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - Elegant Abstraction

CONCEPTUAL FOUNDATION:
Push minimalism to its limit. How few elements can suggest a heron while still evoking patience, precision, and watchfulness? This is the logo that makes people look twice - abstract enough to intrigue, clear enough to remember.

DESIGN DIRECTION:
The absolute minimum required to suggest "heron":
- Perhaps just the distinctive curved neck and a suggestion of the head
- Or the characteristic standing posture reduced to geometric essence
- The goal: when someone sees this, they FEEL "heron" before they consciously identify it

POSSIBLE APPROACHES:
1. Just the curved neck line and a gold circle eye - nothing more
2. A vertical stance with elegant S-curve suggesting neck and body in one form
3. Two or three shapes that together create the impression of the bird

THE CURVE:
- The signature S-curve of the heron's neck MUST be present in some form
- This is the DNA of the design - the one element that cannot be removed
- Thick navy line or elegant crescent shape

GOLD ACCENT - ESSENTIAL:
- The gold (#D4A853) element should be the eye
- This single point of gold becomes the anchor of the entire composition
- Small, perfect, precious - like a gold filling in a navy sky

NEGATIVE SPACE CONSIDERATION:
- What you leave out matters as much as what you include
- The white space around the minimal forms should feel intentional
- Breathing room that suggests patience and confidence

TYPOGRAPHY:
"ScaleUp Ventures" - refined, elegant serif
- Lighter weight than the mark to create hierarchy
- Navy (#0F1729)
- Generous spacing - let it breathe

MOOD:
Sophistication through restraint. Intelligence through implication. This logo respects the viewer's intelligence - it doesn't spell everything out.

RENDER AS:
Professional minimal logo mark with wordmark, flat vector style, pure white background. The aesthetic of a brand that knows when to stop.`
  },
  {
    name: "heron-05-circular-frame",
    title: "The Contained Form - Circular Composition",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - Contained Within Perfect Geometry

CONCEPTUAL FOUNDATION:
The heron silhouette or abstraction elegantly contained within or interacting with a perfect circle. This creates a logo mark that works as a standalone icon - perfect for app icons, social media, stamps, and seals. The circle represents wholeness, completion, the full-service nature of ScaleUp's approach.

DESIGN DIRECTION:
The abstract heron integrated with a circular form:
- The heron might be WITHIN a circle (thin navy ring)
- Or the heron's curve might COMPLETE the circle
- Or the circle might frame/contain the heron silhouette

GEOMETRY:
- Circle: Thin navy (#0F1729) ring, or implied circle
- Heron: Minimalist navy silhouette or curved form within
- The heron's S-curve neck should play off the circular form
- The bird should feel balanced within the containment, not cramped

POSSIBLE COMPOSITIONS:
1. Thin circle ring containing an elegant heron silhouette
2. The heron's curved neck completing 3/4 of a circle, with a thin arc completing it
3. A solid heron silhouette emerging from or contained by a circle

GOLD ACCENT:
- The eye of the heron: a small gold (#D4A853) circle
- This creates a "circle within a circle" motif - elegant repetition
- Or the gold could be a small accent at the point where the heron meets the circle

PROPORTIONS:
- The overall mark should work as a square icon
- The heron should feel COMFORTABLE within the circle, not squeezed
- Leave adequate space for the form to breathe

TYPOGRAPHY:
"ScaleUp Ventures" positioned below the circular mark
- Elegant serif typeface
- Navy (#0F1729)
- Width should relate harmoniously to the circle diameter

MOOD:
Completeness. A closed loop of service. The confidence of a firm that handles everything. Professional, established, trustworthy.

RENDER AS:
Professional logo mark with wordmark, flat vector style, pure white background. The aesthetic of a seal of quality - something you'd emboss or stamp.`
  },
  {
    name: "heron-06-dynamic-stance",
    title: "The Stance - Poised for Action",
    prompt: `${BRAND_ESSENCE}

${STYLE_REQUIREMENTS}

CREATE A LEGENDARY LOGO:

THE HERON - Poised at the Moment of Action

CONCEPTUAL FOUNDATION:
The heron has watched. The heron has waited. Now - the precise moment before the strike. This is not stillness, but COILED ENERGY. Patient analysis about to become decisive action. This is ScaleUp's promise: we prove it, then we act with precision.

DESIGN DIRECTION:
A more dynamic heron posture while maintaining geometric elegance:
- The neck extended forward, not curved back
- A sense of forward motion without actually moving
- The moment between patience and action - frozen potential energy

GEOMETRY:
- Body: Angular, streamlined - like an arrow about to be released
- Neck: Extended forward in an elegant diagonal or slight curve
- Head/Beak: Pointed, precise, aimed
- Leg(s): Single strong vertical or slight angle suggesting planted stability
- Maximum 5 geometric elements

DYNAMIC ELEMENTS:
- Diagonal lines create energy and forward motion
- The overall composition might lean slightly forward
- But still BALANCED - poised, not falling
- Angles should suggest precision, not chaos

GOLD ACCENT:
- The eye: Alert, focused, gold (#D4A853) - the heron sees the opportunity
- Or the beak tip in gold - the tool of precision action
- This gold point should feel like the focal point of all that coiled energy

NEGATIVE SPACE:
- Consider negative space creating the eye or other details
- Sharp, clean edges throughout
- The white space should contribute to the sense of alertness

TYPOGRAPHY:
"ScaleUp Ventures" - confident serif
- Could be bolder than other versions to match the dynamism
- Navy (#0F1729)
- Positioned to balance the dynamic mark

MOOD:
Confidence. Readiness. The power of patience transformed into precise action. This logo says "We've done the work. We're ready. Let's move."

RENDER AS:
Professional logo mark with wordmark, flat vector style, pure white background. The aesthetic of controlled power - a coiled spring in geometric form.`
  }
];

async function generateImage(prompt, outputPath, retryCount = 0) {
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

    const req = https.request(API_URL, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', async () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            // Check if it's a rate limit error - retry with backoff
            if (response.error.message && response.error.message.includes('quota') && retryCount < 5) {
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

          // Look for image data in the response
          if (response.candidates && response.candidates[0]) {
            const parts = response.candidates[0].content.parts;

            for (const part of parts) {
              if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
                // Decode base64 image and save
                const imageBuffer = Buffer.from(part.inlineData.data, 'base64');
                fs.writeFileSync(outputPath, imageBuffer);
                console.log(`    SUCCESS: Saved to ${outputPath}`);
                resolve({ success: true, path: outputPath });
                return;
              }
            }

            // If text response found but no image, show it
            for (const part of parts) {
              if (part.text) {
                console.log(`    Model text: ${part.text.substring(0, 200)}`);
              }
            }
            reject(new Error('No image data found in response'));
          } else {
            console.log('Full response:', JSON.stringify(response, null, 2).substring(0, 1000));
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

async function main() {
  console.log('');
  console.log('='.repeat(70));
  console.log('   SCALEUP VENTURES - LEGENDARY HERON LOGO GENERATION');
  console.log('   Model: gemini-3-pro-image-preview | Temperature: 1.0 (Maximum)');
  console.log('='.repeat(70));
  console.log('');
  console.log('Brand: ScaleUp Ventures - "We Prove It Before You Buy"');
  console.log('Target: Skeptical 50-65 year old business owners');
  console.log('Values: Trustworthy, Precise, Patient, Proven');
  console.log('');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < prompts.length; i++) {
    const { name, title, prompt } = prompts[i];
    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);

    console.log(`\n[${i + 1}/${prompts.length}] ${title}`);
    console.log('-'.repeat(60));

    try {
      const result = await generateImage(prompt, outputPath);
      results.push({
        name,
        title,
        status: 'success',
        path: outputPath
      });
    } catch (error) {
      console.error(`    ERROR: ${error.message}`);
      results.push({
        name,
        title,
        status: 'error',
        error: error.message
      });
    }

    // Delay between requests to avoid rate limiting
    if (i < prompts.length - 1) {
      console.log('    Waiting 5 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Save comprehensive summary
  const summaryPath = path.join(OUTPUT_DIR, 'heron-generation-summary.json');
  const summary = {
    generated: new Date().toISOString(),
    brand: 'ScaleUp Ventures',
    concept: 'The Heron - Minimal Geometric Abstraction',
    tagline: 'We Prove It Before You Buy',
    model: 'gemini-3-pro-image-preview',
    temperature: 1.0,
    symbolism: 'The heron represents patience, precision, and calculated action - watching, waiting, then striking with accuracy.',
    colorPalette: {
      primary: '#0F1729 (Deep Navy)',
      accent: '#D4A853 (Burnished Gold)',
      background: '#FFFFFF (Pure White)'
    },
    results: results.map((r, i) => ({
      ...r,
      variation: i + 1,
      fullPrompt: prompts[i].prompt
    })),
    duration: `${((Date.now() - startTime) / 1000).toFixed(1)} seconds`
  };

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary saved to: ${summaryPath}`);

  console.log('\n' + '='.repeat(70));
  console.log('   GENERATION COMPLETE');
  console.log('='.repeat(70));

  const successful = results.filter(r => r.status === 'success').length;
  console.log(`\nResults: ${successful}/${results.length} logos generated successfully`);
  console.log(`Total time: ${((Date.now() - startTime) / 1000).toFixed(1)} seconds`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);

  if (successful > 0) {
    console.log('\nGenerated files:');
    results.filter(r => r.status === 'success').forEach(r => {
      console.log(`  - ${r.path}`);
    });
  }

  console.log('\n--- HERON CONCEPTS OVERVIEW ---');
  console.log('1. heron-01-minimal-geometric.png - Purest geometric abstraction (Saul Bass style)');
  console.log('2. heron-02-single-stroke.png - Japanese calligraphy influence');
  console.log('3. heron-03-geometric-silhouette.png - Architectural precision');
  console.log('4. heron-04-elegant-abstraction.png - Maximum minimalism');
  console.log('5. heron-05-circular-frame.png - Icon/seal format');
  console.log('6. heron-06-dynamic-stance.png - Poised for action');
}

main().catch(console.error);
