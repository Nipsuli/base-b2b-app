import type { LoaderFunction } from "@remix-run/cloudflare";
import { Form, Link, Outlet } from "@remix-run/react";
import { Typography } from "@supabase/ui";
import { Users } from "react-feather";
import { getSession } from "~/auth.server";
import Logout from "./__auth/logout";

export const loader: LoaderFunction = async ({ request, context }) => {
  await getSession(context, request);
  return {};
};

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3rounded">
        <h2 className="text-xl font-semibold text-center text-red-500">
          <Link to="/app">
            reconfigured
          </Link>
        </h2>
        <div className="flex flex-col justify-between mt-6">
          <aside>
            <ul>
              <li>
                <Link className="flex items-center px-4 py-2 rounded-md" to="/app/userprofile">
                  <Typography.Link>User Profile</Typography.Link>
                </Link>
              </li>
              <li>
                <Link className="flex items-center px-4 py-2 rounded-md" to="/app/teams">
                  <Typography.Link>Teams</Typography.Link>
                </Link>
              </li>
              <li>
                <Form action="/logout" method="post">
                  <button>
                    <Typography.Link className="flex items-center px-4 py-2 rounded-md">Logout</Typography.Link>
                  </button>
                </Form>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-full p-4 m-8 overflow-y-auto">
          {/* <div className="flex p-40 border-4 border-dotted"> */}
            <Outlet />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
