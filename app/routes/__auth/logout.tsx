import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare"
import { Form } from "@remix-run/react"
import { Button } from "@supabase/ui"
import { getSession, getAuth } from "~/auth.server"

export const action: ActionFunction = async ({ request, context }) => {
  await getAuth(context).authenticator.logout(request, { redirectTo: '/signin' })
}

export const loader:LoaderFunction = async ({ request, context }) => {
  await getSession(context, request, false)
  return {}
}

const Logout = () => {
  return (
    <>
      <Form method="post">
        <Button className="btn-poo">logout</Button>
      </Form>
    </>
  )
}

export default Logout