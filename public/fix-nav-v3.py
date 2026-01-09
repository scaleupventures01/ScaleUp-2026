#!/usr/bin/env python3
"""Replace nav-menu contents with standard links across all pages"""

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

# Standard nav list items
STANDARD_NAV_ITEMS = '''<li><a href="scaleup-services-design.html" class="nav-link data-hover">Services</a></li>
                <li><a href="scaleup-about-design.html" class="nav-link data-hover">About</a></li>
                <li><a href="scaleup-case-studies-design.html" class="nav-link data-hover">Case Studies</a></li>
                <li><a href="scaleup-contact-design.html" class="nav-link data-hover">Contact</a></li>
                <li><a href="scaleup-contact-design.html" class="nav-link data-hover" style="color:var(--gold);">Get Started</a></li>'''

def fix_page(filename):
    filepath = os.path.join(PUBLIC_PATH, filename)

    if not os.path.exists(filepath):
        print(f"  SKIP: {filename} not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # Pattern matches <ul class="nav-menu">...</ul>
    pattern = r'(<ul class="nav-menu">)(.*?)(</ul>)'

    def replace_nav(match):
        return match.group(1) + '\n                ' + STANDARD_NAV_ITEMS + '\n            ' + match.group(3)

    html = re.sub(pattern, replace_nav, html, flags=re.DOTALL)

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
    print("Replacing nav-menu with Standard Links")
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
