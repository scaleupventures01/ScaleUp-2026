#!/usr/bin/env python3
"""
Fix ALL logos across all pages - handles different HTML structures
"""

import os
import re

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

# Official heron SVG - filled silhouette with gold eye
HERON_SVG = '''<svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="heron-icon">
  <path d="M16 1 C18 4 19 7 19 10 C19 13 17 16 18 20 C19 25 18 30 16 35 L14 39 L14 35 C12 30 11 25 12 20 C13 16 11 13 11 10 C11 7 12 4 14 1 Z" fill="currentColor"/>
  <ellipse cx="17" cy="8" rx="4" ry="3" fill="currentColor"/>
  <path d="M21 7 L30 4 L21 8 Z" fill="currentColor"/>
  <path d="M12 18 C8 20 6 25 8 30 C10 28 12 24 12 18 Z" fill="currentColor"/>
  <rect x="13" y="35" width="1.5" height="5" fill="currentColor"/>
  <rect x="16" y="35" width="1.5" height="5" fill="currentColor"/>
  <circle cx="18" cy="7" r="1" fill="#D4A853"/>
</svg>'''

HERON_CSS = '''
        /* Heron Logo Icon */
        .heron-icon {
            width: 32px;
            height: 40px;
            color: currentColor;
            flex-shrink: 0;
            transition: transform 0.3s ease;
        }
        .logo:hover .heron-icon { transform: scale(1.05); }
'''

PAGES = [
    "scaleup-homepage-v1.html",
    "scaleup-about-design.html",
    "scaleup-services-design.html",
    "scaleup-contact-design.html",
    "scaleup-faq-design.html",
    "scaleup-case-studies-design.html",
    "scaleup-testimonials-design.html",
    "scaleup-manifesto-design.html",
    "scaleup-clients-design.html",
    "scaleup-staffing-design.html",
    "scaleup-veterinary-design.html",
    "scaleup-trades-design.html",
    "scaleup-insurance-design.html",
    "scaleup-pestcontrol-design.html",
]

def fix_page(filename):
    """Fix logo in a page"""
    filepath = os.path.join(BASE_PATH, filename)

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # Add heron CSS if not present
    if '.heron-icon' not in html:
        style_end = html.find('</style>')
        if style_end != -1:
            html = html[:style_end] + HERON_CSS + '\n    ' + html[style_end:]

    # Pattern 1: Logo with just text (like homepage-v1)
    # <a href="..." class="logo">ScaleUp<span>.</span></a>
    pattern1 = r'(<a\s+href="[^"]*"\s+class="logo"[^>]*>)\s*ScaleUp\s*(?:<span>\.?</span>)?\s*(</a>)'
    if re.search(pattern1, html):
        html = re.sub(pattern1, rf'\1{HERON_SVG} ScaleUp Ventures\2', html)
        print(f"  Fixed pattern 1 (text-only logo)")

    # Pattern 2: Logo with existing inline SVG (services, etc)
    # <a href="..." class="logo">...<svg>...</svg>...</a>
    pattern2 = r'(<a\s+href="[^"]*"\s+class="logo"[^>]*>)\s*<svg[^>]*>.*?</svg>\s*(ScaleUp[^<]*)?</a>'
    if re.search(pattern2, html, re.DOTALL) and 'heron-icon' not in html[html.find('class="logo"'):html.find('class="logo"')+500]:
        html = re.sub(pattern2, rf'\1{HERON_SVG} ScaleUp Ventures</a>', html, flags=re.DOTALL)
        print(f"  Fixed pattern 2 (inline SVG logo)")

    # Pattern 3: Footer logo div with text only
    pattern3 = r'(<div\s+class="logo"[^>]*>)\s*ScaleUp\s*Ventures\s*(</div>)'
    if re.search(pattern3, html):
        html = re.sub(pattern3, rf'\1{HERON_SVG} ScaleUp Ventures\2', html)
        print(f"  Fixed pattern 3 (footer div logo)")

    # Pattern 4: Span logo with just name
    pattern4 = r'(<span\s+class="[^"]*logo[^"]*"[^>]*>)\s*ScaleUp\s*(?:Ventures)?\s*(</span>)'
    if re.search(pattern4, html):
        html = re.sub(pattern4, rf'\1{HERON_SVG} ScaleUp Ventures\2', html)
        print(f"  Fixed pattern 4 (span logo)")

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    print("=" * 60)
    print("Fixing ALL Logos Across Pages")
    print("=" * 60)

    fixed = 0
    for page in PAGES:
        print(f"\n{page}:")
        filepath = os.path.join(BASE_PATH, page)
        if not os.path.exists(filepath):
            print(f"  SKIP: not found")
            continue

        if fix_page(page):
            fixed += 1
            print(f"  UPDATED")
        else:
            print(f"  No changes needed")

    print(f"\n{'='*60}")
    print(f"Fixed {fixed} pages")

if __name__ == "__main__":
    main()
