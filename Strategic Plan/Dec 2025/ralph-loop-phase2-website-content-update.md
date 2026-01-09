# Ralph Loop: Phase 2 - Website Content & Visual Update

## Mission
Update all website pages to reflect the new 30-55 growth-focused audience mindset AND apply visual updates from the Brand Refresh Manifesto. This is a dual-track update: content alignment + design modernization.

---

## Reference Standards

### Primary References
1. **BRAND-REFRESH-MANIFESTO.md** - Visual/CSS update guidelines
   - Location: `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/BRAND-REFRESH-MANIFESTO.md`

2. **Phase 1 Brand Strategy Documents** - Content alignment source
   - Location: `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Brand Strategy/`
   - Key files: `06-messaging-architecture.md`, `07-brand-voice-guidelines.md`

---

## Target Files (14 Website Pages)

### Core Website Pages
| # | File | Location |
|---|------|----------|
| 1 | scaleup-homepage-v1.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-homepage-v1.html` |
| 2 | scaleup-services-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-services-design.html` |
| 3 | scaleup-about-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-about-design.html` |
| 4 | scaleup-case-studies-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-case-studies-design.html` |
| 5 | scaleup-contact-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-contact-design.html` |
| 6 | scaleup-faq-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-faq-design.html` |
| 7 | scaleup-clients-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-clients-design.html` |
| 8 | scaleup-testimonials-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-testimonials-design.html` |
| 9 | scaleup-manifesto-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-manifesto-design.html` |

### Industry Landing Pages
| # | File | Location |
|---|------|----------|
| 10 | scaleup-staffing-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-staffing-design.html` |
| 11 | scaleup-veterinary-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-veterinary-design.html` |
| 12 | scaleup-trades-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-trades-design.html` |
| 13 | scaleup-insurance-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-insurance-design.html` |
| 14 | scaleup-pestcontrol-design.html | `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/scaleup-pestcontrol-design.html` |

---

## TRACK A: Content Alignment

### Content Transformation Matrix

| Dimension | OLD (Remove) | NEW (Apply) |
|-----------|--------------|-------------|
| **Age References** | 50-65, 55+, older | 30-55, growth-stage |
| **Primary Motivation** | Fear of being left behind, Exit planning | Growth & competitive edge, Scaling |
| **Tech Relationship** | Technology laggards, Can't do it themselves | Technology-cautious, Time-poor, Strategic delegators |
| **Business Mode** | Winding down, Legacy, Retirement | Building/scaling, Market expansion |
| **Pain Points** | "Burned by consultants", Fear | "Too busy to implement", Opportunity cost |
| **Decision Style** | Risk-averse | Data-driven, Want proof |
| **Success Metric** | Stability, Not losing | Growth rate, Competitive advantage, ROI |

### Content Phrases to FIND and REPLACE

| Find (Old Audience) | Replace With (New Audience) |
|---------------------|----------------------------|
| "You've been burned by agencies" | "You want to see proof before you commit" |
| "technology laggards" | "growth-stage owners" |
| "can't modernize themselves" | "too time-constrained to implement" |
| "I've been burned before" | "I need to see the numbers first" |
| "fear of technology" | "focused on what matters" |
| "exit planning" | "growth planning" |
| "sell for more later" | "scale faster now" |
| "modernize or be left behind" | "capture opportunity before competitors" |
| "decades of hard work" | "building something valuable" |
| "didn't grow up with technology" | "too busy running operations" |
| "hand-holding" | "execution capacity" |

### PRESERVE These Elements
- "We Prove It Before You Buy" / Proof Test positioning
- ROI-first messaging
- Premium pricing justification
- Case study evidence
- Specific numbers and data points

---

## TRACK B: Visual Updates

### CSS Changes Required (Per Brand Refresh Manifesto)

#### Hero Headlines
```css
/* OLD */
.hero-headline { font-size: 64px; }

/* NEW */
.hero-headline { font-size: 72px; } /* Minimum 72px, up to 96px */
```

#### Buttons
```css
/* OLD */
.btn-primary {
    border-radius: 2-4px;
    /* No shadow */
}

/* NEW */
.btn-primary {
    padding: 18px 40px;
    border-radius: 10-12px;
    box-shadow: 0 4px 12px rgba(212, 168, 83, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 168, 83, 0.4);
}
```

#### Cards
```css
/* OLD */
.card {
    border-radius: 4px;
    /* Flat */
}

