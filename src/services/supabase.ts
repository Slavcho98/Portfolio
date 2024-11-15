import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xnbvokvmqjvlskvnglxf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYnZva3ZtcWp2bHNrdm5nbHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NjUwNjYsImV4cCI6MjA0MDU0MTA2Nn0.DbQCrr5KPj_u9nhMbIpPUtCMur9GwEh1MgxzPhSXKmk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
