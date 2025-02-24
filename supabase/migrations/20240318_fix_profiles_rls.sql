-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;

-- Create a new policy that allows inserting profiles during signup
CREATE POLICY "Allow profile creation during signup"
ON profiles FOR INSERT
WITH CHECK (true);

-- Create a policy that allows users to update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Create a policy that allows users to read their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id OR auth.role() = 'anon');