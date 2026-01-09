#!/usr/bin/env python3
"""Verify official heron logo displays on all pages"""

from playwright.sync_api import sync_playwright
import time

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

PAGES = [
    ("scaleup-homepage-v1.html", "homepage"),
    ("scaleup-about-design.html", "about"),
    ("scaleup-services-design.html", "services"),
]

def main():
    print("Verifying Official Heron Logo on Pages...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=300)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        for file_name, prefix in PAGES:
            file_url = f"file://{BASE_PATH}/{file_name}"
            print(f"\nChecking: {file_name}")

            page.goto(file_url)
            page.wait_for_load_state('networkidle')
            time.sleep(1)

            # Check if heron logo image exists
            logo_count = page.locator('.heron-logo-img').count()
            print(f"  Logo images found: {logo_count}")

            # Check if logo is visible
            if logo_count > 0:
                logo = page.locator('.heron-logo-img').first
                is_visible = logo.is_visible()
                print(f"  Logo visible: {is_visible}")

            # Take screenshot
            page.screenshot(path=f"/tmp/official-logo-{prefix}.png")
            print(f"  Screenshot: /tmp/official-logo-{prefix}.png")

            time.sleep(2)

        browser.close()

    print("\n" + "=" * 50)
    print("Verification complete! Check screenshots in /tmp/")

if __name__ == "__main__":
    main()
