
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cgykmuldggqnewuclpyb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneWttdWxkZ2dxbmV3dWNscHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjE2NzUsImV4cCI6MjA1Mjc5NzY3NX0.HQAnskboq-VuIj2v0VJ9aV7uZLWIZjg7dlNKdqAFFUA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase