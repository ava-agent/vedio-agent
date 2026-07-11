# Google Cloud API Contracts: Exact Specifications

> Research Date: 2026-03-30
> Purpose: Precise API contracts for Speech-to-Text (Chirp 2), Imagen Edit (Inpainting), and Imagen Upscale
> Status: Dated research snapshot. Re-check model lifecycle, endpoint availability, quotas, and pricing against the linked Google Cloud documentation before implementation.

---

## 1. Vertex AI Speech-to-Text V2 (Chirp 2) -- Synchronous Recognize

### Endpoint

```
POST https://speech.googleapis.com/v2/{recognizer}:recognize
```

Where `{recognizer}` = `projects/{PROJECT_ID}/locations/global/recognizers/_`

The `_` is a wildcard that uses an empty implicit Recognizer (no pre-created recognizer needed).

Full URL example:
```
POST https://speech.googleapis.com/v2/projects/my-project/locations/global/recognizers/_:recognize
```

### Authentication

**OAuth2 Bearer Token** (not API key):
```
Authorization: Bearer $(gcloud auth print-access-token)
```

Required OAuth scope: `https://www.googleapis.com/auth/cloud-platform`
Required IAM permission: `speech.recognizers.recognize`

Programmatic auth:
```python
# Application Default Credentials (recommended)
from google.auth import default
credentials, project = default()

# Or Service Account
from google.oauth2 import service_account
credentials = service_account.Credentials.from_service_account_file('key.json')
```

### Request Body

```json
{
  "config": {
    "model": "chirp_2",
    "languageCodes": ["en-US"],
    "autoDecodingConfig": {},
    "features": {
      "enableWordTimeOffsets": true,
      "enableWordConfidence": true,
      "enableAutomaticPunctuation": true,
      "profanityFilter": false,
      "enableSpokenPunctuation": false,
      "enableSpokenEmojis": false,
      "maxAlternatives": 1
    }
  },
  "content": "BASE64_ENCODED_AUDIO_BYTES"
}
```

**Alternative -- audio from GCS** (use `uri` instead of `content`):
```json
{
  "config": {
    "model": "chirp_2",
    "languageCodes": ["en-US"],
    "autoDecodingConfig": {}
  },
  "uri": "gs://my-bucket/audio/recording.flac"
}
```

### Audio Input: Two Mutually Exclusive Options

| Field | Description |
|-------|-------------|
| `content` | Base64-encoded audio bytes (inline upload) |
| `uri` | GCS URI in format `gs://bucket_name/object_name` |

**Sync limits**: ~60 seconds, ~10 MB. For longer audio, use `BatchRecognize`.

### RecognitionConfig Fields

| Field | Type | Description |
|-------|------|-------------|
| `model` | string | `"chirp_2"` for Chirp 2 model |
| `languageCodes` | string[] | BCP-47 tags, e.g. `["en-US"]`. Multiple = auto-detect |
| `autoDecodingConfig` | object | `{}` -- auto-detects WAV, FLAC, MP3, Opus, AAC, AMR |
| `explicitDecodingConfig` | object | Manual encoding specification (alternative to auto) |
| `features` | object | See RecognitionFeatures below |
| `adaptation` | object | Speech adaptation / phrase biasing |
| `transcriptNormalization` | object | Auto-replace transcript segments |
| `translationConfig` | object | Auto-translate to target language |
| `denoiserConfig` | object | Audio noise reduction |

### ExplicitDecodingConfig (when not using autoDecodingConfig)

```json
{
  "explicitDecodingConfig": {
    "encoding": "FLAC",
    "sampleRateHertz": 16000,
    "audioChannelCount": 1
  }
}
```

**Supported encodings**: `LINEAR16`, `MULAW`, `ALAW`, `AMR`, `AMR_WB`, `FLAC`, `MP3`, `OGG_OPUS`, `WEBM_OPUS`, `MP4_AAC`, `M4A_AAC`, `MOV_AAC`

**Sample rate**: 8000-48000 Hz (optimal: 16000 Hz)
**Channels**: max 8

