#!/usr/bin/env python3
"""
Add the official ScaleUp Ventures heron logo to all design pages.
Updates both header logo and favicon.
"""

import os
import re

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

# SVG Heron Logo - matches the elegant single-stroke design
# Navy heron (#0F1729) with gold eye (#D4A853) on transparent background
HERON_SVG_WHITE = '''<svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="heron-icon">
  <!-- Elegant heron silhouette - single stroke style -->
  <path d="M20 2 Q22 6 23 10 Q24 14 22 18 Q20 22 22 26 Q24 32 20 38 Q18 42 18 48"
        stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Head and beak -->
  <path d="M23 10 Q28 8 35 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Body curve -->
  <path d="M22 18 Q16 22 14 28 Q12 34 16 38" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Wing detail -->
  <path d="M18 24 Q14 26 12 30" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Legs -->
  <path d="M18 38 L16 48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M20 38 L22 48" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Gold eye -->
  <circle cx="24" cy="9" r="1.5" fill="#D4A853"/>
</svg>'''

# Simpler filled silhouette version for favicon and headers
HERON_SVG_FILLED = '''<svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="heron-icon">
  <!-- Elegant heron silhouette -->
  <path d="M16 1 C18 4 19 7 19 10 C19 13 17 16 18 20 C19 25 18 30 16 35 L14 39 L14 35 C12 30 11 25 12 20 C13 16 11 13 11 10 C11 7 12 4 14 1 Z" fill="currentColor"/>
  <!-- Head -->
  <ellipse cx="17" cy="8" rx="4" ry="3" fill="currentColor"/>
  <!-- Beak -->
  <path d="M21 7 L30 4 L21 8 Z" fill="currentColor"/>
  <!-- Wing -->
  <path d="M12 18 C8 20 6 25 8 30 C10 28 12 24 12 18 Z" fill="currentColor"/>
  <!-- Legs -->
  <rect x="13" y="35" width="1.5" height="5" fill="currentColor"/>
  <rect x="16" y="35" width="1.5" height="5" fill="currentColor"/>
  <!-- Gold eye -->
  <circle cx="18" cy="7" r="1" fill="#D4A853"/>
</svg>'''

# CSS for the heron icon
HERON_CSS = '''
        /* Heron Logo Icon */
        .heron-icon {
            width: 32px;
            height: 40px;
            color: var(--cream, #FAF8F5);
            flex-shrink: 0;
            transition: transform 0.3s ease;
        }

        .logo:hover .heron-icon {
            transform: scale(1.05);
        }

        /* Dark background variant */
        .nav-scrolled .heron-icon,
        .dark-header .heron-icon {
            color: var(--navy, #0F1729);
        }
'''

# Favicon SVG (navy heron on transparent)
FAVICON_SVG = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path d="M16 2 C17 4 18 6 18 9 C18 12 16 14 17 18 C18 22 17 26 15 30 L14 32 L13 30 C11 26 10 22 11 18 C12 14 10 12 10 9 C10 6 11 4 13 2 Z" fill="#0F1729"/>
  <ellipse cx="16" cy="7" rx="3" ry="2.5" fill="#0F1729"/>
  <path d="M19 6 L26 4 L19 7 Z" fill="#0F1729"/>
  <path d="M11 16 C8 18 6 22 8 26 C9 24 11 21 11 16 Z" fill="#0F1729"/>
  <rect x="12" y="28" width="1.2" height="4" fill="#0F1729"/>
  <rect x="14.5" y="28" width="1.2" height="4" fill="#0F1729"/>
  <circle cx="17" cy="6" r="0.8" fill="#D4A853"/>
</svg>'''

# List of all design pages to update
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

def add_favicon_to_head(html):
    """Add favicon link to head section"""
    favicon_link = f'''    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,{FAVICON_SVG.replace('"', '%22').replace('#', '%23').replace('<', '%3C').replace('>', '%3E').replace(' ', '%20')}">
'''
    # Check if favicon already exists
    if 'rel="icon"' in html:
        return html

    # Add after <title> tag
    if '</title>' in html:
        html = html.replace('</title>', '</title>\n' + favicon_link)
    return html

def add_heron_css(html):
    """Add heron CSS if not present"""
    if '.heron-icon' in html:
        return html

    # Find the end of :root or first CSS rule and add after
    css_insert = HERON_CSS

    # Insert before the closing </style> of the main style block
    # Find first </style> tag
    style_end = html.find('</style>')
    if style_end != -1:
        html = html[:style_end] + css_insert + '\n    ' + html[style_end:]

    return html

def replace_logo_icon(html):
    """Replace the placeholder logo-icon span with SVG heron"""
    # Pattern 1: Empty span with class logo-icon
    pattern1 = r'<span class="logo-icon"></span>'

    # Pattern 2: Span with content
    pattern2 = r'<span class="logo-icon">[^<]*</span>'

    # Replace with SVG
    html = re.sub(pattern1, HERON_SVG_FILLED, html)
    html = re.sub(pattern2, HERON_SVG_FILLED, html)

    return html

def update_logo_css(html):
    """Update .logo-icon CSS to work with SVG"""
    # Remove old .logo-icon CSS that sets width/height/background
    old_css_pattern = r'\.logo-icon\s*\{[^}]+\}'

    # Check if it's the old placeholder CSS
    match = re.search(old_css_pattern, html)
    if match:
        old_css = match.group(0)
        # Only replace if it's the placeholder CSS (small width/height)
        if 'width: 12px' in old_css or 'rotate(45deg)' in old_css:
            html = re.sub(old_css_pattern, '', html)

    return html

def process_page(filename):
    """Process a single page"""
    filepath = os.path.join(BASE_PATH, filename)

    if not os.path.exists(filepath):
        print(f"  SKIP: {filename} not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html

    # Apply transformations
    html = add_favicon_to_head(html)
    html = add_heron_css(html)
    html = update_logo_css(html)
    html = replace_logo_icon(html)

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  UPDATED: {filename}")
        return True
    else:
        print(f"  NO CHANGE: {filename}")
        return False

def main():
    print("=" * 60)
    print("Adding Heron Logo to ScaleUp Ventures Pages")
    print("=" * 60)

    updated = 0
    for page in PAGES:
        print(f"\nProcessing: {page}")
        if process_page(page):
            updated += 1

    print("\n" + "=" * 60)
    print(f"COMPLETE: {updated}/{len(PAGES)} pages updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
