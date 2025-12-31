# ScaleUp Ventures Brand Assets

## Logo Generation

This folder contains everything needed to generate professional logos for ScaleUp Ventures.

### Quick Start

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/apikey)
   - Create a new API key
   - Copy the key

2. **Set the Environment Variable**
   ```bash
   export GEMINI_API_KEY=your_api_key_here
   ```

3. **Generate Logos**
   ```bash
   cd "/Users/calvinwilliamsjr/Personal AI Enablement/My Apps/ceo"
   npx ts-node scripts/generate-logo.ts
   ```

### Alternative: Manual Generation

If you prefer to generate logos manually, copy the prompts from `ScaleUp-Ventures-Logo-Prompts.md` into:

- [Google AI Studio](https://aistudio.google.com/) - Use Gemini 2.0 Flash with image generation
- [Google Imagen](https://cloud.google.com/vertex-ai/generative-ai/docs/image/overview) - Higher quality output
- Other AI image generators (Midjourney, DALL-E, etc.)

### Files in This Folder

| File | Description |
|------|-------------|
| `ScaleUp-Ventures-Logo-Prompts.md` | Complete prompt specifications for 3 logo concepts |
| `logos/` | Output folder for generated logos |
| `.env.example` | Template for API key configuration |

### Brand Color Reference

```
Primary Navy:    #0F1729
Gold Accent:     #D4A853
Cream Background: #FAF8F5
Secondary Navy:  #1A2744
Muted Gold:      #B8956E
```

### Logo Concepts

1. **Ascending Bars** - Three stair-step bars suggesting methodical growth
2. **Nested Chevrons** - Expanding V-shapes conveying upward momentum
3. **Building Blocks** - Diagonal block arrangement showing calculated ascent

See `ScaleUp-Ventures-Logo-Prompts.md` for full prompt details and strategic rationale.
