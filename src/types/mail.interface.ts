export interface IServerMail {
  email: string;
}
export interface IEMail {
  email: string;
  domainInfo: string[];
  mailList: IMail[];
  setEmail: (mail: string) => void;
  setDomainInfo: (domains: string[]) => void;
  setFilterMails: (mailId: number) => void;
}

export interface IMail {
  id: number;
  from: string;
  subject: string;
  date: Date;
}
