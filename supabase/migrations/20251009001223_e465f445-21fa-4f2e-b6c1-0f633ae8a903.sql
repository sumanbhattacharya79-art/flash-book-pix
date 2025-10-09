-- Fix security definer view issue
-- Drop the public_reviews view as it has security implications
DROP VIEW IF EXISTS public.public_reviews;

-- Instead, we'll rely on the RLS policy on reviews table
-- and handle anonymization in the application layer
-- The reviews table is now only accessible to authenticated users