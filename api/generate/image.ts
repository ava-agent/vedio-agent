import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { provider, prompt, apiKey, model, size } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' })

  try {
    switch (provider || 'openai') {
      case 'openai': {
        const resp = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model || 'gpt-image-1',
            prompt,
            size: size || '1024x1024',
            n: 1,
          })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.error?.message || `OpenAI API error: ${resp.status}`)
        }
        const data = await resp.json()
        return res.status(200).json({ url: data.data[0]?.url || data.data[0]?.b64_json, provider: 'openai' })
      }

      case 'google': {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model || 'imagen-3.0-generate-002'}:predict?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt }],
            parameters: { sampleCount: 1 }
          })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.error?.message || `Google API error: ${resp.status}`)
        }
        const data = await resp.json()
        const b64 = data.predictions?.[0]?.bytesBase64Encoded
        return res.status(200).json({ url: b64 ? `data:image/png;base64,${b64}` : null, provider: 'google' })
      }

      case 'stability': {
        const formData = new FormData()
        formData.append('prompt', prompt)
        formData.append('output_format', 'png')
        const resp = await fetch('https://api.stability.ai/v2beta/stable-image/generate/sd3', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Accept': 'application/json' },
          body: formData,
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.message || `Stability API error: ${resp.status}`)
        }
        const data = await resp.json()
        return res.status(200).json({ url: `data:image/png;base64,${data.image}`, provider: 'stability' })
      }

      default:
        return res.status(400).json({ error: `Unsupported provider: ${provider}` })
    }
  } catch (e: any) {
    return res.status(502).json({ error: e.message || 'Generation failed' })
  }
}
