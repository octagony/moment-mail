"use client";
import { Button } from "@/components/ui/button";
import useOneMail from "@/hooks/useOneMail";
import { useMailStore } from "@/store/mailStore";
import { IMessage } from "@/types/mail.interface";
import Link from "next/link";
import { Parser } from "html-to-react";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Mail({ params }: { params: { id: number } }) {
  const domainInfo = useMailStore((store) => store.domainInfo);
  const mailRef = useRef<HTMLDivElement | null>(null);
  const { mail } = useOneMail<IMessage>(
    domainInfo?.at(0)!,
    domainInfo?.at(1)!,
    params.id,
  );

  return (
    <div className="container mt-8">
      <Button variant="outline">
        <Link href="/">Go back</Link>
      </Button>
      <div className="mt-4 p-2">
        <div
          className="max-h-10"
          dangerouslySetInnerHTML={{ __html: mail?.htmlBody! }}
        ></div>
      </div>
    </div>
  );
}
