import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gqgakymjuknhvvpkxlmh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxZ2FreW1qdWtuaHZ2cGt4bG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMDY5MjcsImV4cCI6MjA1Nzg4MjkyN30.OgJiKXLoffDC8LRmeo_xgvIuaso_P7-SS4tnNk3saeQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
