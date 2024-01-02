"use client";
import { useEffect, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import useMailPicker from "@/hooks/useMailPicker";
import { generateRandomEmail } from "@/utils/urlConstants";
import { useMailStore } from "@/store/mailStore";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Clipboard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export default function MailPicker() {
  const { emailServer, mutate, isLoading } = useMailPicker(generateRandomEmail);
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
      {isLoading && <Loader />}
      <div className="flex items-center flex-col gap-2">
        <h2 className="text-3xl my-4">Your email is</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            className=""
            disabled
            placeholder="Email"
            value={mail}
            onChange={() => {}}
          />
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
