import { useState, useEffect } from "react";
import { Auth } from "@supabase/ui";
import { supabase } from "~/supabase.client";
import styles from "~/routes/__auth/auth.css"

export const links = () => {
  // using tailwind only in signin with supabase
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",
    },
    {
      rel: "stylesheet",
      href: styles
    }
  ];
};

const Index = () => {
  const [isClient, setIsclient] = useState(false);
  useEffect(() => setIsclient(true), []);

  if (isClient) {
    return (
      <Auth
        className="dark auth-box"
        providers={["google"]}
        supabaseClient={supabase()}
        magicLink={true}
        view={"magic_link"}
      />
    );
  }
  return "";
};

export default Index;
