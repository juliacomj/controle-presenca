import { SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function createServer(): SupabaseClient {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerComponentClient({ cookies });
};