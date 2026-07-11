# Google Cloud Vertex AI Generative AI Services (Early 2026)

> Research Date: 2026-03-30
> Purpose: Comprehensive catalog of all production-ready GCP AI services for multimedia content creation
> Budget Context: Several hundred dollars in GCP credits
> Status: Dated research snapshot. Model names, lifecycle states, quotas, free tiers, and prices must be re-checked in the linked Google Cloud documentation before use.

---

## Quick Reference: Cost Optimization Strategy

With several hundred dollars in GCP credits:
- **$300 free trial credits** apply to ALL services below (90-day expiry for new accounts)
- Always-free tiers exist for Vision, Translation, STT, TTS, Video Intelligence
- Use **Gemini 2.5 Flash** ($0.15/$0.60 per 1M tokens) for orchestration instead of Pro
- Use **batch APIs** where available (typically 50% cheaper)
- Preview/experimental services are often **free** while in preview

---

## 1. GEMINI LLM MODELS (Text/Multimodal Generation)

### Gemini 3.1 Pro (Flagship)
- **What:** Most capable reasoning model, multimodal (text, image, audio, video input)
- **Model ID:** `gemini-3.1-pro`
- **Pricing:** $2.00 input / $12.00 output per 1M tokens (<=200K context); $4.00/$18.00 (>200K)
- **REST API:** Yes, `generativelanguage.googleapis.com` or Vertex AI endpoint
- **Free Tier:** Limited free usage in Google AI Studio; preview pricing may still apply
- **Status:** GA (replaced Gemini 3 Pro Preview as of March 9, 2026)
- **Use for:** Complex script writing, multi-step reasoning, quality evaluation, orchestration

### Gemini 3 Flash
- **What:** Balanced speed + capability, strong multimodal understanding, thinking levels
- **Model ID:** `gemini-3.0-flash` (public preview)
- **Pricing:** ~$0.30 input / $2.50 output per 1M tokens (estimated, similar to 2.5 Flash tier)
- **REST API:** Yes
- **Free Tier:** Preview = potentially free/discounted
- **Status:** Public Preview
- **Use for:** Real-time agentic tasks, fast multimodal analysis

### Gemini 3.1 Flash-Lite
- **What:** Most cost-effective model, optimized for high-throughput tasks
- **Model ID:** `gemini-3.1-flash-lite`
- **Pricing:** $0.25 input / $1.50 output per 1M tokens
- **REST API:** Yes
- **Free Tier:** Preview pricing
- **Status:** Preview
- **Use for:** Batch content processing, classification, simple generation tasks

### Gemini 2.5 Pro (Proven/Stable)
- **What:** Proven multimodal reasoning, stable GA model
- **Model ID:** `gemini-2.5-pro`
- **Pricing:** $1.25 input / $10.00 output per 1M tokens (<=200K); higher beyond 200K
- **REST API:** Yes
- **Free Tier:** Limited in AI Studio
- **Status:** GA
- **Use for:** Production workloads requiring proven stability

### Gemini 2.5 Flash (Best Value for Production)
- **What:** Fast, cheap, multimodal — best price/performance ratio for most tasks
- **Model ID:** `gemini-2.5-flash`
- **Pricing:** $0.15 input / $0.60 output per 1M tokens (non-thinking); $0.30/$2.50 (thinking)
- **REST API:** Yes
- **Free Tier:** 15 RPM free in Google AI Studio
- **Status:** GA
- **RECOMMENDED** for MCP orchestration layer — cheapest GA model

### Gemini 2.5 Flash-Lite
- **What:** Ultra-cheap, narrower capability but extremely cost-effective
- **Model ID:** `gemini-2.5-flash-lite`
- **Pricing:** $0.10 input / $0.40 output per 1M tokens
- **REST API:** Yes
- **Status:** GA
- **Use for:** Simple classification, tagging, bulk processing

---

## 2. IMAGE GENERATION (Imagen)

