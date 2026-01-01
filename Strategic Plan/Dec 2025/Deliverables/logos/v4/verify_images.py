from playwright.sync_api import sync_playwright
import os

html_path = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/research-synthesis.html"
screenshot_dir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/screenshots"

os.makedirs(screenshot_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})

    page.goto(f"file://{html_path}")
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)

    # Screenshot Animals section
    page.evaluate("window.scrollTo(0, 800)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/animals-1.png")
    print("Animals section 1 captured")

    page.evaluate("window.scrollTo(0, 1600)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/animals-2.png")
    print("Animals section 2 captured")

    page.evaluate("window.scrollTo(0, 2400)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/animals-3.png")
    print("Animals section 3 captured")

    # Screenshot Figures section
    page.evaluate("window.scrollTo(0, 4000)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/figures-1.png")
    print("Figures section 1 captured")

    page.evaluate("window.scrollTo(0, 4800)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/figures-2.png")
    print("Figures section 2 captured")

    # Screenshot Objects section
    page.evaluate("window.scrollTo(0, 6000)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/objects-1.png")
    print("Objects section 1 captured")

    # Top recommendations
    page.evaluate("window.scrollTo(0, document.body.scrollHeight - 1500)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/top-recommendations.png")
    print("Top recommendations captured")

    print(f"\nAll screenshots saved to: {screenshot_dir}")
    page.wait_for_timeout(5000)
    browser.close()
