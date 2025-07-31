import { useLocation } from "@tanstack/react-router";
import { NAVIGATION, type NavigationWithRoles } from "../routes/__root";

export const useAuthRole = (): boolean => {
  const location = useLocation();
  const currentPath = location.pathname;
  const match = NAVIGATION.find((item) => {
    if ("segment" in item && item.segment !== undefined) {
      return currentPath === `/${item.segment}`;
    }
    // if ("pattern" in item && item.pattern !== undefined) {
    //   const regex = new RegExp("^/" + item.pattern.replace("{/:userId}", "/[^/]+") + "$");
    //   return regex.test(currentPath);
    // }
    return false;
  });
  const userRole = "admin";
  console.log(location.pathname);
  console.log(match?.allowRoles);
  if (match?.allowRoles) {
    return match?.allowRoles.includes(userRole);
  } else {
    return true;
  }
};

export const useFilterNavigation = (): NavigationWithRoles => {
  const userRole = "admin";
  return NAVIGATION.filter((item) => {
    // allowRoles がない場合は全員表示
    if (!("allowRoles" in item) || !item.allowRoles) return true;

    return item.allowRoles.includes(userRole);
  });
};