### Imagen 4 Ultra
- **What:** Highest quality AI image generation, photorealistic output
- **Model ID:** `imagen-4.0-generate-001` (Ultra tier)
- **Pricing:** $0.06 per image
- **REST API:** Yes — `POST /v1/projects/{project}/locations/{location}/publishers/google/models/imagen-4.0-generate-001:predict`
- **Free Tier:** ~15 RPM free in Google AI Studio; $300 credits apply
- **Status:** GA
- **Use for:** Hero images, product photos, high-quality content

### Imagen 4 Standard
- **What:** Balanced quality/cost image generation
- **Model ID:** `imagen-4.0-generate-001` (Standard config)
- **Pricing:** $0.04 per image
- **REST API:** Yes
- **Status:** GA

### Imagen 4 Fast
- **What:** Speed-optimized image generation
- **Model ID:** `imagen-4.0-generate-001` (Fast config)
- **Pricing:** $0.02 per image
- **REST API:** Yes
- **Status:** GA
- **Use for:** Thumbnails, draft iterations, bulk image generation

### Imagen Editing (Inpainting/Outpainting)
- **What:** Edit existing images — insert/remove objects via mask-based inpainting
- **Model ID:** `imagen-2.0-edit-001` (editing model @006)
- **Pricing:** ~$0.04 per edit operation
- **REST API:** Yes
- **Status:** GA
- **Use for:** Product photo editing, background replacement, object removal

### Imagen Upscale
- **What:** AI upscaling — increase image resolution without quality loss
- **Model ID:** `imagen-4.0-upscale-001` (Preview)
- **Pricing:** Not yet publicly disclosed (Preview)
- **REST API:** Yes
- **Status:** Preview
- **Use for:** Upscaling generated images from 1024px to 4K+

### Gemini 3 Pro Image Generation
- **What:** Gemini model fine-tuned for image generation/editing (alternative to Imagen)
- **Pricing:** ~$0.035 per standard image
- **REST API:** Yes (via Gemini API)
- **Status:** GA
- **Use for:** Mixed text+image generation in a single model call

---

## 3. VIDEO GENERATION (Veo)

### Veo 3.1 (Latest)
- **What:** Latest generation text/image-to-video, supports audio generation
- **Model ID:** `veo-3.1-generate-001`
- **Pricing:**
  - Standard (no audio): ~$0.10/second
  - With audio: higher tier (pricing TBD for GA)
  - Fast variant: `veo-3.1-fast-generate-preview`
- **REST API:** Yes — `POST /v1/projects/{project}/locations/us-central1/publishers/google/models/veo-3.1-generate-001:generateVideo`
- **Free Tier:** Preview models may be discounted
- **Status:** Preview → migrating to GA (preview endpoints deprecated April 2, 2026)
- **Use for:** Highest quality video generation with optional synchronized audio

### Veo 3.0
- **What:** Text/image-to-video with optional audio
- **Model ID:** `veo-3.0-generate-preview`
- **Pricing:** $0.50/sec (video only), $0.75/sec (video + audio)
- **REST API:** Yes
- **Status:** Preview
- **Use for:** Video generation when audio sync is needed

### Veo 2
- **What:** Proven video generation model
- **Model ID:** `veo-2.0-generate-001`
- **Pricing:** $0.50/sec on Vertex AI ($0.35/sec on Gemini API)
- **REST API:** Yes
- **Status:** GA
- **Use for:** Reliable production video generation

### Key Veo Capabilities
- Text-to-video
- Image-to-video (use first frame/reference image)
- First+last frame interpolation
- Video extension
- Max 8 seconds per generation (chain for longer)
- Output stored to GCS bucket

**Python Example:**
```python
from google import genai
from google.genai.types import GenerateVideosConfig

client = genai.Client(project="PROJECT_ID", location="us-central1")
response = client.models.generate_videos(
    model="veo-3.1-generate-001",
    prompt="A cinematic shot of a mountain sunrise",
    config=GenerateVideosConfig(
        output_gcs_uri="gs://my-bucket/output/"
    )
)
```

---

## 4. MUSIC GENERATION (Lyria)

