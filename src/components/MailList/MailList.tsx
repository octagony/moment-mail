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
import { Input } from "@/components/ui/input";
import { MoveRight, Trash2 } from "lucide-react";
import useMails from "@/hooks/useMails";
import { useMailStore } from "@/store/mailStore";

export default function MailList() {
  const [mail, domains] = useMailStore((store) => [
    store.email,
    store.domainInfo,
  ]);
  const { mails } = useMails<IMail[]>(domains?.at(0)!, domains?.at(1)!);
  return (
    <div className="flex flex-col gap-8">
      <p>Now email is: {mail} </p>
      <div className="flex flex-row flex-wrap gap-4 justify-center align-center">
        {mails?.map((mail) => (
          <Card className="w-1/4">
            <CardHeader>
              <CardTitle>{mail.subject}</CardTitle>
              <CardDescription>
                From: {mail.from.split("@").at(1)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Trash2 className="mr-2" />
                Delete
              </Button>
              <Button onClick={() => console.log(mail.id)}>
                Open
                <MoveRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
