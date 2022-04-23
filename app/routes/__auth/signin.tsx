import { useState, useEffect } from "react";
import { Auth } from "@supabase/ui";
import { supabase } from "~/supabase.client";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, useSearchParams } from "@remix-run/react";

export const loader: LoaderFunction = ({ context }) => {
  if (!context.SERVER_URL) throw new Error("SEVER_URL is required");

  return {
    server_url: context.SERVER_URL,
  };
};

const Index = () => {
  const [isClient, setIsclient] = useState(false);
  useEffect(() => setIsclient(true), []);
  const { server_url } = useLoaderData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  if (isClient) {
    return (
      <Auth
        className="auth-container"
        providers={["google"]}
        supabaseClient={supabase()}
        magicLink={true}
        view={"magic_link"}
        redirectTo={`${server_url}/auth/callback${
          redirectTo ? "?redirectTo=" + redirectTo : ""
        }`}
      />
    );
  }
  return "";
};

export default Index;
