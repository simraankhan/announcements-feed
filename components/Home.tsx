import { clerkSignInUrl } from "@/lib/auth/clerk-routes";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { isAuthenticated } = await auth();

  redirect(isAuthenticated ? "/dashboard" : clerkSignInUrl);
};

export default Home;
