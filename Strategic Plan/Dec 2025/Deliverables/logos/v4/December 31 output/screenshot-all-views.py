#!/usr/bin/env python3
"""
Screenshot all ScaleUp Ventures pages in both Desktop and Mobile views
Waits for full page load before capturing
"""

from playwright.sync_api import sync_playwright
import os
import time

# Page configurations
PAGES = [
    ("scaleup-homepage-v1.html", "homepage"),
    ("scaleup-about-design.html", "about"),
    ("scaleup-services-design.html", "services"),
    ("scaleup-contact-design.html", "contact"),
    ("scaleup-faq-design.html", "faq"),
    ("scaleup-case-studies-design.html", "casestudies"),
    ("scaleup-testimonials-design.html", "testimonials"),
    ("scaleup-manifesto-design.html", "manifesto"),
    ("scaleup-clients-design.html", "clients"),
    ("scaleup-staffing-design.html", "staffing"),
    ("scaleup-veterinary-design.html", "veterinary"),
    ("scaleup-trades-design.html", "trades"),
    ("scaleup-insurance-design.html", "insurance"),
    ("scaleup-pestcontrol-design.html", "pestcontrol"),
]

# Viewport configurations
VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},  # iPhone 14 Pro
}

BASE_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/December 31 output"
OUTPUT_DIR = "/tmp/scaleup-screenshots"

def ensure_output_dir():
    """Create output directory if it doesn't exist"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/desktop", exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/mobile", exist_ok=True)

def capture_page(page, file_name, prefix, viewport_name, viewport):
    """Capture a single page at specified viewport"""
    file_path = f"{BASE_PATH}/{file_name}"
    file_url = f"file://{file_path}"

    print(f"\n  [{viewport_name.upper()}] {prefix}...")

    # Set viewport
    page.set_viewport_size(viewport)

    # Navigate and wait for full load
    page.goto(file_url)
    page.wait_for_load_state('networkidle')
    page.wait_for_load_state('domcontentloaded')

    # Extra wait for animations to settle
    time.sleep(2)

    # Scroll to trigger any lazy-loaded content
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 4)")
    time.sleep(0.5)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
    time.sleep(0.5)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(0.5)
    page.evaluate("window.scrollTo(0, 0)")
    time.sleep(1)

    # Take full page screenshot
    screenshot_path = f"{OUTPUT_DIR}/{viewport_name}/{prefix}.png"
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"    Saved: {screenshot_path}")

    return screenshot_path

def main():
    print("=" * 60)
    print("ScaleUp Ventures - Desktop & Mobile Screenshot Capture")
    print("=" * 60)

    ensure_output_dir()

    with sync_playwright() as p:
        # Launch visible browser
        browser = p.chromium.launch(
            headless=False,
            slow_mo=300
        )

        screenshots = {"desktop": [], "mobile": []}

        for file_name, prefix in PAGES:
            print(f"\n{'='*50}")
            print(f"Processing: {file_name}")
            print(f"{'='*50}")

            # Desktop capture
            context = browser.new_context(viewport=VIEWPORTS["desktop"])
            page = context.new_page()
            path = capture_page(page, file_name, prefix, "desktop", VIEWPORTS["desktop"])
            screenshots["desktop"].append((prefix, path))
            context.close()

            # Mobile capture
            context = browser.new_context(
                viewport=VIEWPORTS["mobile"],
                is_mobile=True,
                has_touch=True
            )
            page = context.new_page()
            path = capture_page(page, file_name, prefix, "mobile", VIEWPORTS["mobile"])
            screenshots["mobile"].append((prefix, path))
            context.close()

        browser.close()

    print("\n" + "=" * 60)
    print("CAPTURE COMPLETE")
    print("=" * 60)
    print(f"\nDesktop screenshots: {OUTPUT_DIR}/desktop/")
    print(f"Mobile screenshots: {OUTPUT_DIR}/mobile/")
    print(f"\nTotal: {len(screenshots['desktop'])} desktop + {len(screenshots['mobile'])} mobile = {len(screenshots['desktop']) * 2} screenshots")

    # List all screenshots
    print("\n--- Desktop Screenshots ---")
    for prefix, path in screenshots["desktop"]:
        print(f"  {prefix}: {path}")

    print("\n--- Mobile Screenshots ---")
    for prefix, path in screenshots["mobile"]:
        print(f"  {prefix}: {path}")

if __name__ == "__main__":
    main()
