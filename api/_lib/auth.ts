import type { VercelRequest } from '@vercel/node'
import { getSupabaseAdmin } from './supabase'

export async function verifyUser(req: VercelRequest) {
  const token = req.body?.token || req.headers.authorization?.replace('Bearer ', '')
  if (!token) return null

  const supabase = getSupabaseAdmin()
  const { data } = await supabase.auth.getUser(token)
  return data.user
}