### Lyria 3 Pro (Latest)
- **What:** AI music generation — full songs with verses, choruses, bridges up to 3 minutes
- **Model ID:** `lyria-3-pro-preview`
- **Pricing:** Not officially disclosed yet (public preview). Lyria 2 was $0.06/30sec
- **REST API:** Yes — via Gemini API on Vertex AI
- **Free Tier:** Preview = likely discounted or free
- **Status:** Public Preview (announced March 25, 2026)
- **Features:**
  - Up to 3-minute tracks
  - Structured composition (intro, verse, chorus, bridge)
  - SynthID watermark embedded
  - Available in Vertex AI, Google AI Studio, Gemini API
- **Use for:** Background music for videos, podcast intros, content creation

### Lyria 2
- **What:** Previous generation music generation
- **Model ID:** `lyria-002`
- **Pricing:** $0.06 per 30 seconds of generated audio
- **REST API:** Yes
- **Status:** GA
- **Use for:** Shorter background music clips, production-stable music generation

---

## 5. SPEECH-TO-TEXT (Chirp / Cloud STT)

### Chirp (Universal Speech Model) on Vertex AI
- **What:** 2B-parameter model, 125+ languages, highest accuracy for long-tail languages
- **Model ID:** `chirp` / `chirp_2` (via Cloud Speech-to-Text V2 API)
- **Pricing:** ~$0.016/min (standard); volume discounts to $0.004/min
- **REST API:** Yes — `speech.googleapis.com` (V2 API)
- **Free Tier:** First 60 minutes/month free
- **Status:** GA
- **Use for:** Video transcription, subtitle generation, multilingual content

### Cloud Speech-to-Text V2
- **What:** Standard STT with multiple model options
- **Pricing Tiers:**
  - Standard models: $0.006/15 sec (~$0.024/min)
  - Enhanced models: higher pricing
  - Data logging discount: 33% off if you allow Google to log data
- **REST API:** Yes
- **Free Tier:** 60 minutes/month free
- **Status:** GA

### Key STT Features
- Real-time streaming transcription
- Batch transcription
- Speaker diarization
- Word-level timestamps (critical for subtitle generation)
- Automatic punctuation
- Multi-channel recognition

---

## 6. TEXT-TO-SPEECH (Chirp 3 HD / Cloud TTS)

### Chirp 3 HD Voices
- **What:** LLM-powered high-fidelity voices, natural intonation, 30+ styles, 31 languages
- **Pricing:** $30 per 1M characters
- **REST API:** Yes — `texttospeech.googleapis.com`
- **Free Tier:** Included in $300 credits
- **Status:** GA
- **Use for:** Premium voiceover for videos, audiobooks, professional narration

### Chirp 3 Instant Custom Voice (Voice Cloning)
- **What:** Clone a voice from just 10 seconds of audio input
- **Pricing:** $60 per 1M characters
- **REST API:** Yes (requires allowlist approval)
- **Free Tier:** Included in $300 credits
- **Status:** GA (allowlist required)
- **Use for:** Personalized brand voice, consistent narrator across videos
- **Note:** Requires safety verification for voice ownership

### Gemini-TTS
- **What:** Gemini-powered text-to-speech (newest offering)
- **REST API:** Yes
- **Status:** Preview
- **Use for:** Next-gen TTS with Gemini's language understanding

### WaveNet Voices
- **What:** DeepMind WaveNet neural network voices
- **Pricing:** $16 per 1M characters
- **REST API:** Yes
- **Free Tier:** First 1M characters/month free
- **Status:** GA

### Neural2 Voices
- **What:** Improved neural voices
- **Pricing:** $16 per 1M characters
- **REST API:** Yes
- **Free Tier:** First 1M characters/month free
- **Status:** GA

### Standard Voices
- **What:** Basic concatenative synthesis
- **Pricing:** $4 per 1M characters
- **REST API:** Yes
- **Free Tier:** First 4M characters/month free
- **Status:** GA
- **Use for:** Bulk/draft narration where cost matters more than quality

---

## 7. TEXT EMBEDDINGS (for RAG/Search)

### Gemini Embedding (Recommended)
- **What:** Latest embedding model supporting text, images, and audio
- **Model ID:** `gemini-embedding-002` (or `text-embedding-005`)
- **Pricing:** $0.20 per 1M text input tokens ($0.10 for batch)
- **REST API:** Yes
- **Free Tier:** Limited free in AI Studio
- **Status:** GA (Gemini Embedding); Preview (multimodal)
- **Use for:** Semantic search, RAG pipelines, content similarity matching

