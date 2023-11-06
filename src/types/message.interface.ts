export interface IMessage {
  id: number;
  from: string;
  subject: string;
  date: string;
  attachments: IAttachments[];
  body: string;
  textBody: string;
  htmlBody: string;
}

export interface IAttachments {
  filename: string;
  contentType: string;
  size: number;
}
