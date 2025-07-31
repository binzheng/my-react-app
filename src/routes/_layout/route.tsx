import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout, PageContainer } from "@toolpad/core";

export const Route = createFileRoute("/_layout")({
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