### Text Embedding (Legacy)
- **What:** Text-only embeddings
- **Model ID:** `text-embedding-004`
- **Pricing:** $0.000025/1,000 characters (online); $0.00002/1,000 chars (batch)
- **REST API:** Yes
- **Status:** GA
- **Use for:** Budget RAG systems, classification

### Multimodal Embeddings
- **What:** Vector representations from images, text, and video
- **Model ID:** `multimodalembedding@001`
- **Pricing:** Per-character pricing (similar to text embeddings)
- **REST API:** Yes
- **Status:** GA
- **Use for:** Cross-modal search (find images by text description)

---

## 8. IMAGE ANALYSIS (Cloud Vision API)

### Cloud Vision API
- **What:** Pre-trained image analysis — OCR, label detection, face detection, object localization, SafeSearch, logo detection, landmark detection
- **Pricing (per 1,000 units):**
  - Label/Text(OCR)/Face/Logo Detection: $1.50
  - Web Detection: $3.50
  - Object Localization: $2.25
  - Document Text Detection (OCR): $1.50
  - Safe Search Detection: $1.50
- **REST API:** Yes — `vision.googleapis.com`
- **Free Tier:** First 1,000 units/month free (per feature)
- **Status:** GA
- **Use for:** Content moderation (SafeSearch), OCR, image tagging, NSFW filtering

---

## 9. VIDEO ANALYSIS (Video Intelligence API)

### Video Intelligence API
- **What:** Pre-trained video analysis — label detection, shot detection, explicit content detection, object tracking, text detection, speech transcription, face detection, logo detection
- **Pricing (per minute of video):**
  - Label Detection: $0.10/min
  - Shot Change Detection: $0.05/min
  - Explicit Content Detection: $0.10/min
  - Speech Transcription: $0.048/min
  - Object Tracking: $0.15/min
  - Text Detection: $0.15/min
  - Logo Detection: $0.15/min
- **REST API:** Yes — `videointelligence.googleapis.com`
- **Free Tier:** 1,000 units/month free
- **Status:** GA
- **Use for:** Video content moderation, auto-tagging, scene detection, extracting metadata

---

## 10. TRANSLATION (Cloud Translation API)

### Cloud Translation Advanced (v3)
- **What:** Neural machine translation with glossaries, custom models, document translation
- **Pricing:** $20 per 1M characters (NMT); $0.08/page (document translation)
- **REST API:** Yes — `translate.googleapis.com`
- **Free Tier:** 500,000 characters/month free (never expires)
- **Status:** GA
- **Features:**
  - 100+ languages
  - Glossary support for consistent terminology
  - Batch translation
  - Document translation (PDF, DOCX, PPT)
  - Custom model training ($45/hr, max $300/job)
- **Use for:** Multilingual subtitle generation, content localization

---

## 11. NATURAL LANGUAGE API

### Cloud Natural Language API
- **What:** Text analysis — sentiment analysis, entity recognition, syntax analysis, content classification
- **Pricing:** ~$1-2 per 1,000 units (varies by feature)
- **REST API:** Yes — `language.googleapis.com`
- **Free Tier:** First 5,000 units/month free
- **Status:** GA
- **Use for:** Script sentiment analysis, content categorization, entity extraction

---

## 12. GROUNDING (Google Search / Custom)

### Grounding with Google Search
- **What:** Ground Gemini responses with real-time Google Search results
- **Pricing:** $35 per 1,000 grounded prompts
- **REST API:** Yes (part of Gemini API on Vertex AI)
- **Free Tier:** Free while using Gemini 2.0 Flash Live API in Preview
- **Status:** GA
- **Use for:** Fact-checked content generation, real-time information in scripts

### Web Grounding for Enterprise
- **Pricing:** $45 per 1,000 grounded prompts
- **Status:** GA

### Google Maps Grounding
- **Pricing:** $25 per 1,000 grounded prompts
- **Status:** GA

---

## 13. DOCUMENT AI

