#!/usr/bin/env python3
"""Quick verification of heron logo on pages"""

from playwright.sync_api import sync_playwright
import time

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"

PAGES_TO_CHECK = [
    ("scaleup-about-design.html", "about"),
    ("scaleup-services-design.html", "services"),
    ("scaleup-homepage-v1.html", "homepage"),
]

def main():
    print("Verifying Heron Logo on Pages...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=500)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        for file_name, prefix in PAGES_TO_CHECK:
            file_url = f"file://{BASE_PATH}/{file_name}"
            print(f"\nChecking: {file_name}")

            page.goto(file_url)
            page.wait_for_load_state('networkidle')
            time.sleep(1)

            # Check if heron SVG exists
            heron_svg = page.locator('.heron-icon').count()
            print(f"  Heron icons found: {heron_svg}")

            # Take screenshot of header area
            page.screenshot(path=f"/tmp/logo-verify-{prefix}.png")
            print(f"  Screenshot: /tmp/logo-verify-{prefix}.png")

            time.sleep(2)

        browser.close()

    print("\n✓ Verification complete!")

if __name__ == "__main__":
    main()
