import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as xml2js from 'xml2js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ResponseSolr } from './responsesolr';
import { ResponseHeader } from './responseHeader';
import { SolrQuery } from './SolrQuery';
import { Highlight } from './highlight';
import {KeyValuePair} from "./keyvaluepair"

@Injectable()
export class RgfService {
  private headers = new Headers({
    'Content-Type': 'application/json',
  });
  // private delafsUrl = 'http://hlt.rgf.bg.ac.rs/vebran/api/delafs/';  // URL to web api
  private delafsUrl = 'http://88.99.175.85:8982/Vebran/api/delafs/';  // URL to web api
  private response: string;
  
  public start: number;
  public finish: number;
  public debug: boolean;
  public vebran: string;
  constructor(private http: Http) { }

  getDelafs(query: SolrQuery): Observable<string> {
  let q = query.getQ()
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
    
    var response = this.http.get(this.delafsUrl + q)
              .map(response => response.json() as string)
              .catch(this.handleError);
    // console.log("solr.service: Ucitao Rezultat");
    // console.log("solr.service: object response:",response);
    return response;

  }
    queryDelafs(query: SolrQuery): Promise<string> {

    // transofrming SolrQuery to URL Params
    let params = new URLSearchParams();
    console.log("rgfService:queryDelafs:params=:",params)
    console.log("rgfService:queryDelafs:paramsJSON=:",JSON.stringify(params))
    
    let paramsArr = query.getParameters() as KeyValuePair<string>[];

    let q = query.getQ()

    // params.set('indent',query.indent);
    // params.set('wt',query.wt);
    //         params.set('q',query.q);
    this.start = performance.now();
    var response = this.http.get(this.delafsUrl + q)
               .toPromise()
               .then(response => 
               {
                console.log("rgtService:queryDelafs: promise : sledi ispod");
                console.log(JSON.stringify(response.json()));
                console.log(JSON.stringify(response));
                console.log("rgtService:queryDelafs: promise : zavrsen");
                this.response = response.json() as string;
                // return response.json() as Response
                return this.response
                })
               .catch(this.handleError);
    console.log("rgf.service: Ucitao Rezultat");
    console.log("rgf.service: object response:",response);
    this.finish = performance.now();
    return response;
  }

  public getResponseHeader(): string {
  // return this.response.responseHeader as ResponseHeader;
  return "TODO: Not Implemeneted for service RGF"
  }
  public getResponse(): string {
  return this.response;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
