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

export const Logout = () => {
  return (
    <Form action="/logout" method="post">
      <Button>logout</Button>
    </Form>
  )
}

export default Logout