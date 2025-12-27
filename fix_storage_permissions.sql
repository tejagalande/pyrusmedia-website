-- Fix Storage Permissions for 'course-assets' bucket

-- 1. Allow public uploads to 'course-assets'
-- This policy allows the 'anon' role (public users) to upload files.
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT
WITH CHECK ( bucket_id = 'course-assets' );

-- 2. Allow public updates (in case they want to overwrite)
CREATE POLICY "Allow public updates" ON storage.objects
FOR UPDATE
USING ( bucket_id = 'course-assets' )
WITH CHECK ( bucket_id = 'course-assets' );

-- 3. Allow public deletes (so Delete button works)
CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE
USING ( bucket_id = 'course-assets' );

-- 4. Ensure the bucket is public (can also be done in UI)
UPDATE storage.buckets
SET public = true
WHERE id = 'course-assets';
