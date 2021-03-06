import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import DarkModeToggle from "./components/darkModeToggle";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "reconfigured",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = ({ context }) => {
  if (!context.SUPABASE_URL) throw new Error("SUPABASE_URL is required");

  if (!context.PUBLIC_SUPABASE_ANON_KEY)
    throw new Error("PUBLIC_SUPABASE_ANON_KEY is required");

  return {
    env: {
      SUPABASE_URL: context.SUPABASE_URL,
      PUBLIC_SUPABASE_ANON_KEY: context.PUBLIC_SUPABASE_ANON_KEY,
    },
  };
};

export default function App() {
  const { env } = useLoaderData<Window>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <DarkModeToggle />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
