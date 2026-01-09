#!/usr/bin/env python3
"""Full navigation test for ScaleUp Ventures website"""

from playwright.sync_api import sync_playwright
import time

BASE_URL = "https://scaleupventures.vercel.app"

def test_full_nav():
    print("=" * 60)
    print("Full Navigation Test - ScaleUp Ventures")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=300)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # Start at homepage
        print("\n→ Loading Homepage...")
        page.goto(BASE_URL)
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ {page.title()}")

        # Click Services - use nav selector
        print("\n→ Clicking Services...")
        page.locator('nav a[href="scaleup-services-design.html"]').first.click()
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ URL: {page.url}")

        # Click About from Services page - use nav ul li selector
        print("\n→ Clicking About...")
        page.locator('nav ul li a[href="scaleup-about-design.html"]').first.click()
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ URL: {page.url}")

        # Click Case Studies from About page
        print("\n→ Clicking Case Studies...")
        page.locator('nav a[href="scaleup-case-studies-design.html"]').first.click()
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ URL: {page.url}")

        # Click Contact from Case Studies page
        print("\n→ Clicking Contact...")
        page.locator('nav a[href="scaleup-contact-design.html"]').first.click()
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ URL: {page.url}")

        # Click logo to go home (force due to SVG overlay issue on Contact page)
        print("\n→ Clicking Logo to return home...")
        page.locator('a[href="index.html"]').first.click(force=True)
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        print(f"  ✓ URL: {page.url}")

        time.sleep(2)
        browser.close()

    print("\n" + "=" * 60)
    print("NAVIGATION TEST COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    test_full_nav()
