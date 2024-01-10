import { IEMail } from "@/types/mail.interface";
import { create } from "zustand";

export const useMailStore = create<IEMail>((set) => ({
  email: "",
  domainInfo: [],
  mailList: [],
  setEmail: (mail: string) => set((state) => ({ email: mail })),
  setDomainInfo: (domains: string[]) =>
    set((state) => ({ domainInfo: domains })),
  setFilterMails: (mailId: number) =>
    set((state) => ({
      mailList: state.mailList.filter((mail) => mail.id !== mailId),
    })),
}));
