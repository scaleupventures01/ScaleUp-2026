#!/usr/bin/env python3
"""
Fix navigation across all ScaleUp Ventures design pages.
Standardizes navigation links to point to actual pages.
"""

import os
import re

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

# Standard navigation structure
NAV_LINKS = {
    'home': 'scaleup-homepage-v1.html',
    'about': 'scaleup-about-design.html',
    'services': 'scaleup-services-design.html',
    'case_studies': 'scaleup-case-studies-design.html',
    'testimonials': 'scaleup-testimonials-design.html',
    'contact': 'scaleup-contact-design.html',
    'faq': 'scaleup-faq-design.html',
    'manifesto': 'scaleup-manifesto-design.html',
    'clients': 'scaleup-clients-design.html',
}

# Industry landing pages
INDUSTRY_PAGES = {
    'staffing': 'scaleup-staffing-design.html',
    'veterinary': 'scaleup-veterinary-design.html',
    'trades': 'scaleup-trades-design.html',
    'insurance': 'scaleup-insurance-design.html',
    'pestcontrol': 'scaleup-pestcontrol-design.html',
}

# Standard navigation HTML for header (will be customized per page structure)
STANDARD_NAV_ITEMS = [
    ('About', 'scaleup-about-design.html'),
    ('Services', 'scaleup-services-design.html'),
    ('Case Studies', 'scaleup-case-studies-design.html'),
    ('Contact', 'scaleup-contact-design.html'),
]

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

def fix_navigation(html, current_page):
    """Fix navigation links in HTML"""

    # Fix logo link to homepage
    html = re.sub(
        r'(<a\s+[^>]*class="[^"]*logo[^"]*"[^>]*href=")[^"]*(")',
        r'\1scaleup-homepage-v1.html\2',
        html
    )

    # Also fix logo-container links
    html = re.sub(
        r'(<a\s+[^>]*class="[^"]*logo-container[^"]*"[^>]*href=")[^"]*(")',
        r'\1scaleup-homepage-v1.html\2',
        html
    )

    # Fix common navigation patterns

    # Pattern: href="#about" or href="#" for About -> actual page
    html = re.sub(r'href="#about"', f'href="{NAV_LINKS["about"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#services"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#contact"', f'href="{NAV_LINKS["contact"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#case-studies"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#casestudies"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#testimonials"', f'href="{NAV_LINKS["testimonials"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#faq"', f'href="{NAV_LINKS["faq"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#manifesto"', f'href="{NAV_LINKS["manifesto"]}"', html, flags=re.IGNORECASE)

    # Fix "Philosophy" links -> About page
    html = re.sub(r'href="#philosophy"', f'href="{NAV_LINKS["about"]}"', html, flags=re.IGNORECASE)

    # Fix "Process" links -> Services page
    html = re.sub(r'href="#process"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)

    # Fix "Pricing" links -> Contact page
    html = re.sub(r'href="#pricing"', f'href="{NAV_LINKS["contact"]}"', html, flags=re.IGNORECASE)

    # Fix "Insights" links -> Case Studies
    html = re.sub(r'href="#insights"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)

    # Fix "Methodology" links -> Services
    html = re.sub(r'>Methodology</a>', f'href="{NAV_LINKS["services"]}">Services</a>', html)

    # Fix links with text patterns
    # "About Us" -> about page
    html = re.sub(
        r'<a\s+href="[#]?"[^>]*>\s*About\s*(?:Us)?\s*</a>',
        f'<a href="{NAV_LINKS["about"]}">About</a>',
        html, flags=re.IGNORECASE
    )

    # "Our Services" or "Services" -> services page
    html = re.sub(
        r'<a\s+href="[#]?"[^>]*>\s*(?:Our\s+)?Services\s*</a>',
        f'<a href="{NAV_LINKS["services"]}">Services</a>',
        html, flags=re.IGNORECASE
    )

    # "Case Studies" -> case studies page
    html = re.sub(
        r'<a\s+href="[#]?"[^>]*>\s*Case\s+Studies\s*</a>',
        f'<a href="{NAV_LINKS["case_studies"]}">Case Studies</a>',
        html, flags=re.IGNORECASE
    )

    # "Contact" or "Contact Us" -> contact page
    html = re.sub(
        r'<a\s+href="[#]?"[^>]*>\s*Contact\s*(?:Us)?\s*</a>',
        f'<a href="{NAV_LINKS["contact"]}">Contact</a>',
        html, flags=re.IGNORECASE
    )

    # Fix CTA buttons - "Book Audit", "Start Now", "Schedule Consultation" -> contact
    html = re.sub(
        r'(<a\s+[^>]*href=")[#]?("[^>]*>)\s*(?:Book\s+Audit|Start\s+Now|Schedule\s+Consultation|Get\s+Started|Request\s+Audit)\s*(</a>)',
        rf'\1{NAV_LINKS["contact"]}\2Book Audit\3',
        html, flags=re.IGNORECASE
    )

    # Fix footer navigation links
    # Services section links
    html = re.sub(r'href="#revenue-growth"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#operational"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#strategic"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#performance"', f'href="{NAV_LINKS["services"]}"', html, flags=re.IGNORECASE)

    # Company section links
    html = re.sub(r'href="#team"', f'href="{NAV_LINKS["about"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#careers"', f'href="{NAV_LINKS["about"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#values"', f'href="{NAV_LINKS["about"]}"', html, flags=re.IGNORECASE)

    # Resources section links
    html = re.sub(r'href="#blog"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#whitepapers"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)
    html = re.sub(r'href="#webinars"', f'href="{NAV_LINKS["case_studies"]}"', html, flags=re.IGNORECASE)

    # Fix industry page links
    for industry, page in INDUSTRY_PAGES.items():
        html = re.sub(rf'href="#{industry}"', f'href="{page}"', html, flags=re.IGNORECASE)

    # Fix any remaining standalone # links in navigation (but preserve in-page anchors)
    # Only fix # links that look like navigation (not section anchors like #hero, #cta)

    return html

def process_page(filename):
    """Process a single page"""
    filepath = os.path.join(BASE_PATH, filename)

    if not os.path.exists(filepath):
        print(f"  SKIP: not found")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    original = html
    html = fix_navigation(html, filename)

    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    print("=" * 60)
    print("Fixing Navigation Across All Pages")
    print("=" * 60)

    fixed = 0
    for page in PAGES:
        print(f"\n{page}:")
        if process_page(page):
            fixed += 1
            print(f"  UPDATED")
        else:
            print(f"  No changes needed")

    print(f"\n{'='*60}")
    print(f"Fixed navigation in {fixed} pages")
    print(f"\nNavigation now links to:")
    print(f"  Home      -> {NAV_LINKS['home']}")
    print(f"  About     -> {NAV_LINKS['about']}")
    print(f"  Services  -> {NAV_LINKS['services']}")
    print(f"  Cases     -> {NAV_LINKS['case_studies']}")
    print(f"  Contact   -> {NAV_LINKS['contact']}")

if __name__ == "__main__":
    main()