### Document AI
- **What:** Extract structured data from documents (invoices, receipts, forms, etc.)
- **Pricing:** $20-30 per 1,000 pages (varies by processor type)
- **REST API:** Yes — `documentai.googleapis.com`
- **Free Tier:** Included in $300 credits
- **Status:** GA
- **Use for:** Processing reference materials, extracting data from scripts/briefs

---

## 14. VERTEX AI SEARCH (AI-Powered Search)

### Vertex AI Search
- **What:** Build search engines over your own data with AI understanding
- **Pricing:** $2.50 per 1,000 queries (search); $1/1,000 queries (recommendations)
- **REST API:** Yes
- **Free Tier:** Included in $300 credits
- **Status:** GA
- **Use for:** Searching across generated content library, finding relevant assets

---

## Summary: Complete Service Matrix for MCP Integration

| # | Service | Model ID | $/Unit | Free Tier | GA? | REST API? | Priority for MCP |
|---|---------|----------|--------|-----------|-----|-----------|-----------------|
| 1 | **Gemini 2.5 Flash** | `gemini-2.5-flash` | $0.15/1M in | 15 RPM free | GA | Yes | **P0** — Orchestration |
| 2 | **Imagen 4 Fast** | `imagen-4.0-generate-001` | $0.02/img | ~15 RPM | GA | Yes | **P0** — Image gen |
| 3 | **Imagen 4 Ultra** | `imagen-4.0-generate-001` | $0.06/img | — | GA | Yes | P1 — Premium images |
| 4 | **Imagen Edit** | `imagen-2.0-edit-001` | ~$0.04/edit | — | GA | Yes | P1 — Inpainting |
| 5 | **Imagen Upscale** | `imagen-4.0-upscale-001` | TBD | — | Preview | Yes | P1 — Upscaling |
| 6 | **Veo 2** | `veo-2.0-generate-001` | $0.50/sec | — | GA | Yes | **P0** — Video gen |
| 7 | **Veo 3.1** | `veo-3.1-generate-001` | ~$0.10/sec | Preview discount | Preview→GA | Yes | P0 — Video gen (newer) |
| 8 | **Lyria 2** | `lyria-002` | $0.06/30s | — | GA | Yes | **P0** — Music gen |
| 9 | **Lyria 3 Pro** | `lyria-3-pro-preview` | TBD | Preview free? | Preview | Yes | P1 — Music gen (newer) |
| 10 | **Chirp STT** | `chirp_2` | $0.016/min | 60 min/mo | GA | Yes | **P0** — Transcription |
| 11 | **Chirp 3 HD TTS** | via Cloud TTS API | $30/1M chars | In $300 credits | GA | Yes | **P0** — Voiceover |
| 12 | **WaveNet TTS** | via Cloud TTS API | $16/1M chars | 1M chars/mo | GA | Yes | P1 — Budget TTS |
| 13 | **Custom Voice TTS** | via Cloud TTS API | $60/1M chars | Allowlist | GA | Yes | P2 — Voice clone |
| 14 | **Gemini Embedding** | `gemini-embedding-002` | $0.20/1M tok | Limited | GA | Yes | P1 — RAG/search |
| 15 | **Cloud Vision** | N/A | $1.50/1K units | 1K/mo | GA | Yes | P1 — Content safety |
| 16 | **Video Intelligence** | N/A | $0.10/min | 1K units/mo | GA | Yes | P1 — Video analysis |
| 17 | **Translation v3** | N/A | $20/1M chars | 500K chars/mo | GA | Yes | P1 — Localization |
| 18 | **Natural Language** | N/A | ~$1/1K units | 5K/mo | GA | Yes | P2 — Text analysis |
| 19 | **Grounding (Search)** | via Gemini API | $35/1K prompts | Preview free | GA | Yes | P2 — Fact-checking |
| 20 | **Document AI** | N/A | $20/1K pages | In credits | GA | Yes | P3 — Doc processing |

---

## Budget Estimation: $300 Credits Allocation

With $300 in GCP credits, here is a rough allocation for building AI multimedia tools:

