import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const baseContext = `
## BRAND CONTEXT (Same for all pages)
**ScaleUp Ventures** - B2B lead generation with guaranteed results
- Tagline: "Certainty First." / "Know Before You Spend"
- Guarantee: "Guaranteed Leads or Your Money Back"
- Visual Metaphor: The heron - patient, precise, strikes only when certain
- Target: B2B service businesses burned by agencies before

## CINEMATIC ENERGY
- Moneyball, The Big Short, Ex Machina

## BRAND EXECUTION
- Linear, Stripe, Nothing (tech brand)

## COLOR SYSTEM
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

## GLOBAL ELEMENTS (Include on every page)
1. Dual cursor (gold dot + following ring)
2. Geometric grid background
3. Heron silhouette (bottom-right, eyes track cursor)
4. Sticky glass-morphism navigation
5. Magnetic buttons on all CTAs
`;

const pages = [
  {
    name: 'services-page',
    prompt: `
You are creating a LEGENDARY services page for ScaleUp Ventures.

${baseContext}

## SERVICES PAGE SPECIFIC REQUIREMENTS

### Three Service Tiers:

**Tier 1: "Proof Test" - $1,500**
- Perfect for: Skeptical businesses wanting to test the waters
- What's included:
  - Market analysis and opportunity mapping
  - 2-week lead generation pilot
  - ROI projection with real data
  - Dedicated account manager
- CTA: "Test Us Risk-Free"

**Tier 2: "Growth Engine" - $5,000/month**
- Perfect for: Businesses ready to scale consistently
- What's included:
  - Full lead generation system setup
  - Multi-channel campaign management
  - Weekly optimization and reporting
  - Lead qualification and scoring
  - CRM integration
- Guarantee: "25 qualified leads or money back"
- CTA: "Start Scaling"

**Tier 3: "Revenue Partner" - $10,000+/month**
- Perfect for: Businesses wanting a true growth partner
- What's included:
  - Everything in Growth Engine
  - Dedicated strategy team
  - Custom AI-powered lead scoring
  - Sales enablement training
  - Revenue share alignment option
- Guarantee: "50+ qualified leads guaranteed"
- CTA: "Partner With Us"

### Page Sections:

1. **Hero**
   - Headline: "Your Path to Guaranteed Growth"
   - Subhead: "Choose certainty. Choose results you can measure."
   - Visual: Abstract representation of growth trajectory

2. **Service Tier Cards**
   - 3D tilt effect on hover
   - Spotlight follows cursor within each card
   - "Unlock" animation reveals full details on hover
   - Price prominently displayed in JetBrains Mono
   - Features list with animated checkmarks (draw-in effect)
   - Guarantee badge with pulsing glow for Tier 2 and 3

3. **Feature Comparison Matrix**
   - Clean table design
   - Checkmarks animate in when scrolled into view
   - Hover row highlights entire row
   - Sticky header on scroll

4. **Interactive ROI Calculator**
   - Sliders for: Current monthly leads, Average deal size, Close rate
   - Real-time calculation showing potential ROI with each tier
   - Numbers animate when values change
   - "See Your Growth" headline

5. **Process Timeline**
   - Vertical timeline with 5 steps
   - Line draws as you scroll
   - Each step reveals on scroll
   - Icons for each step

6. **Guarantee Section**
   - Large, prominent display
   - Shield icon with glow effect
   - Text: "If we don't deliver the leads we promise, you don't pay. Period."
   - Supporting text about the guarantee terms

7. **Case Study Highlights**
   - 2-3 mini case studies
   - Before/After metrics
   - Industry type
   - Expandable for more details

8. **Final CTA**
   - Headline: "Ready to Stop Guessing?"
   - Two CTAs: "Book a Call" (primary) + "Download Pricing PDF" (secondary)
   - Magnetic button effects

### Technical Requirements:
- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- 800+ lines minimum
- All interactions must work

Output ONLY the complete HTML. No markdown explanation.
`
  },
  {
    name: 'about-page',
    prompt: `
You are creating a STUNNING about page for ScaleUp Ventures.

${baseContext}

## ABOUT PAGE SPECIFIC REQUIREMENTS

### Page Sections:

1. **Hero**
   - Headline: "We Built This for People Like Us"
   - Subhead: "Founders who got burned. Operators who demanded better."
   - Large, impactful typography
   - Subtle parallax text effect

2. **Origin Story Section**
   - Visual storytelling approach
   - Text reveals as you scroll (word-by-word highlight)
   - Story:
     "We started ScaleUp Ventures after watching good businesses fail because bad agencies made empty promises. We were those business owners once—spending money on 'leads' that never converted, reports that meant nothing, and strategies that went nowhere.

     So we built something different. A system where you only pay for results. Where data replaces gut feelings. Where patience and precision beat spray-and-pray tactics.

     Like the heron—we watch, we analyze, we wait for the right moment. Then we strike with certainty."

3. **The Heron Philosophy**
   - Full-width section
   - Large, animated heron illustration (SVG)
   - Three principles displayed:
     1. "Patience over panic" - We take time to understand before acting
     2. "Precision over volume" - Quality leads beat quantity every time
     3. "Proof over promises" - We show results before asking for trust
   - Each principle animates in sequence

4. **Values Grid**
   - "Principles of Certainty"
   - 6 values in 2x3 or 3x2 grid:
     1. Data-Driven Decisions
     2. Radical Transparency
     3. Results First, Always
     4. Client Success = Our Success
     5. Continuous Optimization
     6. Skin in the Game
   - Icons animate on scroll into view
   - Hover reveals more detail

5. **Team Section**
   - "The Minds Behind the Method"
   - Team cards with:
     - Name, Role
     - Brief bio
     - Subtle hover lift effect
     - Optional: fun fact on hover
   - Placeholder content for 4 team members

6. **Company Timeline**
   - Milestones:
     2020: Founded with a mission
     2021: First 100 clients served
     2022: Launched guarantee program
     2023: 10,000+ leads delivered
     2024: Expanded service offerings
     2025: Industry recognition
   - Vertical scroll timeline
   - Lines draw as you scroll

7. **Mission Statement**
   - Large typography section
   - "Our mission is simple: eliminate the guesswork from growth."
   - Word-by-word reveal/highlight on scroll

8. **CTA Section**
   - "Ready to experience the difference?"
   - Primary CTA: "Start Your Proof Test"
   - Secondary: "See Our Results"

### Technical Requirements:
- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- 700+ lines minimum
- All interactions must work

Output ONLY the complete HTML. No markdown explanation.
`
  },
  {
    name: 'contact-page',
    prompt: `
You are creating an EXCEPTIONAL contact page for ScaleUp Ventures.

${baseContext}

## CONTACT PAGE SPECIFIC REQUIREMENTS

### Page Sections:

1. **Hero**
   - Headline: "Let's Talk Certainty"
   - Subhead: "No pressure. No pitch. Just a conversation about what's possible."
   - Clean, inviting design

2. **Contact Form**
   - Elegant floating label design
   - Fields:
     - Full Name (required)
     - Email (required)
     - Company Name
     - Phone Number
     - Monthly Marketing Budget (dropdown: <$5K, $5K-$15K, $15K-$50K, $50K+)
     - Current Challenge (textarea with placeholder: "What's your biggest lead generation challenge right now?")
     - How Did You Hear About Us (dropdown)
   - Gold accent on focus state
   - Submit button with magnetic effect
   - Success state: Animated checkmark + confirmation message

3. **Calendar Widget Placeholder**
   - "Schedule a 15-Minute Discovery Call"
   - Styled placeholder that looks like a calendar embed
   - Text: "Calendly integration - Pick a time that works for you"
   - Mock time slots showing availability

4. **Trust Indicators Row**
   - Response time: "We respond within 2 hours"
   - No obligation: "No commitment required"
   - Privacy: "Your information stays private"
   - Each with an icon and subtle entrance animation

5. **FAQ Preview**
   - "Questions We Hear Most"
   - Top 3 FAQs with accordion:
     1. "What if I've been burned by agencies before?"
     2. "How does the guarantee actually work?"
     3. "How quickly can I see results?"
   - "More Questions?" link to FAQ page

6. **Direct Contact Options**
   - Email: hello@scaleupventures.com (with copy icon)
   - Phone: (555) 123-4567 (with copy icon)
   - Address: (optional, placeholder)
   - Copy-to-clipboard functionality with "Copied!" feedback

7. **Alternative Contact Methods**
   - "Not ready for a call?"
   - Options:
     - Download our capabilities deck
     - See case studies first
     - Subscribe to insights (email capture)

8. **Map/Location (Optional)**
   - If included, styled placeholder
   - Dark theme to match site

### Interactions:
- Form fields have smooth focus transitions
- Labels float up when field is focused or has content
- Validation shows inline (not alert boxes)
- Submit button is disabled until required fields filled
- Copy-to-clipboard shows brief "Copied!" tooltip

### Technical Requirements:
- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- 600+ lines minimum
- All form interactions must work (client-side)

Output ONLY the complete HTML. No markdown explanation.
`
  },
  {
    name: 'faq-page',
    prompt: `
You are creating a COMPREHENSIVE FAQ page for ScaleUp Ventures.

${baseContext}

## FAQ PAGE SPECIFIC REQUIREMENTS

### Page Sections:

1. **Hero**
   - Headline: "Answers to Everything"
   - Subhead: "We believe in transparency. Here's everything you need to know."
   - Search bar with live filtering functionality

2. **Category Tabs**
   - Categories:
     - All Questions
     - Getting Started
     - Pricing & Guarantee
     - Process & Timeline
     - Results & Reporting
   - Smooth tab transitions
   - Active state clearly indicated

3. **FAQ Accordion**
   - Smooth height animation
   - Icon rotates on open/close (+/-)
   - Only one item open at a time
   - Category labels on each item

   **Getting Started:**
   - Q: "What types of businesses do you work with?"
     A: "We specialize in B2B service businesses—agencies, consultancies, SaaS companies, professional services, and any business selling high-value services or products to other businesses. If your average deal size is $5,000 or more, we can likely help."

   - Q: "What if I've been burned by marketing agencies before?"
     A: "You're our ideal client. Seriously. Our entire model was built for skeptics. That's why we offer the Proof Test—a low-risk way to see real results before committing to anything bigger. We know you've heard promises before. We prefer to show you proof."

   - Q: "How long does it take to get started?"
     A: "Most clients are up and running within 2 weeks. Week 1 is discovery and strategy. Week 2 is setup and launch. By week 3, you're typically seeing your first leads."

   **Pricing & Guarantee:**
   - Q: "How does the money-back guarantee work?"
     A: "It's simple: if we don't deliver the minimum number of qualified leads specified in your agreement, you don't pay for that period. For our Growth Engine tier, that's 25 leads. For Revenue Partner, it's 50+. We track everything transparently so there's never any ambiguity."

   - Q: "What counts as a 'qualified lead'?"
     A: "We define this together during onboarding. Typically, a qualified lead meets criteria like: correct industry, appropriate company size, identified decision-maker, expressed genuine interest. We won't count tire-kickers or irrelevant contacts."

   - Q: "Are there any hidden fees?"
     A: "None. The price you see is the price you pay. Ad spend is separate and goes directly to the platforms (Google, LinkedIn, etc.), but we're transparent about expected ad budgets during our initial conversation."

   **Process & Timeline:**
   - Q: "What does the process look like?"
     A: "Step 1: Discovery call to understand your business. Step 2: Market analysis and strategy development. Step 3: Campaign setup and launch. Step 4: Optimization and scaling. Step 5: Ongoing reporting and refinement. You're involved at every stage."

   - Q: "How much of my time will this require?"
     A: "Minimal after the initial onboarding. Expect 1-2 hours in the first two weeks for discovery and feedback. After that, most clients spend 30 minutes per week reviewing reports and providing input on lead quality."

   - Q: "Do you work with my existing CRM?"
     A: "Yes. We integrate with all major CRMs including HubSpot, Salesforce, Pipedrive, and others. If you're using something more niche, we'll figure out a solution."

   **Results & Reporting:**
   - Q: "How will I see results?"
     A: "You'll have access to a real-time dashboard showing leads, sources, costs, and conversion data. We also provide weekly summary reports and monthly strategy reviews. No black boxes—you see everything we see."

   - Q: "When can I expect to see ROI?"
     A: "Most clients see positive ROI within 60-90 days. The Proof Test is specifically designed to demonstrate ROI potential within 2 weeks. However, lead generation is an investment—the real compound returns come from consistent optimization over 3-6 months."

   - Q: "What if the leads aren't converting to sales?"
     A: "Lead quality is our primary focus, but we also look at your sales process. If leads aren't converting, we'll work with you to identify whether it's a lead quality issue, a sales process issue, or something else. We're partners, not just vendors."

4. **Related Questions**
   - "People also asked" section
   - Shows questions related to currently viewed question
   - Dynamic based on category

5. **Still Have Questions CTA**
   - Prominent section at bottom
   - "Didn't find what you're looking for?"
   - CTA: "Contact Us Directly"
   - Secondary: "Schedule a Call"

6. **Search Functionality**
   - Filters questions in real-time as user types
   - Highlights matching text
   - Shows "No results" message if nothing matches

### Technical Requirements:
- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- 800+ lines minimum
- Search and accordion must work

Output ONLY the complete HTML. No markdown explanation.
`
  },
  {
    name: 'client-logos-page',
    prompt: `
You are creating a STUNNING client logos/social proof page for ScaleUp Ventures.

${baseContext}

## CLIENT LOGOS PAGE SPECIFIC REQUIREMENTS

### Page Sections:

1. **Hero**
   - Headline: "Trusted by Leaders Who Demand Results"
   - Subhead: "Join 500+ businesses who chose certainty over hope."
   - Counter showing total clients and leads delivered

2. **Logo Marquee**
   - Infinite horizontal scroll animation
   - Two rows scrolling in opposite directions
   - Logos in grayscale by default
   - Colorize on hover
   - Pause animation on hover
   - Use placeholder company names styled as logos:
     - TechFlow Solutions
     - Apex Consulting
     - Meridian Partners
     - Velocity Group
     - Summit Digital
     - Horizon Advisors
     - Catalyst Systems
     - Pinnacle Services
     - Nexus Corp
     - Forge Industries
     - Atlas Solutions
     - Quantum Edge

3. **Industry Filters**
   - Filter buttons:
     - All Industries
     - Technology
     - Professional Services
     - Healthcare
     - Financial Services
     - Manufacturing
   - Smooth filter transitions
   - Count badge showing number of clients per industry

4. **Featured Client Cards**
   - 6 cards in a grid
   - Each card shows:
     - Company "logo" (text-based)
     - Industry tag
     - Key metric: "X leads delivered"
     - Brief quote/testimonial snippet
   - Hover reveals:
     - Full testimonial
     - "View Case Study" link
   - 3D tilt effect on hover

5. **By The Numbers**
   - Large stat display:
     - 500+ Clients Served
     - 50,000+ Leads Delivered
     - 98% Client Retention
     - $25M+ Revenue Generated for Clients
   - Animated counters on scroll into view
   - JetBrains Mono font for numbers

6. **Testimonial Spotlight**
   - Featured testimonial in large format
   - Client photo placeholder
   - Name, title, company
   - Before/After metrics prominently displayed
   - Auto-rotate or manual navigation

7. **Industry Breakdown**
   - Visual chart/graph showing client distribution by industry
   - Animated on scroll
   - Hover shows percentages

8. **CTA Section**
   - "Ready to Join Our Success Stories?"
   - Primary CTA: "Become Our Next Case Study"
   - Trust indicator: "Join 500+ satisfied clients"

### Interactions:
- Logo marquee smooth infinite scroll
- Filters animate logos in/out
- Cards have magnetic hover effect
- Counters animate when scrolled into view
- Testimonial auto-rotation (with pause on hover)

### Technical Requirements:
- Single self-contained HTML file
- All CSS inline in <style> tags
- All JavaScript inline in <script> tags
- Google Fonts: Inter + JetBrains Mono
- 700+ lines minimum
- All interactions must work

Output ONLY the complete HTML. No markdown explanation.
`
  }
];

