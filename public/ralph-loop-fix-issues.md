# ScaleUp Ventures - Fix 10 Issues

## RUN THIS COMMAND
```
/ralph-loop ralph-loop-fix-issues.md --max-iterations 30 --completion-promise "ALL_10_FIXES_VERIFIED"
```

## WORKING DIRECTORY
`/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public/`

## COMPLETION PROMISE
Output `<promise>ALL_10_FIXES_VERIFIED</promise>` ONLY when ALL 10 fixes are implemented AND verified with headed Playwright browser.

---

## THE 10 FIXES

| # | Fix | File(s) | How to Verify |
|---|-----|---------|---------------|
| 1 | Change logo href from `scaleup-homepage-v1.html` to `index.html` | `scaleup-homepage-v1.html` | Click logo → URL is index.html |
| 2 | Add nav links: About, Case Studies, Contact | `scaleup-homepage-v1.html` | 5 nav links visible (Services, About, Case Studies, Contact, Get Started) |
| 3 | Delete visible text: `#0F1729`, `#D4A853`, `#FAF8F5`, `SVG` | `scaleup-contact-design.html`, `scaleup-clients-design.html` | No hex codes or "SVG" visible on page |
| 4 | Fix mobile horizontal overflow with CSS | `scaleup-homepage-v1.html`, `scaleup-testimonials-design.html`, `scaleup-manifesto-design.html` | At 375px: `document.body.scrollWidth <= 375` |
| 5 | Fix SVG blocking logo click with `pointer-events: none` | `scaleup-contact-design.html` | Logo clickable without Playwright `force=True` |
| 6 | Fix nav text overlap with spacing/padding | `scaleup-faq-design.html`, `scaleup-clients-design.html` | All nav items readable, no overlap |
| 7 | Make client logo bar responsive (flex-wrap or overflow-x:auto) | `scaleup-testimonials-design.html` | At 375px: logos wrap or scroll, no page overflow |
| 8 | Replace broken Unsplash image URLs | `scaleup-services-design.html`, `scaleup-case-studies-design.html` | All images load (no broken icons) |
| 9 | Add hamburger menu for mobile (<768px) | ALL 9 HTML files | At 375px: hamburger icon visible, click opens nav |
| 10 | Fix hero headline cutoff | `scaleup-testimonials-design.html` | Full headline text visible |

---

## WORKFLOW

For EACH fix:
1. **READ** the file
2. **EDIT** to fix the issue
3. **DEPLOY** → `vercel --prod --yes`
4. **VERIFY** with headed Playwright browser (headless=False)
5. **SCREENSHOT** as proof → `/tmp/verify-fix{N}.png`
6. If FAIL → go back to step 2
7. If PASS → next fix

---

## VERIFICATION CODE

```python
from playwright.sync_api import sync_playwright
import time

BASE_URL = "https://scaleupventures.vercel.app"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=500)

    # Mobile viewport
    context = browser.new_context(viewport={"width": 375, "height": 812})
    page = context.new_page()
    page.goto(f"{BASE_URL}/scaleup-homepage-v1.html")
    page.wait_for_load_state('networkidle')

    # Check overflow
    width = page.evaluate('document.body.scrollWidth')
    print(f"Body width: {width}px (should be ≤375)")

    # Check hamburger
    hamburger = page.locator('.hamburger, .menu-toggle, [class*="mobile-menu"]')
    print(f"Hamburger found: {hamburger.count() > 0}")

    page.screenshot(path="/tmp/verify-mobile.png", full_page=True)
    browser.close()
```

---

## RULES

1. NEVER claim done without visual Playwright verification
2. ALWAYS deploy to Vercel before testing (test live site)
3. ALWAYS use headed browser (headless=False)
4. Take screenshots as proof
5. Fix regressions before moving on

---

## PROGRESS TRACKER

| # | Implemented | Deployed | Verified |
|---|-------------|----------|----------|
| 1 | [ ] | [ ] | [ ] |
| 2 | [ ] | [ ] | [ ] |
| 3 | [ ] | [ ] | [ ] |
| 4 | [ ] | [ ] | [ ] |
| 5 | [ ] | [ ] | [ ] |
| 6 | [ ] | [ ] | [ ] |
| 7 | [ ] | [ ] | [ ] |
| 8 | [ ] | [ ] | [ ] |
| 9 | [ ] | [ ] | [ ] |
| 10 | [ ] | [ ] | [ ] |

---

## DONE WHEN

All boxes checked above AND final test passes:
- All 9 pages load
- No mobile overflow on any page
- Hamburger menu works on all pages
- All images load
- No annotation text visible

Then output: `<promise>ALL_10_FIXES_VERIFIED</promise>`
