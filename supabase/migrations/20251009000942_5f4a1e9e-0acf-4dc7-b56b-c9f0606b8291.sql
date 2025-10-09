-- Fix security issue: Restrict profiles table access
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to view profiles of people they have bookings with
CREATE POLICY "Users can view profiles through bookings"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE (bookings.client_id = auth.uid() AND bookings.photographer_id = profiles.id)
       OR (bookings.photographer_id = auth.uid() AND bookings.client_id = profiles.id)
  )
);

-- Fix security issue: Restrict reviews access and anonymize client identities
-- Drop the public policy
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

-- Only allow authenticated users to view reviews
CREATE POLICY "Authenticated users can view reviews"
ON public.reviews
FOR SELECT
TO authenticated
USING (true);

-- Create a public view for reviews that anonymizes client information
CREATE OR REPLACE VIEW public.public_reviews AS
SELECT 
  r.id,
  r.rating,
  r.comment,
  r.photographer_id,
  r.created_at,
  r.booking_id,
  -- Anonymize client by only showing initials or "Anonymous"
  COALESCE(
    SUBSTRING(p.full_name FROM 1 FOR 1) || '.',
    'Anonymous'
  ) as client_name
FROM public.reviews r
LEFT JOIN public.profiles p ON r.client_id = p.id;

-- Grant select on the view to authenticated users
GRANT SELECT ON public.public_reviews TO authenticated;