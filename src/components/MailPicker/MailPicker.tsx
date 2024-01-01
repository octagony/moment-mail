"use client";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import useMailPicker from "@/hooks/useMailPicker";
import { generateRandomEmail } from "@/utils/urlConstants";
import { Button } from "../ui/button";
import { RefreshCcw, Clipboard } from "lucide-react";
import { useMailStore } from "@/store/mailStore";
import { useToast } from "../ui/use-toast";

export default function MailPicker() {
  const { emailServer, mutate } = useMailPicker(generateRandomEmail);
  const [splitDomain, setSplitDomain] = useState<Array<string>>();
  const { toast } = useToast();

  useEffect(() => {
    useMailStore.setState({
      email: emailServer?.at(0),
      domainInfo: emailServer?.at(0)?.split("@"),
    });
  });

  const mail = useMailStore((store) => store.email);

  //TODO:FIX types
  const getNewMail = async () => {
    await mutate(generateRandomEmail).then(() => {
      useMailStore.setState({
        email: emailServer?.at(0),
      });
    });
  };

  const handleCopyToClipboard = () => {
    try {
      navigator.clipboard.writeText(mail);
      toast({
        description: "Successfully copied to clipboard",
      });
    } catch (error) {
      toast({
        description: "Oh, something went wrong",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col gap-2">
        <span>Your email is</span>
        <div className="flex w-full max-w-sm items-center space-x-2">
          {/*TODO:Change input to another component*/}
          <Input placeholder="Email" value={mail} onChange={() => {}} />
          <Button type="submit">
            <RefreshCcw />
          </Button>
          <Button onClick={handleCopyToClipboard}>
            <Clipboard />
          </Button>
        </div>
      </div>
    </>
  );
}
