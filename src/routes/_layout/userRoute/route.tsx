import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/_layout/userRoute")({
  component: UserRoute,
});
function UserRoute() {
  return (
    <>
      <Outlet></Outlet>
      <div>UserRouter</div>
    </>
  );
}
