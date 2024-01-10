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
import axios from "axios";
import { downloadHelper } from "@/utils/downloadHelper";

export default function Mail({ params }: { params: { id: number } }) {
  const domainInfo = useMailStore((store) => store.domainInfo);
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

  const downloadAttachment = async (fileName: string) => {
    const createFileNameForUrl = fileName.replaceAll(/ /g, "%20");
    const url = `https://www.1secmail.com/api/v1/?action=download&login=${domainInfo.at(
      0,
    )!}&domain=${domainInfo.at(1)!}&id=${
      params.id
    }&file=${createFileNameForUrl}`;
    try {
      downloadHelper(url, fileName);
    } catch (error: unknown) {
      if (error instanceof TypeError) {
        console.log(error?.message);
      }
    }
  };

  return (
    <div className="container mt-8">
      <Button variant="outline">
        <Link href="/">Go back</Link>
      </Button>
      {/*TODO:Migrate menubar to separate component*/}
      <Menubar className="mt-4">
        <MenubarMenu>
          <MenubarTrigger>
            <ArrowRightFromLine size={18} className="mr-2" />{" "}
            {mail?.from.split("@").at(0)}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>From: {mail?.from}</MenubarItem>
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
                <MenubarItem
                  onClick={() => downloadAttachment(attachment.filename)}
                >
                  {attachment.filename}
                </MenubarItem>
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
      {/*TODO:Add new styles to message*/}
      <div className="mt-4 p-2">
        <div
          className="max-h-10"
          dangerouslySetInnerHTML={{ __html: mail?.htmlBody! }}
        ></div>
      </div>
    </div>
  );
}
