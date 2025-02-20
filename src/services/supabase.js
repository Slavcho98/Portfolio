import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rnijtpvzikuojjhcrgna.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuaWp0cHZ6aWt1b2pqaGNyZ25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2ODg5NzAsImV4cCI6MjA1NDI2NDk3MH0.BV71ndp2w0n2sBAzkmVZYjN01qDotn1M53QjhCYQDn8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
