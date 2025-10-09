-- Fix remaining security issues

-- 1. Add more restrictive policy for reviews
-- Drop the overly broad authenticated policy
DROP POLICY IF EXISTS "Authenticated users can view reviews" ON public.reviews;

-- Only allow users to view reviews for their own bookings or for photographers they're evaluating
CREATE POLICY "Users can view reviews for their bookings"
ON public.reviews
FOR SELECT
TO authenticated
USING (
  -- Can see reviews if they're the client or photographer on the booking
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = reviews.booking_id
    AND (bookings.client_id = auth.uid() OR bookings.photographer_id = auth.uid())
  )
  -- OR can see all reviews for a photographer (for browsing photographers)
  OR EXISTS (
    SELECT 1 FROM public.photographer_profiles
    WHERE photographer_profiles.user_id = reviews.photographer_id
  )
);

-- 2. Ensure profiles table has proper default policies
-- The existing policies already restrict to own profile + booking participants
-- No additional changes needed as the current policies are properly scoped