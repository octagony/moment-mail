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
import Link from "next/link";

export default function MailList() {
  const [mail, domains] = useMailStore((store) => [
    store.email,
    store.domainInfo,
  ]);
  const { mails } = useMails<IMail[]>(domains?.at(0)!, domains?.at(1)!);
  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="flex flex-row flex-wrap gap-4 justify-center align-center">
        {/*TODO: Add spinner, change layout*/}
        {mails?.map((mail) => (
          <Card className="w-1/4">
            <CardHeader>
              <CardTitle>{mail.subject}</CardTitle>
              <CardDescription>
                From: {mail.from.split("@").at(1)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              {/*TODO: Implement delete mail logic*/}
              <Button variant="outline">
                <Trash2 className="mr-2" />
                Delete
              </Button>
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
