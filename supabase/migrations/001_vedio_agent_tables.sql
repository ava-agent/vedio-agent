-- vedio-agent tables (prefixed with va_ to avoid conflicts with other apps)

CREATE TABLE public.va_api_keys (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  key_hint TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

CREATE TABLE public.va_generations (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('image', 'tts', 'video', 'avatar')),
  provider TEXT NOT NULL,
  prompt TEXT NOT NULL,
  result_url TEXT,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}',
  cost_estimate NUMERIC(10,4),
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_va_generations_user_created ON public.va_generations(user_id, created_at DESC);
CREATE INDEX idx_va_generations_type ON public.va_generations(type);

ALTER TABLE public.va_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.va_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own va keys" ON public.va_api_keys
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own va generations" ON public.va_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own va generations" ON public.va_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
