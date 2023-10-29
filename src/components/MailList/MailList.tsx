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

export default function MailList() {
  const { mails } = useMails<IMail[]>("5i9na7a1xbs", "txcct.com");
  return (
    <div className="flex flex-col gap-8">
      {mails?.map((mail) => (
        <Card className="w-[350px]">
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
            <Button>
              Open
              <MoveRight className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
