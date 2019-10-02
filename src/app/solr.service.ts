import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams,Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ResponseSolr } from './responsesolr';
import { ResponseHeader } from './responseHeader';
import { SolrQuery } from './SolrQuery';
import { Highlight } from './highlight';
import {KeyValuePair} from "./keyvaluepair"
import { Clan }                from './Clan';

@Injectable()
export class SolrService {

//  private headers = new Headers({'Content-Type': 'application/json'});
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
//  private solrUrl = 'http://88.99.175.85:8983/solr/sd/select';  // URL to web api
 private solrUrl = 'http://88.99.175.85:8984/solr/sd/select';  // URL to web api
 public response: ResponseSolr;
 public clanovi: Clan[] = [];
 public start: number = performance.now();
 public finish: number = performance.now();
 public debug: boolean;

  // Observable string sources
  private queryStartedSource = new Subject<string>();
  private queryFinishedSource = new Subject<string>();
  private announceDebugSource = new Subject<string>();
  // Observable string streams
  queryStarted$ = this.queryStartedSource.asObservable();
  queryFinished$ = this.queryFinishedSource.asObservable();
  debug$ = this.announceDebugSource.asObservable();
  // Service message commands
  announceQueryStart(query: string) {
    // this.start = performance.now();
    this.queryStartedSource.next(query);
  }
  announceQueryFinish(query: string) {
    // this.finish = performance.now();
    this.queryFinishedSource.next(query);
  }
  announceDebug(query: string) {
    // this.finish = performance.now();
    this.announceDebugSource.next(query);
  }


  constructor(private http: Http) { }

  queryClanovi(query: SolrQuery): Promise<ResponseSolr> {

    // transofrming SolrQuery to URL Params
    let params = new URLSearchParams();
    console.log("solrService:queryClanovi:params=:",params)
    console.log("solrService:queryClanovi:paramsJSON=:",JSON.stringify(params))
    
    // fix response in JSON for now: TODO: make sure it's parsed properly in future to accept xml etc.
    params.set("wt", "json")
    // for (let key in query.getParams()) {
    //   if (query.hasOwnProperty(key)) {
    //     let value = query[key]
    //       console.log("solrService:queryClanovi:value=:",value)
    //     if (query[key].Type in [Boolean, Highlight]) {
    //       console.log("solrService:queryClanovi:value type is:",value.Type)
    //     } else {
    //       params.set(key, query[key])
    //     }
    //   }
    // }
    let paramsArr = query.getParameters() as KeyValuePair<string>[];
    // let paramsMap = query.getParams();
    // console.log("solrService:queryClanovi:paramsMap=:",paramsMap)
    // console.log("solrService:queryClanovi:paramsMapJSON=:",paramsMap.entries())
    //   console.log("solrService:queryClanovi:paramsMap,keys=:",paramsMap.keys())
    // let paramsIter = paramsMap.keys();
    // console.log("solrService:queryClanovi:paramsIter,next value=:",paramsIter[paramsIter.next()];
    // for (let key in paramsMap.keys()) {
    //   console.log("solrService:queryClanovi:paramsMap,key=:",key);
    //   console.log("solrService:queryClanovi:paramsMap,value=:",paramsMap.get(key));
    // }

    for (let obj of paramsArr) {
      console.log("solrService:queryClanovi:paramsArr,key=:",obj.key)
      console.log("solrService:queryClanovi:paramsArr,value=:",obj.value)
      params.set(obj.key as string,obj.value as string);
    };
    

    // params.set('indent',query.indent);
    // params.set('wt',query.wt);
    //         params.set('q',query.q);
    var response = this.http.get(this.solrUrl, {search: params})
               .toPromise()
               .then(response => 
               {
                // console.log("queryClanovi2: promise : sledi ispod");
                // console.log(JSON.stringify(response.json()));
                // console.log(JSON.stringify(response));
                // console.log("queryClanovi2: promise : zavrsen");
                this.response = response.json() as ResponseSolr;
                // return response.json() as Response
                return this.response
                })
               .catch(this.handleError);
    console.log("solr.service: Ucitao Rezultat");
    console.log("solr.service: object response:",response);
    return response;
  }
  // !queuryClanovi()


  private extractResponse(response: Response) {
      this.response = response.json();
      // return response.json() as Response
      console.log("SolrService: extractResponse: Observable returned: this.response=", this.response);
      return this.response
  }

  getClanovi(query: SolrQuery): Observable<ResponseSolr> {
    this.start = performance.now();

    // transofrming SolrQuery to URL Params
    let params = new URLSearchParams();
    // console.log("solrService:queryClanovi:params=:",params)
    // console.log("solrService:queryClanovi:paramsJSON=:",JSON.stringify(params))
    
    // fix response in JSON for now: TODO: make sure it's parsed properly in future to accept xml etc.
    params.set("wt", "json")
    let paramsArr = query.getParameters() as KeyValuePair<string>[];

    for (let obj of paramsArr) {
      // console.log("solrService:queryClanovi:paramsArr,key=:",obj.key)
      // console.log("solrService:queryClanovi:paramsArr,value=:",obj.value)
      params.set(obj.key as string,obj.value as string);
    };
    
    var response = this.http.get(this.solrUrl, {search: params})
              .map(response => this.extractResponse(response))
              .catch(this.handleError);
    // console.log("solr.service: Ucitao Rezultat");
    // console.log("solr.service: object response:",response);
    return response;

  }
  // !getClanovi()


  public getResponseHeader(): ResponseHeader {
  return this.response.responseHeader as ResponseHeader;
  }
  public getResponse(): ResponseSolr {
  return this.response as ResponseSolr;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

