import type { LoaderFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { Typography } from "@supabase/ui";
import Title from "@supabase/ui/dist/cjs/components/Typography/Title";
import { getSession } from "~/auth.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  await getSession(context, request);
  return {};
};

const Index = () => {
  return (
    <>
      <Title>hello</Title>
      <nav>
        <ul>
          <li>
            <Link to="/userprofile">
              <Typography.Link>User Profile</Typography.Link>
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <Typography.Link>Logout</Typography.Link>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Index;
