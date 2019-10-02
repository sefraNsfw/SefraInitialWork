import {Clan} from "./clan";
import {ResponseHeader} from "./responseHeader";
import {HighlightingResponse} from "./highlightingresponse";

export class ResponseSolr {
  highlighting: HighlightingResponse;
  responseHeader: ResponseHeader;
  response: {
    numFound: number;
    start: number;
    maxScore: number;
    docs: Clan[];
  }
}
