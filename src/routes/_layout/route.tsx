import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { isAuthRole } from "../../utils/isAuthRole";

export const Route = createFileRoute("/_layout")({
  beforeLoad: ({ context, location }) => {
    // console.log("Layout context:", context);
    const isAuth = isAuthRole(location, context);
    if (!isAuth) throw redirect({ to: "/" });
  },
  component: Layout,
});
function Layout() {
  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
