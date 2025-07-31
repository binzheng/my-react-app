import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { DashboardLayout, PageContainer } from "@toolpad/core";
import { useAuthRole } from "../../hook/useAuthRole";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});
function Layout() {
  const isAuthRole = useAuthRole();
  const navigation = useNavigate();
  if (!isAuthRole) navigation({ to: "/" });
  return (
    <DashboardLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </DashboardLayout>
  );
}
