const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// API Key provided by user
const API_KEY = "AIzaSyA1OV04A6rB6vl8Ku-iUvdEQ3ieotUd6Iw";

const OUTPUT_PATH = "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo/Strategic Plan/Dec 2025/Deliverables/logos/v4/concepts/heron/heron-03-strike-pose.png";

// THE LEGENDARY PROMPT - Heron Strike
const LEGENDARY_PROMPT = `Create a LEGENDARY professional vector logo for "ScaleUp Ventures" - an elite B2B advisory firm.

THE MOMENT: A Great Blue Heron captured in the exact instant of STRIKING. This is THE decisive moment after 30 minutes of patient observation. The neck has uncoiled like a spring. The razor-sharp beak pierces downward toward its target. A small stylized fish represents CAPTURED SUCCESS.

MANDATORY TECHNICAL REQUIREMENTS:
- Background: PURE WHITE (#FFFFFF) - absolutely non-negotiable
- NO gradients, NO shadows, NO glows, NO 3D effects
- FLAT vector-style design with clean geometric precision
- Must maintain perfect clarity at all sizes from billboard to favicon

COLOR PALETTE (strict):
- Primary: Deep Navy Blue (#0F1729) for the heron's body - authoritative, trustworthy
- Accent: Burnished Gold (#D4A853) for the fish - representing ROI, the payoff, proven results
- The gold element should feel EARNED, not decorative

THE HERON DESIGN:
- Dynamic STRIKE POSE with neck fully extended downward
- Angular geometric forms suggesting controlled energy and discipline
- Sharp dagger-like beak showing surgical precision
- The eye remains calm and focused even in motion - this is CONTROLLED power, not chaos
- Body composed of confident angular shapes, wings slightly raised for momentum
- Long elegant legs anchored with stability
- Diagonal compositional flow suggesting forward momentum

THE FISH (Gold Accent):
- Small stylized fish in the beak OR just below the beak about to be captured
- Rendered in burnished gold (#D4A853)
- Simple geometric form - not literal, logo-appropriate
- THIS IS THE ROI - the proven result, the success delivered

EMOTIONAL IMPACT:
A skeptical 50-65 year old business owner who has been burned by consultants should look at this and FEEL:
"These people don't just talk. They EXECUTE. They DELIVER. That fish is my results."

TYPOGRAPHY:
- "ScaleUp Ventures" in an authoritative serif typeface
- Navy blue (#0F1729) color
- Positioned to balance the dynamic composition
- Feels like the signature on a successfully closed deal
- Professional weight with presence and confidence

STYLE REFERENCES:
- The controlled dynamism of Saul Bass
- The elegant precision of a Hermes illustration
- The authoritative presence of a century-old investment bank
- Modern enough for tech clients, classic enough for traditional industries

THIS IS NOT:
- Aggressive or predatory - this is CONFIDENCE, not aggression
- Cute or cartoonish - this is premium professional
- Generic stock art - this is distinctive and memorable
- Complicated illustration - this is LOGO-CLEAN

The philosophy captured: "We watch. We analyze. We wait for the RIGHT moment. Then we execute FLAWLESSLY. And we prove the results BEFORE you invest."

Make this LEGENDARY.`;

async function generateLegendaryLogo() {
  console.log("=".repeat(70));
  console.log("  SCALEUP VENTURES - THE LEGENDARY HERON STRIKE LOGO");
  console.log("=".repeat(70));
  console.log("");
  console.log("Model: gemini-3-pro-image-preview (MAXIMUM CREATIVITY)");
  console.log("Temperature: 1.0 (Full creative power)");
  console.log(`Output: ${OUTPUT_PATH}`);
  console.log("");
  console.log("Generating the MONEY SHOT...");
  console.log("-".repeat(70));

  const genAI = new GoogleGenerativeAI(API_KEY);

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`\n  Attempt ${attempt}/5 - Invoking Gemini 3 Pro Image...`);

      const model = genAI.getGenerativeModel({
        model: "gemini-3-pro-image-preview",
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          temperature: 1.0,  // MAXIMUM CREATIVITY
        },
      });

      const response = await model.generateContent(LEGENDARY_PROMPT);
      const parts = response.response.candidates?.[0]?.content?.parts || [];

      // Check for text response (model feedback)
      for (const part of parts) {
        if (part.text) {
          console.log(`\n  Model feedback: ${part.text.substring(0, 200)}...`);
        }
      }

      // Extract and save image
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");

          // Ensure directory exists
          const dir = path.dirname(OUTPUT_PATH);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          fs.writeFileSync(OUTPUT_PATH, buffer);

          console.log("");
          console.log("=".repeat(70));
          console.log("  SUCCESS - THE LEGENDARY LOGO HAS BEEN CREATED!");
          console.log("=".repeat(70));
          console.log("");
          console.log(`  File saved: ${OUTPUT_PATH}`);
          console.log(`  File size: ${(buffer.length / 1024).toFixed(1)} KB`);
          console.log("");
          console.log("  The heron has struck. The fish is captured.");
          console.log("  This is the ROI. This is the proof.");
          console.log("");

          return { success: true, path: OUTPUT_PATH, size: buffer.length };
        }
      }

      console.log("  No image in response, retrying...");
      await new Promise(r => setTimeout(r, 5000));

    } catch (error) {
      const errMsg = error.message || String(error);

      if (errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED")) {
        console.log("  Rate limited - waiting 60 seconds...");
        await new Promise(r => setTimeout(r, 60000));
      } else if (errMsg.includes("503") || errMsg.includes("overloaded")) {
        console.log("  Model overloaded - waiting 30 seconds...");
        await new Promise(r => setTimeout(r, 30000));
      } else {
        console.log(`  Error: ${errMsg.substring(0, 150)}`);
        await new Promise(r => setTimeout(r, 10000));
      }
    }
  }

  console.log("\n  FAILED after 5 attempts. The heron was too legendary.");
  return { success: false };
}

generateLegendaryLogo().catch(console.error);
