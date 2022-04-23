import { useEffect } from "react";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { supabase } from "~/supabase.client";
import type { ActionFunction } from "@remix-run/cloudflare";
import { getAuth } from "~/auth.server";
import { Loading, Typography } from "@supabase/ui";

export const action: ActionFunction = async ({ request, context }) => {
  const data = await request.clone().formData()
  const redirectTo = data.get('redirectTo')?.toString() ?? '/'
  await getAuth(context).authenticator.authenticate('sb-auth', request, {
    successRedirect: redirectTo,
    failureRedirect: '/signin'
  })
}

const AuthCallBack = () => {
  const submit = useSubmit()
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  useEffect(() => {
    const { data: authListner } = supabase().auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const formData = new FormData()
        formData.append('session', JSON.stringify(session))
        if (redirectTo) formData.append('redirectTo', redirectTo)
        submit(formData, { method: 'post' })
      }
    })

    return () => {
      authListner?.unsubscribe()
    }

  }, [submit, redirectTo])

  return (
    <div className="auth-container">
      <Loading active><Typography.Text>Authenticating</Typography.Text></Loading>
    </div>
  )
}

export default AuthCallBack;