#!/usr/bin/env python3
"""
Add the OFFICIAL ScaleUp Ventures heron logo (PNG) to all design pages.
Uses the actual heron-02-elegant-standing.png image.
"""

import os
import re

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

# Official logo as base64 (resized to 200px for header use)
LOGO_BASE64 = "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"

# CSS for the logo image
LOGO_CSS = '''
        /* Official Heron Logo */
        .heron-logo-img {
            height: 40px;
            width: auto;
            flex-shrink: 0;
            transition: transform 0.3s ease;
        }
        .logo:hover .heron-logo-img { transform: scale(1.05); }

        /* Footer logo smaller */
        footer .heron-logo-img,
        .footer .heron-logo-img {
            height: 60px;
        }
'''

# Logo HTML element
LOGO_IMG = f'<img src="data:image/jpeg;base64,{LOGO_BASE64}" alt="ScaleUp Ventures" class="heron-logo-img">'

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

    # Add logo CSS if not present
    if '.heron-logo-img' not in html:
        style_end = html.find('</style>')
        if style_end != -1:
            html = html[:style_end] + LOGO_CSS + '\n    ' + html[style_end:]

    # Remove any previous heron-icon SVG attempts
    html = re.sub(r'<svg[^>]*class="heron-icon"[^>]*>.*?</svg>\s*', '', html, flags=re.DOTALL)

    # Remove old heron CSS
    html = re.sub(r'/\* Heron Logo Icon \*/.*?\.logo:hover \.heron-icon \{[^}]+\}\s*', '', html, flags=re.DOTALL)

    # Pattern 1: Logo anchor with text (like homepage-v1)
    # <a href="..." class="logo">ScaleUp<span>.</span></a>
    pattern1 = r'(<a\s+[^>]*class="logo"[^>]*>)\s*(?:ScaleUp\s*(?:<span>\.?</span>)?|ScaleUp\s*Ventures)\s*(</a>)'
    if re.search(pattern1, html):
        html = re.sub(pattern1, rf'\1{LOGO_IMG}\2', html)
        print(f"  Fixed pattern 1 (anchor logo)")

    # Pattern 2: Logo with existing SVG
    pattern2 = r'(<a\s+[^>]*class="logo"[^>]*>)\s*<svg[^>]*>.*?</svg>\s*(?:ScaleUp[^<]*)?(</a>)'
    if re.search(pattern2, html, re.DOTALL):
        html = re.sub(pattern2, rf'\1{LOGO_IMG}\2', html, flags=re.DOTALL)
        print(f"  Fixed pattern 2 (SVG logo)")

    # Pattern 3: Footer logo div
    pattern3 = r'(<div\s+[^>]*class="logo"[^>]*>)\s*(?:ScaleUp\s*Ventures|<svg[^>]*>.*?</svg>\s*ScaleUp\s*Ventures)\s*(</div>)'
    if re.search(pattern3, html, re.DOTALL):
        html = re.sub(pattern3, rf'\1{LOGO_IMG}\2', html, flags=re.DOTALL)
        print(f"  Fixed pattern 3 (footer div)")

    # Pattern 4: Already has the old heron-logo-img but wrong src
    if 'heron-logo-img' in html and LOGO_BASE64[:50] not in html:
        html = re.sub(r'<img[^>]*class="heron-logo-img"[^>]*/>', LOGO_IMG, html)
        print(f"  Fixed pattern 4 (updated img src)")

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    print("=" * 60)
    print("Adding OFFICIAL Heron Logo (PNG) to All Pages")
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
            print(f"  No changes needed or already has logo")

    print(f"\n{'='*60}")
    print(f"Fixed {fixed} pages with official heron logo")

if __name__ == "__main__":
    main()
