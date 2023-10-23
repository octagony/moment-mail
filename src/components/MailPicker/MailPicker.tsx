"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import useSWR from "swr";
import useMailPicker from "@/hooks/useMailPicker";
import { generateRandomEmail } from "@/utils/urlConstants";

export default function MailPicker() {
  const { email } = useMailPicker(generateRandomEmail);
  return (
    <>
      <div className="flex items-center flex-col gap-2">
        <span>Your email is</span>
        <Input type="email" value={email} className="max-w-lg p-4" />
      </div>
    </>
  );
}
