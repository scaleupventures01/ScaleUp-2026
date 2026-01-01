#!/usr/bin/env node

/**
 * GOD-LEVEL LOGO GENERATION FOR SCALEUP VENTURES
 *
 * These are NOT generic logos. These are award-winning marks designed to create
 * the "oh!" moment of recognition that separates Pentagram-quality work from
 * template garbage.
 *
 * Each prompt is crafted with:
 * - EXACT geometric specifications from the creative brief
 * - Explicit cliche avoidance language
 * - The discovery moment built into the design
 * - Temperature 1.0 for maximum creativity within constraints
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Configuration
const API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";
const OUTPUT_DIR = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v2";

// Brand Colors
const COLORS = {
  navy: "#0F1729",
  gold: "#D4A853",
  mutedGold: "#B8956E",
  cream: "#FAF8F5"
};

/**
 * THE FIVE CONCEPTS - Crafted for maximum impact and discovery
 */
const GOD_LEVEL_PROMPTS = {

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 1: THE LEVER POINT
  // ═══════════════════════════════════════════════════════════════════════════
  leverPoint: {
    name: "THE LEVER POINT",
    filename: "01-lever-point.png",
    conceptSummary: "The golden fulcrum where small proof creates massive transformation",
    ohMoment: "First glance: elegant abstraction. Second: 'That's a lever about to move something massive.' Third: 'The gold point IS the proof.'",
    prompt: `CREATE A WORLD-CLASS LOGO MARK for "ScaleUp Ventures"

THIS IS NOT A GENERIC LOGO. This is a Pentagram/Wolff Olins caliber mark that will make design professionals gasp.

THE CONCEPT: THE LEVER POINT
Archimedes said: "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world."
This mark captures THE EXACT MOMENT before massive transformation occurs.

PRECISE GEOMETRIC SPECIFICATIONS:
1. A single NAVY diagonal line (#0F1729) at EXACTLY 35 degrees from horizontal
   - Medium stroke weight - like an architectural drawing, confident and precise
   - Extends from lower left toward upper right

2. A NAVY horizontal line (#0F1729) of identical stroke weight
   - Extends from the intersection point toward the right
   - Creates an acute angle with the diagonal

3. Where they meet: A GOLD CIRCLE (#D4A853)
   - This is THE FULCRUM - the pivot point where proof creates transformation
   - Size: approximately 15-20% of the mark's total height
   - Slightly overlaps both lines - it HOLDS them together, ANCHORS the composition
   - This gold point is the visual center of gravity

4. NEGATIVE SPACE: The triangular void ABOVE the diagonal represents "the world about to be moved"
   - This space should feel INTENTIONAL, not accidental
   - It's pregnant with potential energy

COMPOSITION:
- Fits within a square canvas
- Feels DYNAMIC despite being static - frozen tension before release
- ASYMMETRICAL by design - the diagonal creates forward momentum
- Background: Clean cream (#FAF8F5)

THE DISCOVERY SEQUENCE:
- At first glance: An elegant abstract geometric mark
- At second glance: "Wait - that's a lever about to move something massive"
- At third glance: "The gold point is where everything pivots. That's the proof."

WHAT THIS IS NOT (EXPLICIT EXCLUSIONS):
- NOT a see-saw with objects on each end (too literal)
- NOT a balance scale (wrong metaphor - this is about LEVERAGE, not balance)
- NOT symmetrical (symmetry = static = wrong)
- NOT an illustration or explanatory diagram
- NOT a generic swoosh or arc
- NO gradients, shadows, or 3D effects
- NO text in this mark (symbol only)

EMOTIONAL QUALITY:
This mark should make a skeptical 62-year-old business owner think:
"These people understand leverage. They're not going to waste my money on everything - they're going to find the ONE thing that moves the needle."

EXECUTION QUALITY:
- Vector-sharp edges
- Mathematical precision in the angles
- Professional craft visible in every decision
- Could win a D&AD award

OUTPUT: High-resolution logo mark on cream background, production-ready quality.`
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 2: THE PROOF MARK
  // ═══════════════════════════════════════════════════════════════════════════
  proofMark: {
    name: "THE PROOF MARK",
    filename: "02-proof-mark.png",
    conceptSummary: "A maker's mark being stamped into existence - part proven, part being proven",
    ohMoment: "First glance: elegant maker's mark. Second: 'Part is complete, part is still forming...' Third: 'They're showing proof being MADE - that's their whole promise.'",
    prompt: `CREATE A WORLD-CLASS LOGO MARK for "ScaleUp Ventures"

THIS IS NOT A GENERIC LOGO. This is a mark worthy of hanging alongside Dieter Rams and Paul Rand.

THE CONCEPT: THE PROOF MARK
Before certificates existed, craftsmen STAMPED their work. Goldsmiths hallmarked precious metals.
These weren't decorative - they were PERMANENT, VISIBLE PROOF of authenticity.

ScaleUp creates proof before asking for trust. This mark shows PROOF IN THE ACT OF BEING MADE.

PRECISE GEOMETRIC SPECIFICATIONS:

OUTER BOUNDARY:
- A SQUIRCLE (rounded rectangle with softened corners) - NOT a circle (too expected), NOT a sharp rectangle
- Navy stroke (#0F1729), no fill - just the outline
- The shape of a hallmark being struck, a signet pressed into wax
- At the BOTTOM: A small triangular NOTCH (like a registration mark on a stamp) - this industrial detail elevates the mark from "logo" to "mark of authenticity"

INNER SYMBOL:
- Two interlocking curves forming an abstracted "S" shape
- NOT a literal letter S - a SYMBOL that happens to echo the brand initial
- The curves should feel like they're being IMPRESSED into surface

THE TWIST - PARTIAL COMPLETION:
- LEFT/TOP portion of the S curves: SOLID GOLD FILL (#D4A853) - this is PROVEN, complete
- RIGHT/BOTTOM portion of the S curves: GOLD OUTLINE ONLY (#D4A853 stroke, no fill) - this is BEING PROVEN, in progress
- The transition from solid to outline should be SEAMLESS - like the mark is being struck in real-time
- This visual captures "We prove it BEFORE you buy" - the mark is being made, not already made

COMPOSITION:
- Square canvas
- Background: Cream (#FAF8F5)
- The mark should feel like a quality stamp you'd find on precious metalwork
- Industrial precision meets artisanal craft

THE DISCOVERY SEQUENCE:
- At first glance: An elegant maker's mark / hallmark
- At second glance: "Part of it is complete, part is still forming..."
- At third glance: "Oh - they're showing the proof being made. That IS the brand promise."

WHAT THIS IS NOT (EXPLICIT EXCLUSIONS):
- NOT a certificate seal with laurels and ribbons (corporate cliche)
- NOT a checkmark or "approved" stamp (too obvious)
- NOT a medal or badge
- NOT a circular seal (too expected)
- NOT fully complete or fully incomplete - the DUALITY is the point
- NO gradients, shadows, or 3D effects
- NO text in this mark

EMOTIONAL QUALITY:
This mark should make a skeptical 62-year-old think:
"This reminds me of quality marks I trust - sterling silver hallmarks, Swiss watch stamps. The fact that it's partially complete is intriguing. They're transparent about the process."

EXECUTION QUALITY:
- The solid/outline transition must be elegant, not jarring
- The registration notch is SUBTLE but present
- Museum-quality craftsmanship
- Every detail intentional

OUTPUT: High-resolution logo mark on cream background, production-ready quality.`
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 3: THE THRESHOLD
  // ═══════════════════════════════════════════════════════════════════════════
  threshold: {
    name: "THE THRESHOLD",
    filename: "03-threshold.png",
    conceptSummary: "Negative space creates a doorway to clarity - see before you commit",
    ohMoment: "First glance: abstract geometric mark. Second: 'There's a doorway in the negative space...' Third: 'The gold line is where I can SEE through - that's the proof point.'",
    prompt: `CREATE A WORLD-CLASS LOGO MARK for "ScaleUp Ventures"

THIS IS NOT A GENERIC LOGO. This is architecture in miniature - a mark that rewards the viewer for looking.

THE CONCEPT: THE THRESHOLD
Every ScaleUp client stands at a doorway. Behind them: doubt, bad experiences, distrust.
Ahead: transformation they can't see yet.

ScaleUp ILLUMINATES what's on the other side BEFORE asking them to step through.
The threshold is the moment of seeing - when doubt becomes certainty.

PRECISE GEOMETRIC SPECIFICATIONS:

THE UPRIGHTS (What you actually draw):
- TWO navy trapezoidal shapes (#0F1729), SOLID fill
- Mirrored left and right
- Each angles inward as it rises - EXACTLY 85 degrees from vertical (5 degrees off true perpendicular)
- This creates subtle dynamism without instability

THE NEGATIVE SPACE (What you DON'T draw - but IS the mark):
- The GAP between the uprights forms an UPWARD-NARROWING CHANNEL
- At the base: gap is approximately 40% of total width
- At the top: gap is approximately 25% of total width
- This negative space reads as "a way through" - a DOORWAY - without ever drawing a door
- The passage shape also suggests an ARROW pointing up

THE GOLD SIGHT LINE:
- A single horizontal gold line (#D4A853) crosses the gap
- Positioned at the UPPER THIRD (not centered - at the natural visual focal point)
- The line extends SLIGHTLY BEYOND the uprights - it's not contained by them
- This represents THE MOMENT OF SEEING CLEARLY - the proof point

COMPOSITION:
- Vertical rectangle canvas, approximately 2:3 proportion
- Background: Cream (#FAF8F5)
- The uprights should feel SUBSTANTIAL - solid navy masses
- The gold line is PRECISE and linear - contrast of mass and precision

THE DISCOVERY SEQUENCE:
- At first glance: Abstract geometric mark with two pillars
- At second glance: "There's a doorway in the negative space..."
- At third glance: "And the gold line is where I can SEE through it - that's the sight line, the proof point."

The viewer DISCOVERS the doorway rather than being shown it - this mirrors the discovery process of proof-of-concept.

WHAT THIS IS NOT (EXPLICIT EXCLUSIONS):
- NOT an open door with light streaming through (cliche)
- NOT an arch with a keystone (different concept)
- NOT a tunnel with light at the end (overused)
- NOT illustrative or explanatory
- NOT symmetrical in feeling (even if geometrically balanced)
- NO gradients, shadows, or 3D effects
- NO text in this mark

EMOTIONAL QUALITY:
This mark should make a skeptical 62-year-old think:
"This is architectural. Solid. The pillars feel like stability. The space between them feels like an invitation to see something clearly. That gold line is where I get to SEE."

EXECUTION QUALITY:
- The negative space doorway must read clearly at all sizes
- Weight balance: substantial uprights, precise sight line
- In reversed applications, the passage should read even MORE clearly
- Works at favicon to billboard scale

OUTPUT: High-resolution logo mark on cream background, production-ready quality.`
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 4: THE KEYSTONE
  // ═══════════════════════════════════════════════════════════════════════════
  keystone: {
    name: "THE KEYSTONE",
    filename: "04-keystone.png",
    conceptSummary: "The one critical element that makes everything else work - with hidden SV",
    ohMoment: "First glance: golden wedge with flanking lines. Second: 'Those lines would complete an arch...' Third: 'And wait - is that an S and V built into the gold shape?'",
    prompt: `CREATE A WORLD-CLASS LOGO MARK for "ScaleUp Ventures"

THIS IS NOT A GENERIC LOGO. This is a mark with THREE LAYERS of discovery that reward the attentive viewer.

THE CONCEPT: THE KEYSTONE
In architecture, the keystone is the wedge at the apex of an arch - the LAST stone placed,
the one that LOCKS EVERYTHING ELSE in place. Remove it, and the entire structure collapses.

For ScaleUp's clients, PROOF is the keystone. They have a business, they have ambitions,
but without proof that technology delivers, none of it holds together.

ScaleUp provides the keystone - the proof that locks everything into place.

PRECISE GEOMETRIC SPECIFICATIONS:

THE KEYSTONE (Central element):
- A TRAPEZOID in SOLID GOLD (#D4A853)
- WIDER AT TOP, narrower at bottom (ratio approximately 1.3:1)
- This is the architectural keystone shape
- HIDDEN WITHIN: Subtle angular cuts in the interior that create an "S" and "V" in negative space
  - These letters are DISCOVERED, not obvious - maybe 15% of viewers notice them
  - They're INHERENT in the geometry, not illustrated on top
  - If people never notice them, that's okay. If they do, it's a DELIGHT.

THE IMPLIED ARCH (Flanking elements):
- Two angled NAVY lines (#0F1729) on either side of the keystone
- Positioned at EXACTLY 70 degrees from horizontal
- These suggest the arch's spring lines - the arch EXISTS in the viewer's mind
- The lines DON'T touch the keystone - a small GAP creates breathing room
- The arch is IMPLIED, not drawn - the viewer's mind completes it

COMPOSITION:
- Horizontal rectangle canvas, approximately 3:2
- Background: Cream (#FAF8F5)
- The gold keystone is the HERO - solid, essential, valuable
- The navy lines are SUPPORTING - suggesting structure without overwhelming

THE DISCOVERY SEQUENCE:
- At first glance: A golden wedge shape with elegant flanking lines
- At second glance: "Wait - those angled lines would complete an arch..."
- At third glance: "And if I look at the gold shape itself... is that an S and V built into it?"

THREE LAYERS OF MEANING. Each one creates satisfaction.

WHAT THIS IS NOT (EXPLICIT EXCLUSIONS):
- NOT a complete arch with the keystone highlighted (too literal)
- NOT an illustrative architectural drawing
- NOT letters placed ON TOP of a shape (letters are IN the geometry)
- NOT a gateway or doorway (different concept)
- NOT overly complex - simplicity with depth
- NO gradients, shadows, or 3D effects
- NO text in this mark

EMOTIONAL QUALITY:
This mark should make a skeptical 62-year-old think:
"This is solid. Gold. Essential. The arch is suggested but not drawn - clever. The supporting structure is mine; the keystone is what they provide. They understand that I've built something - they're providing the critical piece I'm missing."

EXECUTION QUALITY:
- Trapezoid proportion is critical - too wide at top = unstable, too narrow = doesn't read
- The embedded SV is DISCOVERABLE, not OBVIOUS
- The gap between keystone and flanking lines must be perfect
- Consider if subtle gradient (lighter at top) enhances dimensionality

OUTPUT: High-resolution logo mark on cream background, production-ready quality.`
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONCEPT 5: THE PIVOT
  // ═══════════════════════════════════════════════════════════════════════════
  pivot: {
    name: "THE PIVOT",
    filename: "05-pivot.png",
    conceptSummary: "The same element in two states - before and after transformation around proof",
    ohMoment: "First glance: abstract mark with gold center. Second: 'The left and right are the SAME shape - but one has rotated up...' Third: 'The gold point CAUSED the transformation.'",
    prompt: `CREATE A WORLD-CLASS LOGO MARK for "ScaleUp Ventures"

THIS IS NOT A GENERIC LOGO. This is a mark that shows TRANSFORMATION FROZEN in process.

THE CONCEPT: THE PIVOT
A pivot is a single point around which everything else rotates.
For ScaleUp's audience, the pivot is when DOUBT BECOMES CERTAINTY - when they've seen the proof.

ScaleUp IS the pivot point. Small engagement, massive reorientation.

THE MARK SHOWS TWO STATES AT ONCE: BEFORE AND AFTER.

PRECISE GEOMETRIC SPECIFICATIONS:

THE PIVOT POINT (Center):
- A GOLD CIRCLE (#D4A853) at the center of the composition
- Size: approximately 18% of the mark's total height
- This is SUBSTANTIAL - not decorative - this point CAUSED the transformation
- This is the causal center of the entire mark

THE BEFORE STATE (Left):
- A NAVY RECTANGLE (#0F1729) extending leftward from the gold point
- Positioned PERFECTLY HORIZONTAL
- This is stasis. Doubt. Waiting. The old state before proof.
- Vertically centered on the gold point

THE AFTER STATE (Right):
- A NAVY RECTANGLE of IDENTICAL DIMENSIONS extending rightward
- Rotated EXACTLY 40 degrees UPWARD from horizontal
- This is motion. Certainty. Growth. The new state after proof.
- The pivot point (gold circle) is the axis of rotation

THE VISUAL STORY:
- These are THE SAME ELEMENT in two different states
- The viewer should recognize they're identical but transformed
- The gold point is where the transformation HAPPENED
- Before (left): horizontal, waiting
- After (right): ascending, activated

OPTIONAL - MOTION SUGGESTION:
- Very subtle, almost subliminal muted gold (#B8956E) motion arcs between the two states
- These help the viewer understand the rotation but should NOT dominate
- If they make the mark too complex, OMIT them - cleaner is better

COMPOSITION:
- Horizontal rectangle canvas, approximately 2:1
- Background: Cream (#FAF8F5)
- The gold point should feel like the gravitational center
- Balance the horizontal and ascending elements visually

THE DISCOVERY SEQUENCE:
- At first glance: Abstract mark with a central gold point
- At second glance: "The left side and right side are the SAME shape, but one has rotated upward..."
- At third glance: "The gold point is where the transformation happened. That's where they did their work."

The mark captures TRANSFORMATION FROZEN in process - before and after visible simultaneously.

WHAT THIS IS NOT (EXPLICIT EXCLUSIONS):
- NOT a circular arrow showing a cycle (wrong metaphor)
- NOT motion blur or spinning effect (too literal)
- NOT a generic upward arrow (cliche)
- NOT transformation as REPLACEMENT (this is transformation as ROTATION)
- NOT chaotic or busy - controlled, intentional repositioning
- NO gradients, shadows, or 3D effects
- NO text in this mark

EMOTIONAL QUALITY:
This mark should make a skeptical 62-year-old think:
"This shows cause and effect. The gold point CAUSED the right side to rotate upward. It's not magic, not hype - it's physics. My business stays connected to who it is, but the direction changes. This isn't about abandoning what I've built - it's about reorienting it around evidence."

EXECUTION QUALITY:
- The two rectangles MUST be visually identical (same length, weight)
- The 40-degree angle is precise - 45 is too expected, 30 isn't enough
- The gold point must feel causal, not decorative
- Mathematical precision in all measurements

OUTPUT: High-resolution logo mark on cream background, production-ready quality.`
  }
};

/**
 * Generate a single logo using Gemini API
 */
async function generateLogo(concept, genAI) {
  console.log(`\n${"=".repeat(70)}`);
  console.log(`GENERATING: ${concept.name}`);
  console.log(`${"=".repeat(70)}`);
  console.log(`Concept: ${concept.conceptSummary}`);
  console.log(`Oh! Moment: ${concept.ohMoment}`);
  console.log(`\nSending to Gemini with temperature 1.0 for creative freedom...`);

  const startTime = Date.now();

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["Text", "Image"],
        temperature: 1.0, // Maximum creativity within constraints
      },
    });

    const response = await model.generateContent(concept.prompt);
    const result = response.response;
    const parts = result.candidates?.[0]?.content?.parts || [];

    let imageSaved = false;
    let textResponse = "";

    for (const part of parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        const ext = mimeType.includes("png") ? ".png" : ".jpg";
        const finalPath = path.join(OUTPUT_DIR, concept.filename.replace(/\.(png|jpg|jpeg)$/i, "") + ext);

        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(finalPath, buffer);

        console.log(`\nSAVED: ${finalPath}`);
        console.log(`Size: ${(buffer.length / 1024).toFixed(1)} KB`);
        imageSaved = true;
      }

      if (part.text) {
        textResponse = part.text;
        console.log(`\nModel commentary: ${part.text.substring(0, 200)}...`);
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    return {
      name: concept.name,
      filename: concept.filename,
      success: imageSaved,
      duration: `${duration}s`,
      conceptSummary: concept.conceptSummary,
      ohMoment: concept.ohMoment,
      modelResponse: textResponse.substring(0, 500),
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error(`\nERROR generating ${concept.name}:`, error.message);
    return {
      name: concept.name,
      filename: concept.filename,
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log(`
${"#".repeat(70)}
#                                                                    #
#            GOD-LEVEL LOGO GENERATION FOR SCALEUP VENTURES          #
#                                                                    #
#    These are NOT generic logos. These are award-winning marks      #
#    designed to create the "oh!" moment of recognition.             #
#                                                                    #
${"#".repeat(70)}

Brand: ScaleUp Ventures
Tagline: "We Prove It Before You Buy"
Target: 50-65+ technology-hesitant business owners who've been burned

Colors:
  Navy:       ${COLORS.navy}
  Gold:       ${COLORS.gold}
  Muted Gold: ${COLORS.mutedGold}
  Cream:      ${COLORS.cream}

Output Directory: ${OUTPUT_DIR}
`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(API_KEY);

  const results = {
    generationRun: {
      timestamp: new Date().toISOString(),
      purpose: "GOD-LEVEL Logo Generation - Attempt #2",
      model: "gemini-2.0-flash-exp",
      temperature: 1.0,
      brand: "ScaleUp Ventures",
      tagline: "We Prove It Before You Buy",
      targetAudience: "50-65+ technology-hesitant business owners who've been burned",
      colors: COLORS
    },
    concepts: []
  };

  // Generate each logo sequentially (to avoid rate limits)
  const concepts = Object.values(GOD_LEVEL_PROMPTS);

  for (let i = 0; i < concepts.length; i++) {
    const concept = concepts[i];
    console.log(`\n[${ i + 1}/${concepts.length}] Starting ${concept.name}...`);

    const result = await generateLogo(concept, genAI);
    results.concepts.push(result);

    // Delay between generations to avoid rate limiting
    if (i < concepts.length - 1) {
      console.log(`\nWaiting 3 seconds before next generation...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Save results JSON
  const resultsPath = path.join(OUTPUT_DIR, "god-level-results.json");
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsPath}`);

  // Summary
  console.log(`
${"=".repeat(70)}
                         GENERATION COMPLETE
${"=".repeat(70)}

Results Summary:
`);

  for (const result of results.concepts) {
    const status = result.success ? "SUCCESS" : "FAILED";
    console.log(`  ${status}: ${result.name}`);
    if (result.success) {
      console.log(`          File: ${result.filename}`);
      console.log(`          Time: ${result.duration}`);
    } else {
      console.log(`          Error: ${result.error}`);
    }
    console.log();
  }

  const successCount = results.concepts.filter(r => r.success).length;
  console.log(`Total: ${successCount}/${results.concepts.length} logos generated successfully`);
  console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  console.log(`Results JSON: ${resultsPath}`);
}

// Run
main().catch(console.error);
