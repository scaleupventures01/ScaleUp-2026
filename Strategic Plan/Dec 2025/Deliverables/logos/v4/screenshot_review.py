from playwright.sync_api import sync_playwright
import os

html_path = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/research-synthesis.html"
screenshot_dir = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/screenshots"

os.makedirs(screenshot_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # Visible browser
    page = browser.new_page(viewport={'width': 1400, 'height': 900})

    # Open local HTML file
    page.goto(f"file://{html_path}")
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(2000)  # Wait for images to load

    # Screenshot 1: Top of page (header and intro)
    page.screenshot(path=f"{screenshot_dir}/01-header.png")
    print("Screenshot 1: Header captured")

    # Scroll and capture Animals section
    page.evaluate("window.scrollTo(0, 600)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/02-animals-intro.png")
    print("Screenshot 2: Animals intro captured")

    # Capture each animal
    page.evaluate("window.scrollTo(0, 1200)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/03-heron.png")
    print("Screenshot 3: Heron captured")

    page.evaluate("window.scrollTo(0, 1900)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/04-lynx.png")
    print("Screenshot 4: Lynx captured")

    page.evaluate("window.scrollTo(0, 2600)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/05-ibis.png")
    print("Screenshot 5: Ibis captured")

    page.evaluate("window.scrollTo(0, 3300)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/06-nautilus.png")
    print("Screenshot 6: Nautilus captured")

    page.evaluate("window.scrollTo(0, 4000)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/07-badger.png")
    print("Screenshot 7: Badger captured")

    # Figures section
    page.evaluate("window.scrollTo(0, 4700)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/08-figures-intro.png")
    print("Screenshot 8: Figures intro captured")

    page.evaluate("window.scrollTo(0, 5400)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/09-assayer.png")
    print("Screenshot 9: Assayer captured")

    page.evaluate("window.scrollTo(0, 6100)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/10-harbor-pilot.png")
    print("Screenshot 10: Harbor Pilot captured")

    page.evaluate("window.scrollTo(0, 6800)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/11-rope-stretcher.png")
    print("Screenshot 11: Rope Stretcher captured")

    page.evaluate("window.scrollTo(0, 7500)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/12-belayer.png")
    print("Screenshot 12: Belayer captured")

    page.evaluate("window.scrollTo(0, 8200)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/13-master-cooper.png")
    print("Screenshot 13: Master Cooper captured")

    # Objects section
    page.evaluate("window.scrollTo(0, 8900)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/14-objects-intro.png")
    print("Screenshot 14: Objects intro captured")

    page.evaluate("window.scrollTo(0, 9600)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/15-touchstone.png")
    print("Screenshot 15: Touchstone captured")

    page.evaluate("window.scrollTo(0, 10300)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/16-plumb-bob.png")
    print("Screenshot 16: Plumb Bob captured")

    page.evaluate("window.scrollTo(0, 11000)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/17-benchmark.png")
    print("Screenshot 17: Benchmark captured")

    page.evaluate("window.scrollTo(0, 11700)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/18-kamal.png")
    print("Screenshot 18: Kamal captured")

    page.evaluate("window.scrollTo(0, 12400)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/19-keystone.png")
    print("Screenshot 19: Keystone captured")

    # Scroll to bottom for conclusion
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    page.screenshot(path=f"{screenshot_dir}/20-conclusion.png")
    print("Screenshot 20: Conclusion captured")

    print(f"\nAll screenshots saved to: {screenshot_dir}")
    print("Keeping browser open for manual review...")
    page.wait_for_timeout(10000)  # Keep open for 10 seconds for visual review

    browser.close()