### RecognitionFeatures

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `enableWordTimeOffsets` | bool | false | Word-level start/end timestamps |
| `enableWordConfidence` | bool | false | Per-word confidence scores |
| `enableAutomaticPunctuation` | bool | true (Chirp 2) | Auto-punctuation |
| `profanityFilter` | bool | false | Replace profanity with `***` |
| `enableSpokenPunctuation` | bool | false | "period" -> "." |
| `enableSpokenEmojis` | bool | false | "smiley face" -> emoji |
| `maxAlternatives` | int | 1 | 0-30 hypotheses |
| `diarizationConfig` | object | -- | **NOT supported on Chirp 2** |

### Response Body

```json
{
  "results": [
    {
      "alternatives": [
        {
          "transcript": "Hello, this is a test recording.",
          "confidence": 0.97,
          "words": [
            {
              "startOffset": "0s",
              "endOffset": "0.400s",
              "word": "Hello",
              "confidence": 0.98,
              "speakerLabel": ""
            },
            {
              "startOffset": "0.400s",
              "endOffset": "0.600s",
              "word": "this",
              "confidence": 0.96,
              "speakerLabel": ""
            },
            {
              "startOffset": "0.600s",
              "endOffset": "0.800s",
              "word": "is",
              "confidence": 0.99,
              "speakerLabel": ""
            },
            {
              "startOffset": "0.800s",
              "endOffset": "0.900s",
              "word": "a",
              "confidence": 0.99,
              "speakerLabel": ""
            },
            {
              "startOffset": "0.900s",
              "endOffset": "1.200s",
              "word": "test",
              "confidence": 0.97,
              "speakerLabel": ""
            },
            {
              "startOffset": "1.200s",
              "endOffset": "1.800s",
              "word": "recording",
              "confidence": 0.95,
              "speakerLabel": ""
            }
          ]
        }
      ],
      "channelTag": 0,
      "resultEndOffset": "2.100s",
      "languageCode": "en-US"
    }
  ],
  "metadata": {
    "requestId": "abc123-def456",
    "totalBilledDuration": "3s"
  }
}
```

### Chirp 2 Model Specifics

- **Model ID**: `chirp_2`
- **Auto punctuation**: Enabled by default
- **Speaker diarization**: NOT supported (use `long` or `latest_long` models instead)
- **Language detection**: NOT supported (must specify `languageCodes`)
- **Word timestamps**: Supported but may slightly degrade quality/speed
- **Speech translation**: Supported (30+ language pairs, primarily to/from English)
- **Batch max duration**: 8 hours
- **Sync max duration**: ~60 seconds

### curl Example

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://speech.googleapis.com/v2/projects/MY_PROJECT/locations/global/recognizers/_:recognize" \
  -d '{
    "config": {
      "model": "chirp_2",
      "languageCodes": ["en-US"],
      "autoDecodingConfig": {},
      "features": {
        "enableWordTimeOffsets": true,
        "enableAutomaticPunctuation": true
      }
    },
    "content": "'$(base64 -w 0 audio.flac)'"
  }'
