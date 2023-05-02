import userSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = userSWR(
    "/api/current-user",
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
