"use client";
import { IMail } from "@/types/mail.interface";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { MoveRight, Trash2 } from "lucide-react";
import useMails from "@/hooks/useMails";
import { useMailStore } from "@/store/mailStore";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

export default function MailList() {
  const [mail, domains] = useMailStore((store) => [
    store.email,
    store.domainInfo,
  ]);

  const [mailList, setMailList] = useState<IMail[]>([]);

  const { mails } = useMails<IMail[]>(domains?.at(0)!, domains?.at(1)!);

  // useEffect(() => {
  //   if (mails) {
  //     setMailList(mails);
  //   }
  // });

  const handleDeleteMail = (deleteMailId: number) => {
    const updatedMails = mailList?.filter((mail) => mail.id !== deleteMailId);
    console.log(updatedMails);
    //setMailList(mails);
  };

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="flex flex-row flex-wrap gap-4 justify-center align-center">
        {/*TODO: Add spinner, change layout*/}
        {mailList?.map((mail) => (
          <Card className="w-1/4">
            <CardHeader>
              <CardTitle>{mail.subject}</CardTitle>
              <CardDescription>
                From: {mail.from.split("@").at(1)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant="outline">
                    <Trash2 className="mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this email
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteMail(mail.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link href={`/mail/${mail.id}`}>
                <Button>
                  Open
                  <MoveRight className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
