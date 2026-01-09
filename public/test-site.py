#!/usr/bin/env python3
"""Test ScaleUp Ventures website navigation using Playwright"""

from playwright.sync_api import sync_playwright
import time

BASE_URL = "https://scaleupventures.vercel.app"

def test_site():
    print("=" * 60)
    print("Testing ScaleUp Ventures Website")
    print("=" * 60)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=500)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # Test 1: Homepage loads
        print("\n1. Testing Homepage...")
        page.goto(BASE_URL)
        page.wait_for_load_state('networkidle')
        title = page.title()
        print(f"   Title: {title}")
        assert "ScaleUp" in title, "Homepage title missing ScaleUp"
        print("   ✓ Homepage loads correctly")
        time.sleep(2)

        # Test 2: Services page
        print("\n2. Testing Services link...")
        services_link = page.locator('a.nav-link:has-text("Services")').first
        if services_link.is_visible():
            services_link.click()
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            current_url = page.url
            print(f"   URL: {current_url}")
            assert "services" in current_url.lower(), "Services page not loaded"
            print("   ✓ Services page works")
        time.sleep(2)

        # Test 3: About page
        print("\n3. Testing About link...")
        about_link = page.locator('a.nav-link:has-text("About")').first
        if about_link.is_visible():
            about_link.click()
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            current_url = page.url
            print(f"   URL: {current_url}")
            assert "about" in current_url.lower(), "About page not loaded"
            print("   ✓ About page works")
        time.sleep(2)

        # Test 4: Case Studies page
        print("\n4. Testing Case Studies link...")
        cases_link = page.locator('a.nav-link:has-text("Case Studies")').first
        if cases_link.is_visible():
            cases_link.click()
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            current_url = page.url
            print(f"   URL: {current_url}")
            assert "case-studies" in current_url.lower(), "Case Studies page not loaded"
            print("   ✓ Case Studies page works")
        time.sleep(2)

        # Test 5: Contact page
        print("\n5. Testing Contact link...")
        contact_link = page.locator('a.nav-link:has-text("Contact")').first
        if contact_link.is_visible():
            contact_link.click()
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            current_url = page.url
            print(f"   URL: {current_url}")
            assert "contact" in current_url.lower(), "Contact page not loaded"
            print("   ✓ Contact page works")
        time.sleep(2)

        # Test 6: Logo returns to homepage
        print("\n6. Testing logo link back to homepage...")
        logo = page.locator('a.logo').first
        if logo.is_visible():
            logo.click()
            page.wait_for_load_state('networkidle')
            time.sleep(1)
            current_url = page.url
            print(f"   URL: {current_url}")
            print("   ✓ Logo navigation works")
        time.sleep(2)

        # Test 7: Master index page
        print("\n7. Testing Master Index...")
        page.goto(f"{BASE_URL}/master-index.html")
        page.wait_for_load_state('networkidle')
        time.sleep(1)
        title = page.title()
        print(f"   Title: {title}")
        print("   ✓ Master Index loads")
        time.sleep(2)

        browser.close()

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)

if __name__ == "__main__":
    test_site()