async function generatePage(pageConfig) {
  console.log(`\nGenerating ${pageConfig.name}...`);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    generationConfig: {
      temperature: 1.0,
      maxOutputTokens: 65536,
      topP: 0.95,
      topK: 40
    }
  });

  try {
    const result = await model.generateContent(pageConfig.prompt);
    const response = result.response;
    const text = response.text();

    // Extract HTML from response
    let html = text;
    if (text.includes('```html')) {
      html = text.split('```html')[1].split('```')[0];
    } else if (text.includes('```')) {
      const parts = text.split('```');
      if (parts.length >= 2) {
        html = parts[1];
        if (html.startsWith('html\n')) {
          html = html.substring(5);
        }
      }
    }

    const outputPath = path.join(process.cwd(), `experiments/scaleup-ventures/${pageConfig.name}.html`);
    fs.writeFileSync(outputPath, html.trim());

    console.log(`  Saved: ${outputPath}`);
    console.log(`  Size: ${(html.length / 1024).toFixed(1)} KB`);
    console.log(`  Lines: ${html.split('\n').length}`);

    return outputPath;
  } catch (error) {
    console.error(`  Error generating ${pageConfig.name}:`, error.message);
    return null;
  }
}

async function generateAllPages() {
  console.log('===========================================');
  console.log('SCALEUP VENTURES - PAGE GENERATION');
  console.log('===========================================');

  const results = [];

  for (const page of pages) {
    const result = await generatePage(page);
    results.push({ name: page.name, path: result });

    // Small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n===========================================');
  console.log('GENERATION COMPLETE');
  console.log('===========================================');
  console.log('\nGenerated files:');
  results.forEach(r => {
    if (r.path) {
      console.log(`  ✓ ${r.name}`);
    } else {
      console.log(`  ✗ ${r.name} (failed)`);
    }
  });
}

generateAllPages();
