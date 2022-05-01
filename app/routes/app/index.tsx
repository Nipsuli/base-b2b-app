import type { LoaderFunction } from "@remix-run/cloudflare";
import Title from "@supabase/ui/dist/cjs/components/Typography/Title";
import { getSession } from "~/auth.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  await getSession(context, request)
  return {}
}

export default function App() {
  return (
    <>
      <Title>This is app</Title>
    </>
  )
}