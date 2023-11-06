import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useOneMail<T>(
  login: string,
  domain: string,
  id: number,
) {
  const mailAddress = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${id}`;
  const { data, isLoading, error } = useSWR<T>(mailAddress, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  return {
    mail: data,
    isLoading,
    isError: error,
  };
}
