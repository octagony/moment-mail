export interface IServerMail {
  email: string;
}
export interface IEMail {
  email: string;
  domainInfo: string[];
  setEmail: (mail: string) => void;
  setDomainInfo: (domains: string[]) => void;
}

export interface IMail {
  id: number;
  from: string;
  subject: string;
  date: Date;
}

