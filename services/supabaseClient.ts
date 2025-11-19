import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://itrxvzwempdxmmwlpztx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0cnh2endlbXBkeG1td2xwenR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTUxODEsImV4cCI6MjA3OTA5MTE4MX0.YdVUxRFCuDF42ugMKsD5NPNQ5odIipUbSdcPDpV9T6w';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);