/* NEW */
.card {
    padding: 48px;
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 41, 0.06);
    box-shadow: 0 2px 8px rgba(15, 23, 41, 0.04),
                0 8px 24px rgba(15, 23, 41, 0.06);
}
```

#### Animations
```css
/* ADD to sections */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.section { animation: fadeInUp 0.8s ease-out; }
```

### Visual Checklist Per Page

#### REMOVE
- [ ] Tiny border-radius (2-4px)
- [ ] Flat buttons with no shadow
- [ ] Static pages with zero animation
- [ ] Circle outline step numbers
- [ ] UPPERCASE pill labels with wide letter-spacing
- [ ] Design annotation text visible in UI

#### ADD
- [ ] 72px+ hero headlines
- [ ] 10-12px button border-radius
- [ ] Layered shadows on cards
- [ ] Subtle fade-in animations
- [ ] Hover states with personality (transform + shadow)
- [ ] 18px+ body text

---

## Execution Process

```
FOR each page (1-14):
    1. Read current page HTML
    2. TRACK A - Content Alignment:
       a. Identify old-audience language
       b. Replace with new-audience framing
       c. Verify proof-first positioning preserved
    3. TRACK B - Visual Updates:
       a. Check hero headline size (72px+)
       b. Update button styles (radius, shadow, hover)
       c. Update card styles (radius, shadow)
       d. Add fade-in animations
       e. Verify body text 18px+
    4. Write updated HTML
    5. Log changes made
    6. Mark page complete
END FOR
```

---

## Priority Order

### Tier 1: High-Traffic Pages (Do First)
1. Homepage (`scaleup-homepage-v1.html`)
2. Services (`scaleup-services-design.html`)
3. About (`scaleup-about-design.html`)
4. Contact (`scaleup-contact-design.html`)

### Tier 2: Conversion Pages
5. Case Studies (`scaleup-case-studies-design.html`)
6. Testimonials (`scaleup-testimonials-design.html`)
7. FAQ (`scaleup-faq-design.html`)

### Tier 3: Industry Landing Pages
8. Staffing (`scaleup-staffing-design.html`)
9. Veterinary (`scaleup-veterinary-design.html`)
10. Trades (`scaleup-trades-design.html`)
11. Insurance (`scaleup-insurance-design.html`)
12. Pest Control (`scaleup-pestcontrol-design.html`)

### Tier 4: Supporting Pages
13. Clients (`scaleup-clients-design.html`)
14. Manifesto (`scaleup-manifesto-design.html`)

---

## Definition of Done

A page is COMPLETE when:

### Content Alignment
- [ ] All old-audience language replaced with new-audience framing
- [ ] No "burned by agencies", "technology laggard", "55+", "exit planning" language
- [ ] Growth/scaling motivation prominent
- [ ] Time-constrained (not tech-incompetent) positioning
- [ ] Proof-first messaging preserved

### Visual Updates
- [ ] Hero headline 72px minimum
- [ ] All buttons have 10-12px radius + shadow + hover animation
- [ ] All cards have 16px radius + layered shadow
- [ ] Fade-in animation on sections
- [ ] Body text 18px minimum
- [ ] No dated patterns from REMOVE checklist

---

## Success Criteria

### Phase 2 is SUCCESSFUL when:

1. **All 14 pages updated** with both content and visual changes
2. **Zero old-audience content markers remain**:
   - No "burned by agencies" language
   - No "technology laggard" terminology
   - No 50-65/55+ age references
   - No fear/exit motivation framing
3. **New audience psychology dominant**:
   - Growth & competitive edge motivation
   - Time-poor (not tech-poor) positioning
   - Scaling/building narrative
4. **Visual updates complete**:
   - All heroes 72px+
   - All buttons modernized
   - All cards have depth
   - Animations present
5. **Proof-first positioning intact**:
   - "We Prove It Before You Buy" messaging preserved
   - ROI focus maintained
   - Results-focused approach evident

---

## Validation Checklist

After all 14 pages are complete, run these verification checks:

```bash
# Content alignment - should return 0 results
grep -ri "burned by agencies\|technology laggard\|55-65\|50-65\|can't modernize" public/scaleup-*.html

# Visual check - should return results showing 72px+ fonts
grep -ri "font-size.*7[2-9]px\|font-size.*[89][0-9]px" public/scaleup-*.html

# Button radius check - should show 10-12px values
grep -ri "border-radius.*1[0-2]px" public/scaleup-*.html
```

---

## Completion Promise

When Phase 2 is complete, output:

```
<promise>PHASE2_WEBSITE_CONTENT_UPDATE_COMPLETE</promise>
```

This signals readiness for user review before proceeding to Phase 3.

---

## Notes

- Each page requires BOTH content and visual updates
- Test pages in browser after updates to verify visual changes render correctly
- Preserve all functional elements (forms, links, navigation)
- Maintain consistent styling across all pages
- When in doubt, ask: "Would a 40-year-old CEO scaling their company find this compelling?"

---

## Appendix: Quick Reference

### The Audience Shift Summary

**OLD Audience (50-65):**
- "I've been burned before"
- "I don't understand technology"
- "Help me exit gracefully"
- "Don't let me fall behind"

**NEW Audience (30-55):**
- "Show me the ROI"
- "I'm too busy to implement this myself"
- "Help me scale faster"
- "Help me beat my competition"

### The Visual Shift Summary

**OLD Design (2018-2020):**
- Safe, flat, timid
- 2-4px radius, no shadows
- Static, no animation
- Professional but boring

**NEW Design (2025-2026):**
- Confident, deep, bold
- 10-16px radius, layered shadows
- Subtle animations, engaging hovers
- Premium and memorable
