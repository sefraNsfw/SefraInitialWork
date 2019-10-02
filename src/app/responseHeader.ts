export class ResponseHeader {
  status: number;
  QTime: string;
  params: {
    q: string;
    indent: string;
    wt: string;
  }
}
