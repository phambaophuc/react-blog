import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://geucxbpvcyecnjxqlzti.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdldWN4YnB2Y3llY25qeHFsenRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NjkwNjYsImV4cCI6MjA1NjA0NTA2Nn0.V6DQxRpx1zJeZ6OLRSOmRv7xLxDENtBv9BKMts0MsNM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
