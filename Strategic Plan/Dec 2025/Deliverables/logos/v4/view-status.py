from playwright.sync_api import sync_playwright

html_path = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/api-status-report.html"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={'width': 1000, 'height': 900})
    page.goto(f"file://{html_path}")
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(3000)
    page.screenshot(path="/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/screenshots/api-status-1.png")

    # Scroll to show more content
    page.evaluate("window.scrollTo(0, 600)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/screenshots/api-status-2.png")

    page.evaluate("window.scrollTo(0, 1200)")
    page.wait_for_timeout(1000)
    page.screenshot(path="/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/screenshots/api-status-3.png")

    print("API Status Report screenshots captured")
    page.wait_for_timeout(8000)  # Keep browser open longer for viewing
    browser.close()
