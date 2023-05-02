import useSWR from "swr";
import fetcher from "@/lib/fetcher";
function useUserData(userId: string) {
  const { data, error } = useSWR(`/api/user/${userId}`, fetcher);

  return {
    userData: data,
    loading: !error && !data,
    error,
  };
}
