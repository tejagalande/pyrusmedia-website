-- Add thumbnail_url column to courses table
ALTER TABLE public.courses 
ADD COLUMN thumbnail_url TEXT;

-- Create storage bucket policy (if not created via UI)
-- Note: It is often easier to create the bucket 'course-assets' directly in the Supabase Dashboard UI.
-- Ensuring the bucket is Public is key.

-- Policy to allow public access to the bucket
-- (You still need to create the bucket 'course-assets' in the dashboard first!)
-- CREATE POLICY "Give public access to course-assets" ON storage.objects FOR SELECT USING ( bucket_id = 'course-assets' );
-- CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'course-assets' );
