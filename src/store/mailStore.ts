import { IEMail } from "@/types/mail.interface";
import { create } from "zustand";

export const useMailStore = create<IEMail>((set) => ({
  email: "",
  domainInfo: [],
  mailList: [],
  setEmail: (mail: string) => set((state) => ({ email: mail })),
  setDomainInfo: (domains: string[]) =>
    set((state) => ({ domainInfo: domains })),
}));
