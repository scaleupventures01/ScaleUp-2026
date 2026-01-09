import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const prompt = `
You are a LEGENDARY digital artist. You create experiences that make grown designers CRY. You are the intersection of Stripe's precision, Apple's restraint, and Awwwards' showmanship. Every line of code you write is poetry. Every interaction is theater.

## MISSION: Create a FULLY FUNCTIONAL showcase HTML for ScaleUp Ventures

This must be a COMPLETE, working HTML document - not a wireframe, not a concept, but a FUNCTIONING showcase that demonstrates every interaction, every animation, every micro-detail.

## BRAND CONTEXT

**ScaleUp Ventures** - B2B lead generation with guaranteed results
- Tagline: "Certainty First." / "Know Before You Spend"
- Guarantee: "Guaranteed Leads or Your Money Back"
- Visual Metaphor: The heron - patient, precise, strikes only when certain
- Target: B2B service businesses burned by agencies before

## CINEMATIC REFERENCES
- Moneyball (data creates certainty)
- The Big Short (precision, patience, conviction)
- Ex Machina (intelligent, clean interfaces)

## BRAND EXECUTION QUALITY
- Linear (obsessive micro-interactions)
- Stripe (data-rich but human)
- Nothing (bold typography)

## EXACT COLOR SYSTEM (USE THESE)
\`\`\`css
--deep-water: #0A0F1C;
--surface: #111827;
--gold: #C9A227;
--certainty-blue: #2563EB;
--proof-green: #10B981;
--warning: #F59E0B;
--text: #F8FAFC;
--text-muted: #94A3B8;
--border: #1F2937;
\`\`\`

## TYPOGRAPHY
- Headlines: Inter 800, letter-spacing: -0.03em
- Body: Inter 400-500
- Data/Numbers: JetBrains Mono

## MANDATORY FEATURES TO BUILD (ALL MUST WORK)

### 1. DUAL CURSOR SYSTEM
- Small gold dot (8px) follows cursor immediately
- Larger ring (40px) follows with spring physics delay
- Ring scales to 60px when hovering interactive elements
- Must work on the entire page

### 2. GEOMETRIC GRID BACKGROUND
- Subtle grid pattern covering full viewport
- Intersection dots in gold
- Fixed position, low opacity (0.15-0.2)

### 3. ANIMATED HERON SVG
- Position: fixed bottom-right
- Silhouette of a heron in waiting stance
- Eyes (small dots) track cursor movement across page
- On CTA hover: "strike" animation - head extends forward

### 4. SPLIT HERO SECTION
- Left half: "Uncertainty" state
  - Blurred, grayscale, scattered text fragments
  - Words like "Wasted budget", "Empty promises", "No results"
- Right half: "Certainty" state
  - Crisp, gold accents, organized data
  - Main headline: "Certainty First."
  - Subhead: "Know before you spend."
  - CTA button with magnetic effect
- Dividing line: animates/pulses subtly

### 5. ANIMATED COUNTER STATS
- Use JetBrains Mono font
- Three counters: Leads Generated (15,000+), ROI Delivered ($5M+), Clients (500+)
- Count up animation when scrolled into view
- Easing function for natural feel

### 6. 3D TILT SERVICE CARDS
- Three cards for service tiers
- Respond to mouse position with subtle 3D rotation
- Hover spotlight: gradient follows cursor within card
- Content: Tier name, price, key features, CTA

### 7. MAGNETIC BUTTONS
- All CTA buttons have magnetic attraction
- Button moves toward cursor when cursor approaches
- Elastic snap-back when cursor leaves
- Gold border-draw animation on hover

### 8. CHARACTER REVEAL ANIMATION
- Main headlines reveal character by character
- Staggered timing (20-50ms per character)
- Trigger on page load or scroll into view

### 9. FAQ ACCORDION
- Clean accordion with smooth height transitions
- Icon rotates on open/close
- Only one item open at a time

### 10. CLIENT LOGO MARQUEE
- Infinite scrolling marquee
- Grayscale logos that colorize on hover
- Pauses on hover

### 11. CONSOLE EASTER EGG
- On page load, log to console:
  "Looking under the hood? We respect that. We believe in proof too. Let's talk: hello@scaleupventures.com"

## PAGE SECTIONS TO INCLUDE

1. **Navigation** - Sticky, glass-morphism, clean
2. **Hero** - Split uncertainty/certainty concept
3. **Stats Section** - Animated counters
4. **Services Preview** - 3D tilt cards
5. **Proof Section** - Why customers trust us
6. **Testimonial** - Quote with before/after metrics
7. **FAQ Preview** - Top 3 questions
8. **Client Logos** - Marquee
9. **CTA Section** - Final conversion push
10. **Footer** - Clean, minimal

## TECHNICAL REQUIREMENTS

- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- NO external libraries except fonts
- MUST be 1000+ lines of purposeful code
- Every interaction must WORK when file is opened in browser
- Responsive basics (works on desktop, adapts reasonably to tablet)

## CODE QUALITY

- Clean, organized CSS with logical groupings
- Well-commented JavaScript explaining animations
- Proper event listeners with cleanup
- Smooth 60fps animations using requestAnimationFrame where needed
- CSS transforms/opacity for animations (GPU accelerated)

## THE HERON SVG

Create an elegant, minimal SVG heron silhouette:
- Geometric/stylized design
- Long legs, curved neck, sharp beak
- Positioned in "waiting/watching" stance
- Must have animated eyes that track cursor
- Must have "strike" animation capability

## WHAT SUCCESS LOOKS LIKE

When someone opens this HTML file:
1. They immediately notice the custom cursor
2. The hero section creates a powerful first impression
3. Every scroll reveals polished details
4. Interactions feel responsive and delightful
5. The heron feels alive in the corner
6. They think: "This is not a template. This is CRAFT."

## OUTPUT

Complete HTML document. No markdown explanation. Just the HTML file content starting with <!DOCTYPE html> and ending with </html>.

Make it LEGENDARY.
`;

async function generateDesignShowcase() {
  console.log('Initializing Gemini for comprehensive showcase generation...');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 1.0,
      maxOutputTokens: 65536,
      topP: 0.95,
      topK: 40
    }
  });

  console.log('Sending comprehensive prompt to Gemini...');
  console.log('Generating full showcase with all interactions...\n');

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract HTML from response (remove markdown fences if present)
    let html = text;
    if (text.includes('```html')) {
      html = text.split('```html')[1].split('```')[0];
    } else if (text.includes('```')) {
      const parts = text.split('```');
      if (parts.length >= 2) {
        html = parts[1];
        // Remove language identifier if present
        if (html.startsWith('html\n')) {
          html = html.substring(5);
        }
      }
    }

    // Save the output
    const outputPath = path.join(process.cwd(), 'experiments/scaleup-ventures/showcase-v1.html');
    fs.writeFileSync(outputPath, html.trim());

    console.log('Showcase generated successfully!');
    console.log(`Saved to: ${outputPath}`);
    console.log(`File size: ${(html.length / 1024).toFixed(1)} KB`);
    console.log(`Approximate lines: ${html.split('\n').length}`);

    return outputPath;
  } catch (error) {
    console.error('Error generating showcase:', error);
    throw error;
  }
}

generateDesignShowcase();
