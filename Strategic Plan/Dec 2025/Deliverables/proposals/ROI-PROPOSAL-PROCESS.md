# ROI Proposal Creation Process

A repeatable framework for creating client proposals that convert.

---

## Overview

This process was developed while creating the Crawley Mediation Services proposal. It balances professionalism with simplicity, removes buyer risk, and creates urgency without being pushy.

**Time to complete:** 2-3 hours for a polished proposal + email

---

## Phase 1: Discovery & Initial Draft

### Step 1: Gather Client Context
- Client name and company
- Location/market served
- What they do (in plain language)
- Current situation (how they get clients now)
- What they want (growth goal)

### Step 2: Define the Offer
- Service being provided
- Platform/tools used
- Duration/commitment period
- What success looks like

### Step 3: Set Pricing
- Break down costs transparently (ad spend vs. management fee)
- Monthly and total investment
- Compare to industry/competitor pricing

### Step 4: Establish Projections
- Use industry benchmarks
- Create conservative / expected / optimistic scenarios
- Base projections on what YOU control (leads, not revenue)

### Step 5: Create Initial HTML Proposal
- Use professional template with branding
- Include all sections (refine later)
- Make it visually clean - this represents your work quality

---

## Phase 2: Positioning Refinement

### Step 6: Audit Your Commitments
**Ask:** "Am I promising things outside my control?"

| Don't Commit To | Do Commit To |
|-----------------|--------------|
| Revenue/sales | Leads delivered |
| Client's close rate | Ad performance metrics |
| Market conditions | Your management quality |

### Step 7: Restructure Lead vs. Revenue Messaging
- **Section A:** "What We Commit To" (leads - what you control)
- **Section B:** "What This Could Mean For You" (revenue based on THEIR close rate)

This protects you legally and sets honest expectations.

### Step 8: Add Your Guarantee
Make it specific and meaningful:
- What triggers the guarantee? (e.g., "fewer than 18 leads")
- What do they get? (e.g., "refund of management fee")
- What's excluded? (e.g., "ad spend goes to platform regardless")

**Example:** "If we don't deliver at least 18 leads over 3 months, we refund our management fee ($2,250)."

### Step 9: Reorganize for Trust
Move the guarantee EARLY in the proposal (Section 2). This:
- Removes fear before they see the price
- Signals confidence
- Differentiates from competitors who bury terms

---

## Phase 3: Competitive Differentiation

### Step 10: Research Your Positioning
Validate that your approach is actually different:
- What do typical agencies offer?
- What do they charge?
- What are their contract terms?
- Do they offer guarantees?

### Step 11: Add Comparison Table
Show how you're different (be specific, not vague):

| Aspect | Traditional Agency | Your Approach |
|--------|-------------------|---------------|
| Transparency | "Trust us" | Weekly dashboard |
| Contracts | 12 months | 3 months |
| Pricing | $5,000+/month | $1,500/month |
| Accountability | Blame external factors | Refund if no results |

### Step 12: Explain Your "Why"
Add a statement about why you price/operate this way:
> "We believe you shouldn't have to already be big to get help getting bigger."

This builds emotional connection and justifies the value.

---

## Phase 4: Simplification (KISS Review)

### Step 13: Review for Persona Fit
**Ask:** "Is this written for a marketer or for my actual client?"

Most clients are NOT marketers. They want:
- Simple math
- Clear next steps
- Confidence it will work

### Step 14: Create Streamlined Version
Preserve the original, then simplify:
- Remove methodology explanations (they trust you or they don't)
- Remove redundant sections
- Combine where possible
- Reduce tables to essential rows only

### Step 15: Apply KISS Checklist
- [ ] Can they understand it in 5 minutes?
- [ ] Is every section necessary?
- [ ] Are there any marketing buzzwords to remove?
- [ ] Is the math simple enough to verify mentally?
- [ ] Is the next step crystal clear?

---

## Phase 5: Call-to-Action & Delivery

### Step 16: Add Functional CTA
The "Let's Get Started" button should DO something:
```html
<a href="mailto:you@company.com?subject=Ready%20to%20Begin&body=I%27m%20ready%20to%20begin.%20Please%20send%20me%20the%20contract%20and%20invoice.">
  Let's Get Started
</a>
```

### Step 17: Generate PDF Version
Use Chrome headless for consistent rendering:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --disable-gpu \
  --print-to-pdf="output.pdf" \
  --no-margins \
  "file:///path/to/proposal.html"
```

### Step 18: Fix Pagination Issues
Add CSS print rules to prevent awkward page breaks:
```css
@media print {
  .info-box,
  .guarantee-box,
  .data-table,
  .cta-section {
    break-inside: avoid;
  }

  h3, .section-title {
    break-after: avoid;
  }
}
```

---

## Phase 6: Sales Optimization

### Step 19: Assess Objections
Before sending, ask: "What would make them hesitate?"

Common hesitations:
- "That's a lot of money upfront"
- "What if it doesn't work?"
- "I don't understand what I'm getting"
- "Why should I decide now?"

### Step 20: Add Urgency (Genuine)
Don't fake scarcity. Use real timing:
- Seasonal relevance ("January is peak for divorce cases")
- Capacity limits ("I take 2 new clients per month")
- Price increases ("This rate is for early clients")

### Step 21: Make the Abstract Tangible
Define terms your client may not understand:

**Bad:** "You'll receive qualified leads"

**Good:** "A lead is someone who fills out a form saying 'I need help with custody mediation, call me.' You'll get their name, phone number, email, and situation. Real people raising their hand for help."

### Step 22: Add Payment Flexibility
Remove the "all or nothing" barrier:

**Option A: Split Payments**
- $1,500 now, $1,500 in 30 days, $1,500 in 60 days

**Option B: Test the Waters**
- Pay first month, if you hate it after 30 days, stop
- You're out $1,500, not $4,500

### Step 23: Write Email Copy
The email should:
- Hit the key points (investment, guarantee, potential)
- Explain what a lead is
- Create urgency
- Point to the CTA in the PDF
- Include a P.S. with additional hook (price lock, etc.)

---

## Final Deliverables Checklist

- [ ] Original HTML proposal (v1 backup)
- [ ] Streamlined HTML proposal (v2 final)
- [ ] PDF version (for sending)
- [ ] Email copy (to accompany proposal)

---

## Key Principles Summary

| Principle | Application |
|-----------|-------------|
| **KISS** | Remove jargon, simplify tables, fewer sections |
| **Commit to what you control** | Leads, not revenue |
| **Remove risk** | Guarantee + payment options |
| **Create urgency** | Timing, capacity, price locks |
| **Make it tangible** | Define abstract terms clearly |
| **Enable action** | One-click CTA that does something |

---

## Template Files

Reference proposals in this folder:
- `crawley-mediation-roi-proposal.html` - Full version (v1)
- `crawley-mediation-roi-proposal-v2.html` - Streamlined version (v2)
- `crawley-mediation-roi-proposal-v2.pdf` - Final PDF

---

*Process documented: January 2026*
