export const clerkSignInUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in";

export const clerkSignUpUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up";

export const clerkSignInFallbackRedirectUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ?? "/dashboard";

export const clerkSignUpFallbackRedirectUrl =
  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ?? "/dashboard";
