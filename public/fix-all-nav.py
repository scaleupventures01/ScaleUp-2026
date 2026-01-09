#!/usr/bin/env python3
"""Fix navigation across all ScaleUp design pages"""

import os
import re

PUBLIC_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public"

# Standard navigation HTML
STANDARD_NAV = '''    <nav class="site-nav" style="position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(15,23,41,0.95);backdrop-filter:blur(10px);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;">
        <a href="index.html" style="display:flex;align-items:center;gap:0.5rem;text-decoration:none;">
            <span style="font-family:'Crimson Pro',serif;font-size:1.5rem;font-weight:600;color:#fff;">ScaleUp</span>
            <span style="font-family:'Crimson Pro',serif;font-size:1.5rem;font-weight:600;color:#D4A853;">Ventures</span>
        </a>
        <div style="display:flex;gap:2rem;align-items:center;">
            <a href="scaleup-services-design.html" style="color:#fff;text-decoration:none;font-size:0.9rem;opacity:0.9;">Services</a>
            <a href="scaleup-about-design.html" style="color:#fff;text-decoration:none;font-size:0.9rem;opacity:0.9;">About</a>
            <a href="scaleup-case-studies-design.html" style="color:#fff;text-decoration:none;font-size:0.9rem;opacity:0.9;">Case Studies</a>
            <a href="scaleup-contact-design.html" style="color:#fff;text-decoration:none;font-size:0.9rem;opacity:0.9;">Contact</a>
            <a href="scaleup-contact-design.html" style="background:#D4A853;color:#0F1729;padding:0.5rem 1rem;border-radius:4px;text-decoration:none;font-size:0.85rem;font-weight:500;">Get Started</a>
        </div>
    </nav>
    <div style="height:70px;"></div><!-- Spacer for fixed nav -->'''

PAGES = [
    "scaleup-services-design.html",
    "scaleup-about-design.html",
    "scaleup-case-studies-design.html",
    "scaleup-contact-design.html",
    "scaleup-faq-design.html",
    "scaleup-clients-design.html",
    "scaleup-testimonials-design.html",
    "scaleup-manifesto-design.html",
]

def fix_page(filename):
    filepath = os.path.join(PUBLIC_PATH, filename)

    if not os.path.exists(filepath):
        print(f"  SKIP: {filename} not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Check if we already added the nav
    if 'class="site-nav"' in html:
        print(f"  SKIP: {filename} already has site-nav")
        return False

    # Insert nav right after <body> tag
    body_match = re.search(r'<body[^>]*>', html)
    if body_match:
        insert_pos = body_match.end()
        html = html[:insert_pos] + '\n' + STANDARD_NAV + '\n' + html[insert_pos:]

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  UPDATED: {filename}")
        return True
    else:
        print(f"  ERROR: No <body> tag in {filename}")
        return False

def main():
    print("=" * 60)
    print("Adding Standard Navigation to All Pages")
    print("=" * 60)

    updated = 0
    for page in PAGES:
        print(f"\n{page}:")
        if fix_page(page):
            updated += 1

    print(f"\n{'=' * 60}")
    print(f"Updated {updated} pages with standard navigation")

if __name__ == "__main__":
    main()
