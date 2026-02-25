import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { provider, prompt, apiKey, voice, model } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing text input' })
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' })

  try {
    switch (provider || 'openai') {
      case 'openai': {
        const resp = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model || 'tts-1',
            input: prompt,
            voice: voice || 'alloy',
          })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.error?.message || `OpenAI TTS error: ${resp.status}`)
        }
        const buffer = await resp.arrayBuffer()
        const b64 = Buffer.from(buffer).toString('base64')
        return res.status(200).json({ url: `data:audio/mpeg;base64,${b64}`, provider: 'openai' })
      }

      case 'elevenlabs': {
        const voiceId = voice || '21m00Tcm4TlvDq8ikWAM'
        const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: prompt,
            model_id: model || 'eleven_multilingual_v2',
          })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.detail?.message || `ElevenLabs error: ${resp.status}`)
        }
        const buffer = await resp.arrayBuffer()
        const b64 = Buffer.from(buffer).toString('base64')
        return res.status(200).json({ url: `data:audio/mpeg;base64,${b64}`, provider: 'elevenlabs' })
      }

      default:
        return res.status(400).json({ error: `Unsupported TTS provider: ${provider}` })
    }
  } catch (e: any) {
    return res.status(502).json({ error: e.message || 'TTS generation failed' })
  }
}
