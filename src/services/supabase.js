import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://lcvdifpombzpmxksamsh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjdmRpZnBvbWJ6cG14a3NhbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NDUxNjYsImV4cCI6MjA3MjIyMTE2Nn0.CO26S-1DX5myckkCylH7xbHBGP2hbaMLXhG-45lmuig";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
