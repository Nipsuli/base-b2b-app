import type { LoaderFunction} from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import Title from "@supabase/ui/dist/cjs/components/Typography/Title";
import { getSession } from "~/auth.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  await getSession(context, request);
  return redirect('/app');
};

const Index = () => {
  return (
    <>
      <Title>hello</Title>
    </>
  );
};

export default Index;
