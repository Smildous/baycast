-- Migration 004: Add onboarding_complete flag to profiles
-- Tracks whether a new user has completed the guided onboarding flow.
-- Part of UX_IMPROVEMENTS_SPRINT5 (AQ-162).

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN NOT NULL DEFAULT false;

-- Index for quickly finding users who haven't completed onboarding
CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_complete
ON profiles (onboarding_complete)
WHERE onboarding_complete = false;

-- Comment for documentation
COMMENT ON COLUMN profiles.onboarding_complete IS
'Whether the user has completed the guided onboarding flow (submitted their first forecast).';
