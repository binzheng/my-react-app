import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export const useLoading = (): boolean => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return isFetching > 0 || isMutating > 0;
};
