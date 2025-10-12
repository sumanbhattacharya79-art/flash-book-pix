-- Add explicit anonymous denial policy to profiles table for defense-in-depth
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR SELECT
TO anon
USING (false);