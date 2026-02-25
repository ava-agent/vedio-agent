import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyUser } from '../_lib/auth'
import { encryptApiKey } from '../_lib/encryption'
import { getSupabaseAdmin } from '../_lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const user = await verifyUser(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const { provider, key } = req.body
  if (!provider || !key) return res.status(400).json({ error: 'Missing provider or key' })

  const secret = process.env.ENCRYPTION_SECRET
  if (!secret) return res.status(500).json({ error: 'Server encryption not configured' })

  const encrypted = encryptApiKey(key, secret)
  const hint = key.slice(-6)
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from('va_api_keys').upsert({
    user_id: user.id,
    provider,
    encrypted_key: encrypted,
    key_hint: hint,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,provider' })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ ok: true, hint })
}
