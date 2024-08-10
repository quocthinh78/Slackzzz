import type { NextApiRequest, NextApiResponse } from "next";
import {
  createServerClient,
  serializeCookieHeader,
  type CookieOptions,
} from "@supabase/ssr";

export default function supabaseServerClientPages(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll(): Promise<{ name: string; value: string }[]> {
          const cookies = req.cookies;
          const cookieArray = Object.entries(cookies).map(([name, value]) => ({
            name,
            value: value ?? "",
          }));
          return Promise.resolve(cookieArray);
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              res.appendHeader(
                "Set-Cookie",
                serializeCookieHeader(name, value, options)
              )
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  return supabase;
}
