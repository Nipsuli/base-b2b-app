import type { AppLoadContext } from "@remix-run/cloudflare";
import {
  createCloudflareKVSessionStorage,
  createCookie,
} from "@remix-run/cloudflare";
import type { Session } from "@supabase/supabase-js";
import { Authenticator, AuthorizationError } from "remix-auth";
import { SupabaseStrategy } from "remix-auth-supabase";
import { supabaseAdmin } from "./supabase.server";

export const getAuth = (context: AppLoadContext) => {
  const sessionCookie = createCookie("__session", {
    secrets: [context.COOKIE_SECRET_1],
    sameSite: true,
  });

  const sessionStorage = createCloudflareKVSessionStorage({
    kv: context.SESSION_KV,
    cookie: sessionCookie,
  });

  const authStrategy = new SupabaseStrategy(
    {
      supabaseClient: supabaseAdmin(context),
      sessionStorage,
      sessionKey: "sb:session",
      sessionErrorKey: "sb:error",
    },
    async ({ req }) => {
      const form = await req.formData();
      const session = form?.get("session");
      if (typeof session !== "string")
        throw new AuthorizationError("session not found");

      return JSON.parse(session);
    }
  );

  const authenticator = new Authenticator<Session>(sessionStorage, {
    sessionKey: authStrategy.sessionKey,
    sessionErrorKey: authStrategy.sessionErrorKey,
  });

  authenticator.use(authStrategy, "sb-auth");

  return {
    authenticator,
    authStrategy,
  };
};

export const getSession = async (
  context: AppLoadContext,
  request: Request,
  redirectBack: boolean = true
) => {
  const redirect = redirectBack
    ? `?redirectTo=${new URL(request.url).pathname}`
    : "";
  return getAuth(context).authStrategy.checkSession(request, {
    failureRedirect: `/signin${redirect}`,
  });
};
