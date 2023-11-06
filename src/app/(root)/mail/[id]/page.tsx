"use client";
import { Button } from "@/components/ui/button";
import useOneMail from "@/hooks/useOneMail";
import { useMailStore } from "@/store/mailStore";
import { IMessage } from "@/types/mail.interface";
import Link from "next/link";
import { Parser } from "html-to-react";

export default function Mail({ params }: { params: { id: number } }) {
  const domainInfo = useMailStore((store) => store.domainInfo);
  const { mail } = useOneMail<IMessage>(
    domainInfo?.at(0)!,
    domainInfo?.at(1)!,
    params.id,
  );
  return (
    <div>
      <Button variant="outline">
        <Link href="/">Go back</Link>
      </Button>
      mail info w/id {params.id}
      <div className="container max-h-10">{Parser().parse(mail?.htmlBody)}</div>
    </div>
  );
}
