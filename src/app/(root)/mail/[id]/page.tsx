"use client";
import { Button } from "@/components/ui/button";
import useOneMail from "@/hooks/useOneMail";
import { useMailStore } from "@/store/mailStore";
import { IMessage } from "@/types/message.interface";
import Link from "next/link";
import { Parser } from "html-to-react";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import dayjs from "dayjs";
import {
  ArrowRightFromLine,
  Calendar,
  ChevronDownCircle,
  Frown,
} from "lucide-react";

export default function Mail({ params }: { params: { id: number } }) {
  const domainInfo = useMailStore((store) => store.domainInfo);
  const mailRef = useRef<HTMLDivElement | null>(null);
  const { mail } = useOneMail<IMessage>(
    domainInfo?.at(0)!,
    domainInfo?.at(1)!,
    params.id,
  );
  console.log(domainInfo);

  const formatDate = () => {
    const dj = dayjs(mail?.date);
    return dj.format("DD/MM/YYYY");
  };

  return (
    <div className="container mt-8">
      <Button variant="outline">
        <Link href="/">Go back</Link>
      </Button>
      <Menubar className="mt-4">
        <MenubarMenu>
          <MenubarTrigger>
            <ArrowRightFromLine size={18} className="mr-2" />{" "}
            {mail?.from.split("@").at(0)}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>From:{mail?.from}</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Calendar size={18} className="mr-2" /> {formatDate()}
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            Attachments <ChevronDownCircle className="ml-2" size={18} />
          </MenubarTrigger>
          <MenubarContent>
            {mail?.attachments.length ? (
              mail?.attachments.map((attachment) => (
                <MenubarItem>{attachment.filename}</MenubarItem>
              ))
            ) : (
              <MenubarItem>
                <Frown size={18} className="mr-2" />
                Empty
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="mt-4 p-2">
        <div
          className="max-h-10"
          dangerouslySetInnerHTML={{ __html: mail?.htmlBody! }}
        ></div>
      </div>
    </div>
  );
}
