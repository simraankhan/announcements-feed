import { SignIn } from "@clerk/nextjs"

import { clerkAppearance } from "@/lib/auth/clerk-appearance"
import {
  clerkSignInFallbackRedirectUrl,
  clerkSignInUrl,
  clerkSignUpUrl,
} from "@/lib/auth/clerk-routes"

export default function SignInPage() {
  return (
    <SignIn
      appearance={clerkAppearance}
      routing="path"
      path={clerkSignInUrl}
      signUpUrl={clerkSignUpUrl}
      fallbackRedirectUrl={clerkSignInFallbackRedirectUrl}
    />
  )
}
