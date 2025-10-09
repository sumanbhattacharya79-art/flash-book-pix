-- Fix search_path for all functions to prevent security issues

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'client'::app_role)
  );
  
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update update_photographer_rating function
CREATE OR REPLACE FUNCTION public.update_photographer_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  UPDATE public.photographer_profiles
  SET 
    rating = (
      SELECT AVG(rating)::DECIMAL(3,2)
      FROM public.reviews
      WHERE photographer_id = NEW.photographer_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE photographer_id = NEW.photographer_id
    )
  WHERE user_id = NEW.photographer_id;
  
  RETURN NEW;
END;
$$;