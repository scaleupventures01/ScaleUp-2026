#!/usr/bin/env python3
"""Remove duplicate nav and fix existing nav links"""

import os
import re

PUBLIC_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/public"

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

# Navigation link replacements
NAV_REPLACEMENTS = [
    # Fix home/logo links
    (r'href="scaleup-homepage-v1.html"', 'href="index.html"'),
    (r'href="scaleup-homepage-final.html"', 'href="index.html"'),
    (r'href="#"', 'href="index.html"'),

    # Fix anchor links to actual pages
    (r'href="#about"', 'href="scaleup-about-design.html"'),
    (r'href="#services"', 'href="scaleup-services-design.html"'),
    (r'href="#contact"', 'href="scaleup-contact-design.html"'),
    (r'href="#case-studies"', 'href="scaleup-case-studies-design.html"'),
    (r'href="#faq"', 'href="scaleup-faq-design.html"'),
]

def fix_page(filename):
    filepath = os.path.join(PUBLIC_PATH, filename)

    if not os.path.exists(filepath):
        print(f"  SKIP: {filename} not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # Remove the site-nav we added earlier
    site_nav_pattern = r'<nav class="site-nav"[^>]*>.*?</nav>\s*<div style="height:70px;"></div><!-- Spacer for fixed nav -->'
    html = re.sub(site_nav_pattern, '', html, flags=re.DOTALL)

    # Apply navigation link fixes
    for pattern, replacement in NAV_REPLACEMENTS:
        html = re.sub(pattern, replacement, html)

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  UPDATED: {filename}")
        return True
    else:
        print(f"  No changes: {filename}")
        return False

def main():
    print("=" * 60)
    print("Fixing Navigation (Remove Duplicates, Fix Links)")
    print("=" * 60)

    updated = 0
    for page in PAGES:
        print(f"\n{page}:")
        if fix_page(page):
            updated += 1

    print(f"\n{'=' * 60}")
    print(f"Updated {updated} pages")

if __name__ == "__main__":
    main()
