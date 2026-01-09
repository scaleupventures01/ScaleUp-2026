# ScaleUp Ventures Website Audit - Ralph Loop Prompt

## COMMAND TO RUN
```bash
/ralph-loop ralph-loop-website-audit.md --max-iterations 25 --completion-promise "AUDIT_COMPLETE"
```

---

## MISSION
Systematically audit all 9 ScaleUp Ventures website pages at BOTH desktop (1440x900) and mobile (375x812) viewports using headed Playwright browser. Document all issues in WEBSITE-AUDIT-REPORT.md.

## COMPLETION CRITERIA
Output `<promise>AUDIT_COMPLETE</promise>` ONLY when:
- [ ] All 9 pages audited at desktop viewport
- [ ] All 9 pages audited at mobile viewport
- [ ] All screenshots saved to /tmp/
- [ ] WEBSITE-AUDIT-REPORT.md contains findings for all pages
- [ ] Summary section added with issue counts and priority list

## PAGES TO AUDIT (track progress)
| # | Page | Desktop | Mobile | Documented |
|---|------|---------|--------|------------|
| 1 | scaleup-homepage-v1.html | [ ] | [ ] | [ ] |
| 2 | scaleup-services-design.html | [ ] | [ ] | [ ] |
| 3 | scaleup-about-design.html | [ ] | [ ] | [ ] |
| 4 | scaleup-case-studies-design.html | [ ] | [ ] | [ ] |
| 5 | scaleup-contact-design.html | [ ] | [ ] | [ ] |
| 6 | scaleup-faq-design.html | [ ] | [ ] | [ ] |
| 7 | scaleup-clients-design.html | [ ] | [ ] | [ ] |
| 8 | scaleup-testimonials-design.html | [ ] | [ ] | [ ] |
| 9 | scaleup-manifesto-design.html | [ ] | [ ] | [ ] |

## BASE URL
https://scaleupventures.vercel.app/

## PHASE 1: Setup (Iteration 1)
1. Create initial WEBSITE-AUDIT-REPORT.md at:
   `/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/WEBSITE-AUDIT-REPORT.md`
2. Add header with audit date and overview
3. Proceed to Phase 2

## PHASE 2: Audit Each Page (Iterations 2-19)
For EACH page, execute in order:

### Step A: Desktop Audit
```python
# Playwright script pattern
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("https://scaleupventures.vercel.app/[pagename]")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="/tmp/audit-[pagename]-desktop.png", full_page=True)
```

### Step B: Mobile Audit
```python
    page.set_viewport_size({"width": 375, "height": 812})
    page.reload()
    page.wait_for_load_state('networkidle')
    page.screenshot(path="/tmp/audit-[pagename]-mobile.png", full_page=True)
    browser.close()
```

### Step C: Review Screenshots & Check

**Desktop Checklist:**
- Navigation: Logo→index.html, Services, About, Case Studies, Contact, Get Started (gold)
- Images: All load, no AI artifacts (extra fingers, warped text, distorted faces)
- Content: No lorem ipsum, no placeholder text, real contact info
- Layout: No overlaps, readable text, no horizontal scroll

**Mobile Checklist:**
- Navigation: Logo visible, hamburger menu works, all links accessible
- Images: Scale properly, no overflow
- Content: Readable without zoom (16px min), no cutoff text
- Layout: Single column, no horizontal scroll, 44px touch targets

### Step D: Document in WEBSITE-AUDIT-REPORT.md
```markdown
## [Page Name]
**URL:** [full URL]
**Desktop Screenshot:** /tmp/audit-[pagename]-desktop.png
**Mobile Screenshot:** /tmp/audit-[pagename]-mobile.png

### Desktop Issues
- [CRITICAL/WARNING/INFO] Description

### Mobile Issues
- [CRITICAL/WARNING/INFO] Description

### Recommendations
1. Fix description
---
```

### Step E: Move to Next Page
Repeat Steps A-D for next unchecked page.

## PHASE 3: Summary (Iteration 20+)
After all 9 pages documented, add to WEBSITE-AUDIT-REPORT.md:

```markdown
# AUDIT SUMMARY

## Overview
- Total Pages: 9
- Viewports: Desktop (1440x900), Mobile (375x812)
- Date: [timestamp]

## Results
| Severity | Desktop | Mobile |
|----------|---------|--------|
| Critical | [count] | [count] |
| Warning | [count] | [count] |
| Info | [count] | [count] |

## Priority Fix List
### Critical (Fix Immediately)
1. [Issue] - [page] - [viewport]

### High Priority
1. [Issue] - [page] - [viewport]

### Medium Priority
1. [Issue] - [page] - [viewport]
```

Then output: `<promise>AUDIT_COMPLETE</promise>`

## KNOWN ISSUES TO VERIFY
These were identified in prior work - confirm if fixed or still present:
1. Homepage logo links to scaleup-homepage-v1.html (should be index.html)
2. Contact page SVG overlay blocks logo click
3. Case Studies missing Services/About nav links
4. FAQ page has minimal navigation
5. Testimonials/Manifesto missing home links
6. Mobile hamburger menu may not exist on all pages

## SEVERITY DEFINITIONS
- **CRITICAL:** Broken functionality, missing nav, broken images, unusable
- **WARNING:** Inconsistent nav, AI artifacts, layout issues, poor mobile UX
- **INFO:** Polish items, nice-to-haves

## BRAND REQUIREMENTS
- Navy: #0F1729
- Gold: #D4A853
- Name: "ScaleUp Ventures" (correct spelling)

## ESCAPE HATCH
If stuck after 20 iterations:
1. Document what's blocking progress
2. List pages completed vs remaining
3. Output `<promise>AUDIT_COMPLETE</promise>` with partial results noted

## SELF-CORRECTION
If a screenshot fails:
1. Check URL is correct
2. Increase wait time
3. Try again
4. If still fails, document as "Screenshot failed" and continue to next page