```

---

## 2. Imagen Edit (Inpainting) on Vertex AI

### Endpoint

```
POST https://{LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/publishers/google/models/imagen-3.0-capability-001:predict
```

Yes, it uses the `:predict` endpoint (same pattern as generate, but different model ID).

**Model ID**: `imagen-3.0-capability-001` (the ONLY model that supports editing as of 2026-03)

**Supported locations**: `us-central1`, `europe-west4`, etc.

### Authentication

```
Authorization: Bearer $(gcloud auth print-access-token)
```

### Request Body -- Inpainting Insert (add object)

```json
{
  "instances": [
    {
      "prompt": "A golden retriever sitting on the grass",
      "referenceImages": [
        {
          "referenceType": "REFERENCE_TYPE_RAW",
          "referenceId": 1,
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_ORIGINAL_IMAGE"
          }
        },
        {
          "referenceType": "REFERENCE_TYPE_MASK",
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_MASK_IMAGE"
          },
          "maskImageConfig": {
            "maskMode": "MASK_MODE_USER_PROVIDED",
            "dilation": 0.01
          }
        }
      ]
    }
  ],
  "parameters": {
    "editMode": "EDIT_MODE_INPAINT_INSERTION",
    "sampleCount": 2,
    "baseSteps": 35,
    "guidanceScale": 60,
    "seed": 1234,
    "negativePrompt": "blurry, low quality",
    "language": "en",
    "personGeneration": "allow_adult",
    "safetySetting": "block_medium_and_above",
    "addWatermark": true,
    "includeRaiReason": true,
    "outputOptions": {
      "mimeType": "image/png",
      "compressionQuality": 90
    },
    "storageUri": "gs://my-bucket/output/"
  }
}
```

### Request Body -- Inpainting Remove (delete object)

```json
{
  "instances": [
    {
      "prompt": "",
      "referenceImages": [
        {
          "referenceType": "REFERENCE_TYPE_RAW",
          "referenceId": 1,
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_ORIGINAL_IMAGE"
          }
        },
        {
          "referenceType": "REFERENCE_TYPE_MASK",
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_MASK_IMAGE"
          },
          "maskImageConfig": {
            "maskMode": "MASK_MODE_USER_PROVIDED",
            "dilation": 0.01
          }
        }
      ]
    }
  ],
  "parameters": {
    "editMode": "EDIT_MODE_INPAINT_REMOVAL",
    "sampleCount": 2,
    "baseSteps": 75,
    "guidanceScale": 75
  }
}
```

### Request Body -- Background Swap

```json
{
  "instances": [
    {
      "prompt": "A tropical beach with palm trees",
      "referenceImages": [
        {
          "referenceType": "REFERENCE_TYPE_RAW",
          "referenceId": 1,
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_ORIGINAL_IMAGE"
          }
        },
        {
          "referenceType": "REFERENCE_TYPE_MASK",
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_MASK_IMAGE"
          },
          "maskImageConfig": {
            "maskMode": "MASK_MODE_BACKGROUND",
            "dilation": 0.0
          }
        }
      ]
    }
  ],
  "parameters": {
    "editMode": "EDIT_MODE_BGSWAP",
    "sampleCount": 2,
    "guidanceScale": 75
  }
}
```

### Request Body -- Outpainting (extend image)

```json
{
  "instances": [
    {
      "prompt": "Continue the mountain landscape",
      "referenceImages": [
        {
          "referenceType": "REFERENCE_TYPE_RAW",
          "referenceId": 1,
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_ORIGINAL_IMAGE"
          }
        },
        {
          "referenceType": "REFERENCE_TYPE_MASK",
          "referenceImage": {
            "bytesBase64Encoded": "BASE64_OF_OUTPAINT_MASK"
          },
          "maskImageConfig": {
            "maskMode": "MASK_MODE_USER_PROVIDED",
            "dilation": 0.03
          }
        }
      ]
    }
  ],
  "parameters": {
    "editMode": "EDIT_MODE_OUTPAINT",
    "sampleCount": 2,
    "guidanceScale": 75
  }
}
```

### Edit Modes

| editMode | Description | Prompt | Recommended dilation |
|----------|-------------|--------|---------------------|
| `EDIT_MODE_INPAINT_INSERTION` | Add objects from prompt into masked area | Required | 0.01 |
| `EDIT_MODE_INPAINT_REMOVAL` | Remove objects, fill background in mask area | Optional (empty string OK) | 0.01 |
| `EDIT_MODE_BGSWAP` | Replace background, preserve unmasked foreground | Required (new background desc) | 0.0 |
| `EDIT_MODE_OUTPAINT` | Extend image into masked boundary area | Required | 0.01-0.03 |

### Mask Modes

| maskMode | Description |
|----------|-------------|
| `MASK_MODE_USER_PROVIDED` | You provide a custom black/white mask image |
| `MASK_MODE_BACKGROUND` | Auto-segment background (no mask image needed) |
| `MASK_MODE_FOREGROUND` | Auto-segment foreground (no mask image needed) |
| `MASK_MODE_SEMANTIC` | Auto-segment by semantic class IDs (specify `maskClasses`) |

### Mask Format Requirements

- Must be a **black and white** image
- **Non-zero (white) pixels** = areas to edit
- **Zero (black) pixels** = areas to preserve
- Must have **identical dimensions** to the base image
- Max 20 MB after PNG transcoding
- Supported formats: PNG, JPEG, GIF, BMP

### Parameters Reference

| Parameter | Type | Default | Range | Notes |
|-----------|------|---------|-------|-------|
| `editMode` | string | -- | See table above | Required |
| `sampleCount` | int | 4 | 1-4 | Number of output images |
| `baseSteps` | int | 75 | -- | Higher = quality, lower = speed. Use 16-35 for small masks |
| `guidanceScale` | int | 60 (insert) / 75 (others) | 0-500 | Prompt adherence strength |
| `seed` | int | random | -- | For reproducibility |
| `negativePrompt` | string | "" | -- | What to avoid |
| `language` | string | "en" | "auto","en","zh","zh-CN","zh-TW","hi","ja","ko","pt","es" | Prompt language |
| `personGeneration` | string | "allow_adult" | "dont_allow","allow_adult","allow_all" | Person generation policy |
| `safetySetting` | string | "block_medium_and_above" | "block_low_and_above","block_medium_and_above","block_only_high","block_none" | Safety filter level |
| `addWatermark` | bool | -- | -- | SynthID watermark |
| `storageUri` | string | -- | -- | GCS URI for output storage |
| `outputOptions.mimeType` | string | "image/png" | "image/png","image/jpeg" | Output format |
| `outputOptions.compressionQuality` | int | 75 | 0-100 | JPEG quality |

### Response Body

```json
{
  "predictions": [
    {
      "bytesBase64Encoded": "/9j/4AAQSkZJRgABAQ...",
      "mimeType": "image/png"
    },
    {
      "bytesBase64Encoded": "/9j/4AAQSkZJRgABAQ...",
      "mimeType": "image/png"
    }
  ]
}
```

Number of items in `predictions` = `sampleCount`. Each prediction is a separate generated edit result.

If `storageUri` is set, the images are also written to that GCS path.

### curl Example

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://us-central1-aiplatform.googleapis.com/v1/projects/MY_PROJECT/locations/us-central1/publishers/google/models/imagen-3.0-capability-001:predict" \
  -d '{
    "instances": [
      {
        "prompt": "A red sports car",
        "referenceImages": [
          {
            "referenceType": "REFERENCE_TYPE_RAW",
            "referenceId": 1,
            "referenceImage": {
              "bytesBase64Encoded": "'$(base64 -w 0 original.png)'"
            }
          },
          {
            "referenceType": "REFERENCE_TYPE_MASK",
            "referenceImage": {
              "bytesBase64Encoded": "'$(base64 -w 0 mask.png)'"
            },
            "maskImageConfig": {
              "maskMode": "MASK_MODE_USER_PROVIDED",
              "dilation": 0.01
            }
          }
        ]
      }
    ],
    "parameters": {
      "editMode": "EDIT_MODE_INPAINT_INSERTION",
      "sampleCount": 2,
      "baseSteps": 35,
      "guidanceScale": 60
    }
  }'
```

