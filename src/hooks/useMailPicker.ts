import { IEMail, IServerMail } from "@/types/mail.interface";
import { fetcher } from "@/utils/fetcher";
import { useMailStore } from "@/store/mailStore";
import useSWR from "swr";
import { useEffect } from "react";

export default function useMailPicker(url: string) {
  const { data, isLoading, error, mutate } = useSWR<string[]>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  return {
    emailServer: data,
    isLoading,
    isError: error,
    mutate,
  };
}
