#!/usr/bin/env python3
"""
Review ScaleUp Ventures design pages with Playwright - HEADED VISIBLE BROWSER
Takes screenshots at different scroll positions
"""

from playwright.sync_api import sync_playwright
import sys
import os
import time

def review_page(page_path, output_prefix):
    """Review a single page, scroll through it, and take screenshots"""

    with sync_playwright() as p:
        # Launch VISIBLE browser with slow_mo for visibility
        browser = p.chromium.launch(
            headless=False,  # VISIBLE BROWSER
            slow_mo=1000,    # Slow down actions by 1 second
            args=['--start-maximized']
        )
        context = browser.new_context(
            viewport={'width': 1440, 'height': 900},
            no_viewport=False
        )
        page = context.new_page()

        # Navigate to local file
        file_url = f"file://{page_path}"
        print(f"\n{'='*60}")
        print(f"Reviewing: {os.path.basename(page_path)}")
        print(f"URL: {file_url}")
        print(f"{'='*60}")

        page.goto(file_url)
        page.wait_for_load_state('networkidle')
        time.sleep(3)  # Let user see the hero

        # Screenshot 1: Top of page (hero)
        page.screenshot(path=f"/tmp/{output_prefix}-01-hero.png")
        print(f"Screenshot 1: Hero section")

        # Scroll down slowly and take more screenshots
        print("Scrolling to section 2...")
        page.evaluate("window.scrollTo({top: window.innerHeight, behavior: 'smooth'})")
        time.sleep(2)
        page.screenshot(path=f"/tmp/{output_prefix}-02-section1.png")
        print(f"Screenshot 2: First section after hero")

        print("Scrolling to section 3...")
        page.evaluate("window.scrollTo({top: window.innerHeight * 2, behavior: 'smooth'})")
        time.sleep(2)
        page.screenshot(path=f"/tmp/{output_prefix}-03-section2.png")
        print(f"Screenshot 3: Second section")

        print("Scrolling to section 4...")
        page.evaluate("window.scrollTo({top: window.innerHeight * 3, behavior: 'smooth'})")
        time.sleep(2)
        page.screenshot(path=f"/tmp/{output_prefix}-04-section3.png")
        print(f"Screenshot 4: Third section")

        print("Scrolling to section 5...")
        page.evaluate("window.scrollTo({top: window.innerHeight * 4, behavior: 'smooth'})")
        time.sleep(2)
        page.screenshot(path=f"/tmp/{output_prefix}-05-section4.png")
        print(f"Screenshot 5: Fourth section")

        # Scroll to bottom
        print("Scrolling to footer...")
        page.evaluate("window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})")
        time.sleep(2)
        page.screenshot(path=f"/tmp/{output_prefix}-06-footer.png")
        print(f"Screenshot 6: Footer")

        # Full page screenshot
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)
        page.screenshot(path=f"/tmp/{output_prefix}-full.png", full_page=True)
        print(f"Full page screenshot saved")

        # Check for broken images
        broken_images = page.evaluate("""
            () => {
                const images = document.querySelectorAll('img');
                const broken = [];
                images.forEach(img => {
                    if (!img.complete || img.naturalWidth === 0) {
                        broken.push(img.src || img.getAttribute('src') || 'unknown');
                    }
                });
                return broken;
            }
        """)

        # Check for missing links
        broken_links = page.evaluate("""
            () => {
                const links = document.querySelectorAll('a[href]');
                const issues = [];
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (!href || href === '#' || href === '') {
                        issues.push({text: link.textContent.trim().substring(0, 50), href: href});
                    }
                });
                return issues;
            }
        """)

        # Check for elements that might be broken
        layout_issues = page.evaluate("""
            () => {
                const issues = [];
                // Check for overflow
                const body = document.body;
                if (body.scrollWidth > window.innerWidth) {
                    issues.push('Horizontal scroll detected - possible overflow issue');
                }
                // Check for very small text
                const allText = document.querySelectorAll('p, span, div');
                allText.forEach(el => {
                    const style = window.getComputedStyle(el);
                    const fontSize = parseFloat(style.fontSize);
                    if (fontSize < 10 && el.textContent.trim().length > 0) {
                        issues.push(`Very small text (${fontSize}px): "${el.textContent.trim().substring(0, 30)}..."`);
                    }
                });
                return issues;
            }
        """)

        print("\n--- Keeping browser open for 5 seconds for review ---")
        time.sleep(5)

        browser.close()

        return {
            'broken_images': broken_images,
            'broken_links': broken_links,
            'layout_issues': layout_issues
        }

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python review-pages.py <page_path> <output_prefix>")
        sys.exit(1)

    page_path = sys.argv[1]
    output_prefix = sys.argv[2]

    results = review_page(page_path, output_prefix)

    print(f"\n{'='*60}")
    print(f"ISSUES FOUND")
    print(f"{'='*60}")
    print(f"\nBroken images: {len(results['broken_images'])}")
    for img in results['broken_images']:
        print(f"  - {img[:80]}...")
    print(f"\nBroken/empty links: {len(results['broken_links'])}")
    for link in results['broken_links']:
        print(f"  - '{link['text']}' -> {link['href']}")
    print(f"\nLayout issues: {len(results['layout_issues'])}")
    for issue in results['layout_issues']:
        print(f"  - {issue}")
