#!/usr/bin/env python3
"""
Verify navigation works across all pages using Playwright.
Tests clicking nav links and verifies correct page loads.
"""

from playwright.sync_api import sync_playwright
import time
import os

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

# Pages to test navigation from
TEST_PAGES = [
    ("scaleup-homepage-v1.html", "Homepage"),
    ("scaleup-about-design.html", "About"),
    ("scaleup-services-design.html", "Services"),
]

# Expected navigation targets
EXPECTED_TARGETS = {
    'scaleup-homepage-v1.html': 'Homepage',
    'scaleup-about-design.html': 'About',
    'scaleup-services-design.html': 'Services',
    'scaleup-case-studies-design.html': 'Case Studies',
    'scaleup-contact-design.html': 'Contact',
}

def check_nav_links(page, page_name):
    """Check all navigation links on a page"""
    results = []

    # Find all anchor tags in nav area
    nav_links = page.locator('nav a[href], header a[href], .nav a[href], .navbar a[href]').all()

    for link in nav_links:
        try:
            href = link.get_attribute('href')
            text = link.inner_text().strip()[:30]

            if href and href.endswith('.html'):
                # Check if the file exists
                target_file = os.path.join(BASE_PATH, href)
                exists = os.path.exists(target_file)
                results.append({
                    'text': text,
                    'href': href,
                    'exists': exists,
                    'status': 'OK' if exists else 'BROKEN'
                })
        except Exception as e:
            pass

    return results

def main():
    print("=" * 60)
    print("Verifying Navigation Links")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=300)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        all_results = {}

        for file_name, page_name in TEST_PAGES:
            file_url = f"file://{BASE_PATH}/{file_name}"
            print(f"\n--- Testing: {page_name} ({file_name}) ---")

            page.goto(file_url)
            page.wait_for_load_state('networkidle')
            time.sleep(1)

            results = check_nav_links(page, page_name)
            all_results[page_name] = results

            for r in results:
                status = "✓" if r['status'] == 'OK' else "✗"
                print(f"  {status} '{r['text']}' -> {r['href']}")

            # Take screenshot
            page.screenshot(path=f"/tmp/nav-test-{page_name.lower()}.png")

            # Test clicking a navigation link
            try:
                about_link = page.locator('a[href*="about"]').first
                if about_link.is_visible():
                    print(f"\n  Testing click: About link...")
                    about_link.click()
                    page.wait_for_load_state('networkidle')
                    time.sleep(1)
                    current_url = page.url
                    if 'about' in current_url:
                        print(f"  ✓ Successfully navigated to About page")
                    page.go_back()
                    time.sleep(0.5)
            except Exception as e:
                print(f"  Navigation test skipped: {e}")

        browser.close()

    # Summary
    print("\n" + "=" * 60)
    print("NAVIGATION SUMMARY")
    print("=" * 60)

    total_ok = 0
    total_broken = 0

    for page_name, results in all_results.items():
        ok = sum(1 for r in results if r['status'] == 'OK')
        broken = sum(1 for r in results if r['status'] == 'BROKEN')
        total_ok += ok
        total_broken += broken
        print(f"{page_name}: {ok} OK, {broken} broken")

    print(f"\nTotal: {total_ok} OK, {total_broken} broken")

if __name__ == "__main__":
    main()
