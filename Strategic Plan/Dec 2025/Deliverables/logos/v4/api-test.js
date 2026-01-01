const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio";

async function testAPI() {
  console.log(JSON.stringify({
    test: "Gemini API Direct Test",
    timestamp: new Date().toISOString(),
    apiKeyPresent: !!API_KEY,
    apiKeyLength: API_KEY.length,
    apiKeyPrefix: API_KEY.substring(0, 8) + "..."
  }));

  const genAI = new GoogleGenerativeAI(API_KEY);

  // Test 1: Try to list models (basic connectivity test)
  console.log("\n--- TEST 1: Basic text generation (no image) ---");
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say 'API is working' in exactly 3 words.");
    console.log("SUCCESS:", result.response.text().trim());
  } catch (error) {
    console.log("ERROR:", error.message.substring(0, 300));
  }

  // Test 2: Try image generation
  console.log("\n--- TEST 2: Image generation attempt ---");
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
      },
    });
    const result = await model.generateContent("Generate a simple blue square on white background.");
    const parts = result.response.candidates?.[0]?.content?.parts || [];
    const hasImage = parts.some(p => p.inlineData?.mimeType?.startsWith("image/"));
    console.log("SUCCESS: Image generated:", hasImage);
    if (!hasImage) {
      console.log("Response parts:", parts.map(p => Object.keys(p)));
    }
  } catch (error) {
    const errMsg = error.message || String(error);
    console.log("ERROR:", errMsg.substring(0, 500));
    if (errMsg.includes("quota")) {
      console.log("STATUS: QUOTA_EXHAUSTED");
    } else if (errMsg.includes("429")) {
      console.log("STATUS: RATE_LIMITED");
    } else if (errMsg.includes("401") || errMsg.includes("API key")) {
      console.log("STATUS: API_KEY_INVALID");
    } else {
      console.log("STATUS: OTHER_ERROR");
    }
  }
}

testAPI().then(() => {
  console.log("\n--- TEST COMPLETE ---");
  process.exit(0);
});
