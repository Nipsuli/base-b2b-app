import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getSession, getSupabase } from "~/auth.server";
import type { AuthUser } from "@supabase/supabase-js";
import { Form, useLoaderData } from "@remix-run/react";
import { Button, Input, Loading, Typography } from "@supabase/ui";
import { useTransition } from "@remix-run/react";
import type { definitions } from "~/types/supabase";

type UserProfile = {
  authUser: AuthUser;
  user: definitions["users"] | null;
};

export const action: ActionFunction = async ({ request, context }) => {
  const session = await getSession(context, request);
  const supabase = await getSupabase(context, session);
  const formData = await request.formData();
  const { error } = await supabase.from("users").upsert({
    id: session.user?.id,
    email: session.user?.email,
    full_name: formData.get("fullname"),
    display_name: formData.get("displayname"),
  });
  if (error) throw error;
  return {};
};

export const loader: LoaderFunction = async ({ request, context }) => {
  const session = await getSession(context, request);
  const supabase = await getSupabase(context, session);
  const { data, error } = await supabase
    .from<definitions["users"]>("users")
    .select("id,email,full_name,display_name")
    .eq("id", session.user?.id || "")
    .maybeSingle();

  if (error) throw error;

  return json<UserProfile>({
    authUser: session.user ?? (() => {throw new Error('No bonus')})(),
    user: data,
  });
};

const Profile = () => {
  const userProfile = useLoaderData<UserProfile>();
  const { state } = useTransition();
  const email = userProfile.authUser.email;
  const fullName =
    userProfile.user?.full_name ||
    userProfile.authUser.user_metadata?.full_name ||
    "";
  const displayName =
    userProfile.user?.display_name ||
    (userProfile.authUser.user_metadata?.full_name || "").split(" ")[0];
  return (
    <>
      <Typography.Title level={1}>User Profile</Typography.Title>
      <Loading active={state === "submitting"}>
        <Form method="post" replace>
        <div className="sbui--col sbui-space-y-3">
          <Input name="email" label="Email" value={email} disabled />
          <Input
            name="fullname"
            label="Full Name"
            placeholder="Fuspacell Name"
            defaultValue={fullName}
          />
          <Input
            name="displayname"
            label="Display Name"
            placeholder="Display Name"
            defaultValue={displayName}
          />
          <Button htmlType="submit" disabled={state === "submitting"}>
            {state === "submitting" ? "Saving..." : "Save"}
          </Button>
        </div>
        </Form>
      </Loading>
    </>
  );
};

export default Profile;
