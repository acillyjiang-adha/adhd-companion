// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ❗ 请在 Vercel 的环境变量中设置这两个值
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)