---

## 3. Imagen Upscale on Vertex AI

### Endpoint

```
POST https://aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{REGION}/publishers/google/models/imagen-4.0-upscale-preview:predict
```

Yes, it uses the `:predict` endpoint. It is **synchronous**.

**Model ID**: `imagen-4.0-upscale-preview` (Preview status)

### Authentication

```
Authorization: Bearer $(gcloud auth print-access-token)
```

### Request Body

```json
{
  "instances": [
    {
      "prompt": "Upscale the image",
      "image": {
        "bytesBase64Encoded": "BASE64_OF_INPUT_IMAGE"
      }
    }
  ],
  "parameters": {
    "mode": "upscale",
    "upscaleConfig": {
      "upscaleFactor": "x2"
    },
    "outputOptions": {
      "mimeType": "image/png",
      "compressionQuality": 90
    },
    "storageUri": "gs://my-bucket/upscaled/"
  }
}
```

**Alternative -- image from GCS**:
```json
{
  "instances": [
    {
      "prompt": "Upscale the image",
      "image": {
        "gcsUri": "gs://my-bucket/input/photo.png"
      }
    }
  ],
  "parameters": {
    "mode": "upscale",
    "upscaleConfig": {
      "upscaleFactor": "x4"
    }
  }
}
```

### Image Input: Two Options

| Field | Description |
|-------|-------------|
| `image.bytesBase64Encoded` | Base64-encoded image bytes (inline) |
| `image.gcsUri` | GCS URI pointing to the image file |

