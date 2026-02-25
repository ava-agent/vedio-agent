import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { provider, prompt, apiKey, avatarId } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing script text' })
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' })

  try {
    switch (provider || 'heygen') {
      case 'heygen': {
        const resp = await fetch('https://api.heygen.com/v2/video/generate', {
          method: 'POST',
          headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            video_inputs: [{
              character: {
                type: 'avatar',
                avatar_id: avatarId || 'Angela-inTshirt-20220820',
                avatar_style: 'normal'
              },
              voice: { type: 'text', input_text: prompt, voice_id: '1bd001e7e50f421d891986aad5c1e1e4' }
            }],
            dimension: { width: 1280, height: 720 }
          })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.error?.message || `HeyGen API error: ${resp.status}`)
        }
        const data = await resp.json()
        return res.status(200).json({
          videoId: data.data?.video_id,
          status: 'processing',
          message: '数字人视频生成中，通常需要 2-5 分钟。',
          provider: 'heygen',
        })
      }

      default:
        return res.status(400).json({ error: `Unsupported avatar provider: ${provider}` })
    }
  } catch (e: any) {
    return res.status(502).json({ error: e.message || 'Avatar generation failed' })
  }
}
