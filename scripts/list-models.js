const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyD2e-mTPR9xxtUGYKGsxwg4PBl0FsQ4cio";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    // Using fetch directly to list models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    const data = await response.json();

    console.log("Available models:\n");

    if (data.models) {
      data.models.forEach(model => {
        console.log(`Model: ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('');
      });
    } else {
      console.log("Raw response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
