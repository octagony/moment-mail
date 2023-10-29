import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useMails<T>(login: string, domain: string) {
  const mailAddress = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
  const { data, isLoading, error } = useSWR<T>(mailAddress, fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
  });
  return {
    mails: data,
    isLoading,
    isError: error,
  };
}
