import { SignUp } from "@clerk/nextjs"

import { clerkAppearance } from "@/lib/auth/clerk-appearance"
import {
  clerkSignInUrl,
  clerkSignUpFallbackRedirectUrl,
  clerkSignUpUrl,
} from "@/lib/auth/clerk-routes"

export default function SignUpPage() {
  return (
    <SignUp
      appearance={clerkAppearance}
      routing="path"
      path={clerkSignUpUrl}
      signInUrl={clerkSignInUrl}
      fallbackRedirectUrl={clerkSignUpFallbackRedirectUrl}
    />
  )
}
