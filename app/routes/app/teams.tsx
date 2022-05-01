import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { Form, useTransition } from "@remix-run/react";
import { Button, Input } from "@supabase/ui";
import Title from "@supabase/ui/dist/cjs/components/Typography/Title";
import { getSession, getSupabase } from "~/auth.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  await getSession(context, request);
  return {};
};

export const action: ActionFunction = async ({ request, context }) => {
  const session = await getSession(context, request);
  const supabase = await getSupabase(context, session);
  const formData = await request.formData();
  const { error } = await supabase
    .rpc('create_group', {
      group_name: (formData.get('name') as string)
    })
  if (error) throw error;
  return {};
}

export default function Teams() {
  const { state } = useTransition()
  return (
    <>
      <Title>Teams</Title>
      <Form method="post">
        <div className="sbui--col sbui-space-y-3">
          <Input name="name" label="Create New Team" placeholder="Team name" />
          <Button htmlType="submit" disabled={state === "submitting"}>
            {state === "submitting" ? "Creating..." : "Create team"}
          </Button>
        </div>

      </Form>
    </>
  );
}
