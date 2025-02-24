-- First, drop the existing insert policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create a simpler, more permissive policy for profile creation
CREATE POLICY "Enable insert for profile creation"
ON profiles FOR INSERT
WITH CHECK (true);

-- Update the update policy to be more specific
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);