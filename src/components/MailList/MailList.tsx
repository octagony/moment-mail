"use client";
import { IMail } from "@/types/mail.interface";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useMails from "@/hooks/useMails";
import { useMailStore } from "@/store/mailStore";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import ActionButtons from "../ActionButtons/ActionButtons";
import Loader from "../Loader/Loader";

export default function MailList() {
  const [mail, domains, storeList, setFilterMails] = useMailStore((store) => [
    store.email,
    store.domainInfo,
    store.mailList,
    store.setFilterMails,
  ]);

  const [mailList, setMailList] = useState<IMail[]>([]);

  const { mails } = useMails<IMail[]>(domains?.at(0)!, domains?.at(1)!);

  useEffect(() => {
    useMailStore.setState({
      mailList: mails,
    });
  }, [mails]);

  const handleDeleteMail = (deleteMailId: number) => {
    const updatedMails = mailList?.filter((mail) => mail.id !== deleteMailId);
  };

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center align-center">
        {storeList?.length ? (
          storeList.map((mail) => (
            <Card key={mail.id} className="w-full lg:w-1/4">
              <CardHeader>
                <CardTitle className="truncate mb-2">{mail.subject}</CardTitle>
                <CardDescription>
                  From: {mail.from.split("@").at(1)}
                </CardDescription>
              </CardHeader>
              <ActionButtons
                mailId={mail.id}
                deleteMail={() => setFilterMails(mail.id)}
              />
            </Card>
          ))
        ) : (
          <div className="text-4xl text-center mt-24">
            <p>We are waiting for new mails</p>
          </div>
        )}
      </div>
    </div>
  );
}
