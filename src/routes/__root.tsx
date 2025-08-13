import { Dashboard } from "@mui/icons-material";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { NavigationItem } from "@toolpad/core";
import { TanStackRouterAppProvider } from "@toolpad/core/tanstack-router";
import { GlobalLoading } from "../component/globalLoading";
import { NotificationDialog } from "../component/notificationDialog";
import { type AuthContextType, useAuth } from "../hook/useAuth";
import { NotificationProvider } from "../hook/useNotificationContext";
import { filterNavigation } from "../utils/isAuthRole";

type NavigationItemWithRoles = NavigationItem & {
  allowRoles?: ("admin" | "sales")[];
};

export type NavigationWithRoles = NavigationItemWithRoles[];

export const NAVIGATION: NavigationWithRoles = [
  { segment: "", title: "Index", icon: <Dashboard /> },
  { segment: "home", title: "Home", icon: <Dashboard /> },
  {
    kind: "header",
    title: "User",
  },
  {
    segment: "user",
    title: "User",
    icon: <Dashboard />,
    pattern: "user{/:userId}",
    allowRoles: ["admin"],
  },
  {
    segment: "userLoader",
    title: "UserLoader",
    icon: <Dashboard />,
    pattern: "user{/:userId}",
    allowRoles: ["admin"],
  },
  {
    segment: "userRoute",
    title: "UserRoute",
    icon: <Dashboard />,
    pattern: "user{/:userId}",
    allowRoles: ["admin"],
  },
  {
    segment: "userModal",
    title: "UserModal",
    icon: <Dashboard />,
    allowRoles: ["sales"],
  },
  {
    segment: "userValidation",
    title: "UserValidation",
    icon: <Dashboard />,
    allowRoles: ["sales", "admin"],
  },
  {
    segment: "userDirty",
    title: "UserDirty",
    icon: <Dashboard />,
  },
  {
    kind: "header",
    title: "UserError",
  },
  {
    segment: "userIndexError",
    title: "UserIndexError",
    icon: <Dashboard />,
  },
  {
    segment: "userFindError",
    title: "UserFindError",
    icon: <Dashboard />,
  },
  {
    segment: "userSaveError",
    title: "UserSaveError",
    icon: <Dashboard />,
  },
];
const BRANDING = {
  title: "My React Core App",
  logo: <img src="/vite.svg" alt="Logo" style={{ width: 24, height: 24 }} />,
};
function App() {
  const { authUser } = useAuth();
  const navigation = filterNavigation(authUser?.roleId);
  return (
    <TanStackRouterAppProvider navigation={navigation} branding={BRANDING}>
      <GlobalLoading />
      <NotificationProvider>
        <NotificationDialog />
        <Outlet />
      </NotificationProvider>
    </TanStackRouterAppProvider>
  );
}
interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({ component: App });
