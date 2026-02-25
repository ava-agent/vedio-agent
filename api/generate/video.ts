import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { provider, prompt, apiKey } = req.body
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' })
  if (!apiKey) return res.status(400).json({ error: 'Missing API key' })

  try {
    switch (provider || 'runway') {
      case 'runway': {
        // Runway Gen-4 text-to-video
        const resp = await fetch('https://api.dev.runwayml.com/v1/text_to_video', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'X-Runway-Version': '2024-11-06' },
          body: JSON.stringify({ model: 'gen4_turbo', promptText: prompt, duration: 5, ratio: '16:9' })
        })
        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}))
          throw new Error(err.error || `Runway API error: ${resp.status}`)
        }
        const data = await resp.json()
        return res.status(200).json({
          taskId: data.id,
          status: 'processing',
          message: '视频生成中，通常需要 1-3 分钟。请使用 Runway 控制台查看结果。',
          provider: 'runway',
        })
      }

      default:
        return res.status(400).json({ error: `Unsupported video provider: ${provider}` })
    }
  } catch (e: any) {
    return res.status(502).json({ error: e.message || 'Video generation failed' })
  }
}
