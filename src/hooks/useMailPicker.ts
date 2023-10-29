import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useMailPicker(url: string) {
  const { data, isLoading, error, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return {
    email: data,
    isLoading,
    isError: error,
    mutate,
  };
}
