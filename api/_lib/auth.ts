import type { VercelRequest } from '@vercel/node'
import { getSupabaseAdmin, getSupabaseClient } from './supabase'

export function getToken(req: VercelRequest): string | null {
  return req.body?.token || req.headers.authorization?.replace('Bearer ', '') || null
}

export async function verifyUser(req: VercelRequest) {
  const token = getToken(req)
  if (!token) return null

  const supabase = getSupabaseAdmin()
  const { data } = await supabase.auth.getUser(token)
  return data.user
}

export function getUserSupabase(req: VercelRequest) {
  const token = getToken(req)
  if (!token) return null
  return getSupabaseClient(token)
}