| Service | Budget | What You Get |
|---------|--------|-------------|
| Gemini 2.5 Flash (orchestration) | $20 | ~130M input tokens / ~33M output tokens |
| Imagen 4 Fast (images) | $40 | ~2,000 images |
| Imagen 4 Ultra (hero images) | $20 | ~333 premium images |
| Veo 3.1 (video clips) | $80 | ~800 seconds (100+ 8-sec clips) |
| Lyria 2 (music) | $20 | ~166 x 30-sec tracks |
| Chirp STT (transcription) | $15 | ~937 minutes of audio |
| Chirp 3 HD TTS (voiceover) | $30 | ~1M characters (~2.5 hours of speech) |
| WaveNet TTS (draft VO) | $15 | ~937K characters |
| Cloud Vision (safety) | $10 | ~6,666 images analyzed |
| Translation v3 | $10 | ~500K characters |
| Embeddings | $10 | ~50M tokens embedded |
| Buffer/misc | $30 | Reserve for testing |
| **Total** | **$300** | |

---

## Python MCP Integration Notes

All services listed above have REST APIs and can be called from a Python MCP server. The recommended approach:

### Authentication
```python
# Option 1: Application Default Credentials (recommended)
from google.auth import default
credentials, project = default()

# Option 2: Service Account Key
from google.oauth2 import service_account
credentials = service_account.Credentials.from_service_account_file('key.json')
```

### Client Libraries
```bash
pip install google-cloud-aiplatform        # Vertex AI (Gemini, Imagen, Veo, Lyria)
pip install google-cloud-texttospeech      # TTS
pip install google-cloud-speech            # STT
pip install google-cloud-translate         # Translation
pip install google-cloud-vision            # Vision
pip install google-cloud-videointelligence # Video Intelligence
pip install google-cloud-language          # Natural Language
```

### Key Consideration for MCP
- All APIs are async-compatible (important for MCP tool handlers)
- Veo video generation is async by nature (returns operation ID, poll for result)
- Lyria music generation is similarly async
- Consider implementing a unified `poll_operation()` tool for all long-running operations

---

## Sources

- [Vertex AI Generative AI Pricing](https://cloud.google.com/vertex-ai/docs/generative-ai/pricing)
- [Google Models on Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models)
- [Imagen 4 Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/imagen/4-0-generate)
- [Imagen 4 Upscale Preview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/imagen/4-0-upscale)
- [Veo 3.1 Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate)
- [Veo Video Generation API Reference](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/veo-video-generation)
- [Lyria Music Generation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/music/generate-music)
- [Lyria 3 Pro Announcement](https://blog.google/innovation-and-ai/technology/ai/lyria-3-pro/)
- [Lyria API Reference](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/lyria-music-generation)
- [Chirp STT on Vertex AI](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/speech/speech-to-text)
- [Cloud Text-to-Speech Pricing](https://cloud.google.com/text-to-speech/pricing)
- [Chirp 3 HD Voices](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd)
- [Chirp 3 Instant Custom Voice](https://docs.cloud.google.com/text-to-speech/docs/chirp3-instant-custom-voice)
- [Gemini-TTS](https://docs.cloud.google.com/text-to-speech/docs/gemini-tts)
- [Cloud Speech-to-Text Pricing](https://cloud.google.com/speech-to-text/pricing)
- [Cloud Vision API Pricing](https://cloud.google.com/vision/pricing)
- [Video Intelligence API Pricing](https://cloud.google.com/video-intelligence/pricing)
- [Cloud Translation Pricing](https://cloud.google.com/translate/pricing)
- [Natural Language API Pricing](https://cloud.google.com/natural-language/pricing)
- [Document AI Pricing](https://cloud.google.com/document-ai/pricing)
- [Grounding with Google Search](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search)
- [GCP Free Tier](https://cloud.google.com/free)
- [Vertex AI Complete 2026 Pricing Guide (nops.io)](https://www.nops.io/blog/vertex-ai-pricing/)
- [Vertex AI Top 16 Services Pricing (finout.io)](https://www.finout.io/blog/top-16-vertex-services-in-2026)
- [Gemini 3.1 Flash-Lite Announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/)
- [Gemini 3 Flash Documentation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/3-flash)
