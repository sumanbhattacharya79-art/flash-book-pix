-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('client', 'photographer', 'admin');

-- Create enum for booking status
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create enum for service types
CREATE TYPE public.service_type AS ENUM ('corporate_events', 'product_photography', 'real_estate', 'weddings', 'portraits', 'other');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create photographer_profiles table
CREATE TABLE public.photographer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  specialty TEXT,
  bio TEXT,
  portfolio_urls TEXT[],
  location TEXT,
  price_per_session DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  years_experience INTEGER,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photographer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_type service_type NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  location TEXT,
  special_instructions TEXT,
  price DECIMAL(10,2) NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photographer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(booking_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create photo_galleries table
CREATE TABLE public.photo_galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  photo_urls TEXT[] NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(booking_id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photographer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_galleries ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for photographer_profiles
CREATE POLICY "Anyone can view photographer profiles"
  ON public.photographer_profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Photographers can update own profile"
  ON public.photographer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Photographers can insert own profile"
  ON public.photographer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = client_id OR auth.uid() = photographer_id);

CREATE POLICY "Clients can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients and photographers can update bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = client_id OR auth.uid() = photographer_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (TRUE);

CREATE POLICY "Clients can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = client_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages for their bookings"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = messages.booking_id
      AND (client_id = auth.uid() OR photographer_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages for their bookings"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = booking_id
      AND (client_id = auth.uid() OR photographer_id = auth.uid())
    )
  );

-- RLS Policies for photo_galleries
CREATE POLICY "Users can view photos for their bookings"
  ON public.photo_galleries FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = photo_galleries.booking_id
      AND (client_id = auth.uid() OR photographer_id = auth.uid())
    )
  );

CREATE POLICY "Photographers can upload photos"
  ON public.photo_galleries FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = booking_id AND photographer_id = auth.uid()
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Insert user role based on metadata
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'client'::app_role)
  );
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_photographer_profiles_updated_at
  BEFORE UPDATE ON public.photographer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update photographer rating
CREATE OR REPLACE FUNCTION public.update_photographer_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
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

-- Trigger to update photographer rating when review is created
CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_photographer_rating();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;