import type { ParsedLocation } from "@tanstack/react-router";
import { NAVIGATION, type NavigationWithRoles } from "../routes/__root";

export const isAuthRole = (location: ParsedLocation, context: any): boolean => {
  console.log("context roleId:", context.auth?.authUser?.roleId);
  const userRole = context.auth?.authUser?.roleId;
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
  console.log(location.pathname);
  console.log(match?.allowRoles);
  if (match?.allowRoles) {
    return match?.allowRoles.includes(userRole);
  } else {
    return true;
  }
};

export const filterNavigation = (roleId?: "admin" | "sales"): NavigationWithRoles => {
  if (!roleId) return [];
  return NAVIGATION.filter((item) => {
    // allowRoles がない場合は全員表示
    if (!("allowRoles" in item) || !item.allowRoles) return true;

    return item.allowRoles.includes(roleId);
  });
};
