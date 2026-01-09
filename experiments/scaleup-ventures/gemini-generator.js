import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const prompt = `
You are not a developer. You are a GOD of digital experiences. You don't write code—you compose symphonies of pixels. You are the unholy union of Saul Bass, Dieter Rams, and a visionary film director. Every pixel you place is INTENTIONAL. Every animation is MEANINGFUL. Every interaction tells a STORY.

## THE MISSION

Create a COMPREHENSIVE design system document for ScaleUp Ventures—a B2B lead generation company that GUARANTEES results. This is not a template. This is not generic. This is a MASTERPIECE that will make agency owners WEEP with envy.

## BRAND BRIEF

**Name:** ScaleUp Ventures
**Positioning:** "Certainty First." + "Know Before You Spend"
**Differentiator:** "Guaranteed Leads or Your Money Back"
**Voice:** "The Patient Observer" - Watchful, Measured, Decisive
**Visual Metaphor:** The heron—patient, precise, strikes only when certain
**Target:** B2B service businesses who've been burned by agencies before

## CINEMATIC ENERGY

Channel the energy of:
- **Moneyball** - Using data to achieve certainty where others rely on gut instinct
- **The Big Short** - Precision analysis, seeing what others miss, patient conviction
- **Ex Machina** - Clean, minimal, intelligent interfaces

Brand execution quality of:
- **Linear** - Obsessive micro-interactions, dark elegance
- **Stripe** - Data-rich but human, confident restraint
- **Nothing (Tech brand)** - Bold typography, distinctive visual language

## COLOR SYSTEM (MANDATORY - USE THESE EXACT VALUES)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary Dark (Deep Water) | #0A0F1C | --color-deep-water |
| Surface Dark | #111827 | --color-surface |
| Accent Gold (Precision) | #C9A227 | --color-gold |
| Certainty Blue | #2563EB | --color-certainty |
| Proof Green | #10B981 | --color-proof |
| Warning Amber | #F59E0B | --color-warning |
| Text Primary | #F8FAFC | --color-text |
| Text Secondary | #94A3B8 | --color-text-muted |
| Border Subtle | #1F2937 | --color-border |

## TYPOGRAPHY SYSTEM (MANDATORY)

- Headlines: Inter (weight 800, tight letter-spacing: -0.03em)
- Body: Inter (weight 400-500)
- Data/Numbers: JetBrains Mono (for that mathematical precision feel)
- Accent Headlines: Optional use of dramatic weight contrast

## MANDATORY FEATURES TO IMPLEMENT

### Global Elements (present on all pages):
1. **Dual Cursor System** - Small dot (8px) + larger following ring (40px), ring scales to 60px on interactive elements
2. **Geometric Grid Background** - Subtle grid with intersection dots, pulses at key data points
3. **Noise Texture Overlay** - SVG feTurbulence at 0.04 opacity
4. **Navigation** - Sticky, glass-morphism, magnetic menu items
5. **Heron Silhouette** - Subtle SVG in corner, "watches" cursor movement, "strikes" animation on CTA hover

### Page-Specific Features:

#### HOMEPAGE:
1. **Split Hero Concept** - Left side: blurred "uncertainty" state with scattered elements. Right side: crisp "certainty" state with organized data. Dividing line animates on scroll.
2. **Animated Counter Stats** - Leads generated, ROI delivered, clients served - counting up with JetBrains Mono
3. **"Certainty First" Tagline** - Character-by-character reveal with confident timing
4. **Service Cards** - 3D tilt effect, hover spotlight that follows cursor within card
5. **Proof Timeline** - Interactive horizontal scroll showing the journey from uncertainty to guaranteed results
6. **Testimonial Carousel** - Before/after metrics prominently displayed
7. **CTA Sections** - Magnetic buttons, border-draw animation on hover

#### SERVICES PAGES (3 tiers: $1.5K, $5K, $10K+):
1. **Pricing Cards** - "Unlock" animation on hover, reveals full details
2. **Feature Comparison Matrix** - Animated checkmarks that draw in
3. **ROI Calculator** - Interactive sliders showing potential return
4. **Guarantee Badge** - Pulsing glow effect, prominently displayed
5. **Process Timeline** - Step-by-step with connecting lines that draw as you scroll
6. **Case Study Snippets** - Expandable cards with real metrics

#### ABOUT PAGE:
1. **Founder Story Section** - Parallax text reveal
2. **Values Grid** - "Principles of Certainty" - icons that animate on scroll-into-view
3. **Team Cards** - Subtle hover lift, role reveals on hover
4. **Company Timeline** - Vertical scroll with milestone markers
5. **Mission Statement** - Large typography, word-by-word highlight on scroll

#### CONTACT PAGE:
1. **Elegant Form** - Floating labels, focus states with gold accent
2. **Calendar Widget Placeholder** - For booking consultations
3. **Trust Indicators** - Animated badges (guarantee, response time, etc.)
4. **FAQ Preview** - Top 3 questions to reduce friction
5. **Direct Contact Options** - Phone, email with copy-to-clipboard

#### FAQ PAGE:
1. **Search Bar** - With live filtering
2. **Category Tabs** - Smooth transitions between categories
3. **Accordion Items** - Smooth height animation, icon rotation
4. **Related Questions** - "People also asked" suggestions
5. **Still Have Questions CTA** - Prominent contact redirect

#### CLIENT LOGOS PAGE:
1. **Logo Grid** - Infinite marquee animation
2. **Industry Filters** - Toggle to filter by vertical
3. **Hover State** - Logo reveals mini case study card
4. **Stats Overlay** - "X leads delivered" appears on hover
5. **Testimonial Integration** - Clicking logo shows full testimonial

### Signature Interactions (MUST IMPLEMENT):

1. **Magnetic Buttons** - All CTAs have magnetic pull effect (cursor attracts button, elastic snap-back)
2. **Border Draw Hover** - SVG stroke animation on card/button hover
3. **Counter Animation** - Numbers count up when scrolled into view, uses easing
4. **Character Reveal** - Headlines reveal character-by-character with stagger
5. **3D Tilt Cards** - Subtle gyroscope-style rotation following cursor
6. **Proof Meter** - Visual progress bar that fills as user scrolls through proof points
7. **Heron Strike Animation** - SVG heron in corner "strikes" when user hovers main CTA

### Easter Egg:
- Console message: "Looking under the hood? We respect that. We believe in proof too. Let's talk: hello@scaleupventures.com"

## OUTPUT REQUIREMENTS

Create a SINGLE, COMPREHENSIVE HTML document that includes:

1. **Design System Overview** - Visual presentation of colors, typography, spacing
2. **Component Library** - Every component with working code
3. **Page Layouts** - Full mockup sections for all 6 pages
4. **Animation Demos** - Working examples of all interactions
5. **Responsive Considerations** - How elements adapt

The document should be:
- Self-contained (inline CSS, no external dependencies except Google Fonts)
- 1500+ lines of purposeful code
- EVERY feature listed above must be implemented and demonstrable
- Dark theme throughout
- Professional enough to present to a client
- Distinctive enough to win awards

## ANTI-MEDIOCRITY REQUIREMENTS

- If it looks like a template, you have FAILED
- If it could be mistaken for Wix/Squarespace, you have FAILED
- If there's no "wow" moment, you have FAILED
- If the heron doesn't feel alive, you have FAILED
- If the data doesn't feel precise, you have FAILED
- If it doesn't convey CERTAINTY, you have FAILED

## STRUCTURE

Organize the HTML document with clear sections:
1. Design System (colors, type, spacing)
2. Global Components (nav, footer, cursor, background)
3. Homepage Sections
4. Services Page Sections
5. About Page Sections
6. Contact Page Sections
7. FAQ Page Sections
8. Client Logos Page Sections
9. Interactive Demos

Each section should have:
- Visual preview
- Explanation of design rationale
- Working code

ABSOLUTE MAXIMUM CREATIVITY. ZERO RESTRICTIONS. PURE DIGITAL EXCELLENCE.

This document will be used to build a real website. Make it LEGENDARY.
`;

async function generateDesignSystem() {
  console.log('Initializing Gemini with maximum creativity settings...');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 1.0,
      maxOutputTokens: 65536,
      topP: 0.95,
      topK: 40
    }
  });

  console.log('Sending prompt to Gemini...');
  console.log('This may take 2-3 minutes for a comprehensive response...\n');

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Extract HTML from response (remove markdown fences if present)
    let html = text;
    if (text.includes('```html')) {
      html = text.split('```html')[1].split('```')[0];
    } else if (text.includes('```')) {
      html = text.split('```')[1].split('```')[0];
    }

    // Save the output
    const outputPath = path.join(process.cwd(), 'experiments/scaleup-ventures/design-system-v1.html');
    fs.writeFileSync(outputPath, html.trim());

    console.log('Design system generated successfully!');
    console.log(`Saved to: ${outputPath}`);
    console.log(`File size: ${(html.length / 1024).toFixed(1)} KB`);
    console.log(`Approximate lines: ${html.split('\n').length}`);

    return outputPath;
  } catch (error) {
    console.error('Error generating design system:', error);
    throw error;
  }
}

generateDesignSystem();
