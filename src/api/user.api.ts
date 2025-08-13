import type { User } from "../entity/user";
import { userList } from "./user.mock";

type queryProp = {
  userId?: number;
};

export async function SearchUserApi(): Promise<User[]> {
  console.log("SearchUserApi");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return userList;
}
export async function SearchUserErrorApi(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error("Simulate error fetching user data");
}

export async function FindUserApi(query: queryProp): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return userList.filter((user: User) => user.id === query.userId)[0] || null;
}
export async function FindUserErrorApi(query: queryProp): Promise<User> {
  console.log(query);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error("Simulate error fetching user data");
}
