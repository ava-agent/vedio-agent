import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyUser, getUserSupabase } from '../_lib/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const user = await verifyUser(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const supabase = getUserSupabase(req)
  if (!supabase) return res.status(401).json({ error: 'Unauthorized' })
  const { data, error } = await supabase
    .from('va_api_keys')
    .select('provider, key_hint, updated_at')
    .eq('user_id', user.id)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}