### Upscale Factor Options

| Factor | Description |
|--------|-------------|
| `"x2"` | 2x resolution increase |
| `"x3"` | 3x resolution increase |
| `"x4"` | 4x resolution increase |

**Constraint**: Output resolution must NOT exceed **17 megapixels**. For example, a 1024x1024 input at x4 = 4096x4096 = 16.7 MP (just under the limit).

### Parameters Reference

| Parameter | Type | Values | Notes |
|-----------|------|--------|-------|
| `mode` | string | `"upscale"` | Required, always "upscale" |
| `upscaleConfig.upscaleFactor` | string | `"x2"`, `"x3"`, `"x4"` | Required |
| `outputOptions.mimeType` | string | `"image/png"`, `"image/jpeg"` | Default: `"image/png"` |
| `outputOptions.compressionQuality` | int | 0-100 | JPEG only. Default: 75 |
| `storageUri` | string | GCS URI | Optional. Also save to GCS |

### Response Body

```json
{
  "predictions": [
    {
      "bytesBase64Encoded": "/9j/4AAQSkZJRgABAQ...",
      "mimeType": "image/png"
    }
  ]
}
```

Always returns exactly 1 prediction (one upscaled image).

### curl Example

```bash
curl -X POST \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json; charset=utf-8" \
  "https://aiplatform.googleapis.com/v1/projects/MY_PROJECT/locations/us-central1/publishers/google/models/imagen-4.0-upscale-preview:predict" \
  -d '{
    "instances": [
      {
        "prompt": "Upscale the image",
        "image": {
          "bytesBase64Encoded": "'$(base64 -w 0 input.png)'"
        }
      }
    ],
    "parameters": {
      "mode": "upscale",
      "upscaleConfig": {
        "upscaleFactor": "x4"
      },
      "outputOptions": {
        "mimeType": "image/png"
      }
    }
  }'
```

---

## Cross-Cutting Concerns

### Authentication (All Three APIs)

All three services use **OAuth2 Bearer Tokens**, NOT API keys.

```bash
# Get token via gcloud
gcloud auth print-access-token

# Header format
Authorization: Bearer ya29.a0ARrdaM...
```

Programmatic (Python):
```python
from google.auth import default
from google.auth.transport.requests import Request

credentials, project = default()
credentials.refresh(Request())
token = credentials.token
```

### Key Differences Between the Three APIs

| Aspect | Speech-to-Text V2 | Imagen Edit | Imagen Upscale |
|--------|-------------------|-------------|----------------|
| Base URL | `speech.googleapis.com` | `{REGION}-aiplatform.googleapis.com` | `aiplatform.googleapis.com` |
| API Version | `/v2/` | `/v1/` | `/v1/` |
| Method suffix | `:recognize` | `:predict` | `:predict` |
| Model ID | `chirp_2` | `imagen-3.0-capability-001` | `imagen-4.0-upscale-preview` |
| Image/Audio input | base64 `content` or `uri` | base64 in `referenceImages` | base64 or `gcsUri` in `image` |
| GCS input support | Yes (`uri` field) | No (base64 only) | Yes (`image.gcsUri`) |
| File upload (inline) | Yes (`content` field) | Yes (base64 in `referenceImage`) | Yes (base64 in `image`) |
| Synchronous | Yes | Yes | Yes |
| Status | GA | GA | Preview |

### Python Client Libraries

```bash
pip install google-cloud-speech            # STT (Chirp 2)
pip install google-cloud-aiplatform        # Imagen Edit + Upscale (Vertex AI)
```

---

## Sources

- [STT V2 recognize REST reference](https://docs.cloud.google.com/speech-to-text/v2/docs/reference/rest/v2/projects.locations.recognizers/recognize)
- [STT V2 sync recognize guide](https://docs.cloud.google.com/speech-to-text/v2/docs/sync-recognize)
- [STT V2 audio encodings](https://docs.cloud.google.com/speech-to-text/v2/docs/encoding)
- [STT Chirp 2 model](https://docs.cloud.google.com/speech-to-text/docs/models/chirp-2)
- [Imagen edit overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/image/edit-images-overview)
- [Imagen upscale guide](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/image/upscale-image)
