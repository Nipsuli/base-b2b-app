import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getSession } from "~/auth.server";
import type { AuthUser } from "@supabase/supabase-js";
import { useLoaderData } from "@remix-run/react";
import { Typography } from "@supabase/ui";

export const loader: LoaderFunction = async ({ request, context }) => {
  const session = await getSession(context, request)

  if (!session.user) throw new Response("No user found", { status: 401 })

  return json<AuthUser>(session.user)
}

const Profile = () => {
  const user = useLoaderData<AuthUser>()
  return (
    <>
      <Typography.Title level={1}>User Profile</Typography.Title>
      <Typography.Text>Hello {user.email}! Full user data:</Typography.Text>
      <Typography.Text><pre>{JSON.stringify(user, undefined, 2)}</pre></Typography.Text>
    </>
  )
}

export default Profile