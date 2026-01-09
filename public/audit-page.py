#!/usr/bin/env python3
"""Audit a single page at desktop and mobile viewports"""

from playwright.sync_api import sync_playwright
import sys
import time

BASE_URL = "https://scaleupventures.vercel.app"

def audit_page(page_name):
    print(f"\n{'='*60}")
    print(f"AUDITING: {page_name}")
    print(f"{'='*60}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=200)

        # Desktop viewport
        print("\n[DESKTOP 1440x900]")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        url = f"{BASE_URL}/{page_name}"
        print(f"  Loading: {url}")
        page.goto(url)
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Take desktop screenshot
        desktop_path = f"/tmp/audit-{page_name.replace('.html', '')}-desktop.png"
        page.screenshot(path=desktop_path, full_page=True)
        print(f"  Screenshot: {desktop_path}")

        # Check nav links
        print("\n  Checking navigation links...")
        nav_links = page.locator('nav a').all()
        print(f"  Found {len(nav_links)} nav links:")
        for link in nav_links[:10]:  # First 10
            href = link.get_attribute('href')
            text = link.inner_text().strip()[:30]
            print(f"    - {text}: {href}")

        # Check for broken images
        print("\n  Checking images...")
        images = page.locator('img').all()
        broken = 0
        for img in images:
            natural_width = img.evaluate('el => el.naturalWidth')
            if natural_width == 0:
                src = img.get_attribute('src')
                print(f"    BROKEN: {src}")
                broken += 1
        print(f"  Total images: {len(images)}, Broken: {broken}")

        context.close()

        # Mobile viewport
        print("\n[MOBILE 375x812]")
        context = browser.new_context(viewport={"width": 375, "height": 812})
        page = context.new_page()

        page.goto(url)
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Take mobile screenshot
        mobile_path = f"/tmp/audit-{page_name.replace('.html', '')}-mobile.png"
        page.screenshot(path=mobile_path, full_page=True)
        print(f"  Screenshot: {mobile_path}")

        # Check for hamburger menu
        hamburger = page.locator('[class*="hamburger"], [class*="menu-toggle"], [class*="mobile-menu"], button[aria-label*="menu"]').first
        if hamburger.count() > 0:
            print("  Hamburger menu: FOUND")
        else:
            print("  Hamburger menu: NOT FOUND")

        # Check horizontal overflow
        body_width = page.evaluate('document.body.scrollWidth')
        viewport_width = 375
        if body_width > viewport_width:
            print(f"  WARNING: Horizontal overflow detected ({body_width}px > {viewport_width}px)")
        else:
            print(f"  No horizontal overflow")

        context.close()
        browser.close()

    print(f"\n{'='*60}")
    print(f"COMPLETED: {page_name}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        audit_page(sys.argv[1])
    else:
        print("Usage: python audit-page.py <page_name.html>")
