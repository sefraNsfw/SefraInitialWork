import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Clan }                from '../Clan';
import { ResponseSolr }                from '../responsesolr';
import { ResponseHeader }                from '../ResponseHeader';
import { SolrService }         from '../solr.service';
import { RgfService }         from '../rgf.service';

@Component({
  selector: 'app-solr-response',
  templateUrl: './solr-response.component.html',
  styleUrls: ['./solr-response.component.css']
})
export class SolrResponseComponent implements OnInit {
  response: ResponseSolr;
  responseJSON: string;
  responseHeader: ResponseHeader;
  guiQ: string;
  vebran: string;
  clanovi: Clan[];
  queryInProgress: boolean;
  success: boolean;
  responseHeaderParams: string;
  debugServices: boolean;
  solrStart: number;
  solrFinish: number;
  rgfStart: number;
  rgfFinish: number;
  constructor(
    private SolrService: SolrService,
    private RgfService: RgfService,
    private router: Router,

  ) {
    this.clanovi = this.SolrService.clanovi;
    console.log("SolrResponseComponent: constructor: clanovi=",this.clanovi);
    SolrService.debug$.subscribe(
      q => {
      console.log("SolrResponseComponent: debug$: this.debugServices=",this.debugServices);
      this.debugServices = this.SolrService.debug;
      }
    ); // finish SolrService.queryFinished$.subscribe
    SolrService.queryStarted$.subscribe(
      q => {
      console.log("SolrResponseComponent: queryStarted$: q=",q);
        this.queryInProgress = true;
        this.success = false;
        this.rgfStart = this.RgfService.start;
        this.solrStart = this.SolrService.start;
        // this.debugServices = this.RgfService.debug;
      }
    ); // finish SolrService.queryFinished$.subscribe
    SolrService.queryFinished$.subscribe(
      q => {
      console.log("SolrResponseComponent: queryFinished$: q=",q);
        this.clanovi = this.SolrService.clanovi;
        this.response = this.SolrService.response;
        this.responseJSON = JSON.stringify(this.response);
        this.responseHeader = this.SolrService.response.responseHeader;
        this.vebran = this.RgfService.vebran;
      // console.log("SolrResponseComponent: queryFinished$: clanovi=",this.clanovi);
      // console.log("SolrResponseComponent: queryFinished$: this.SolrService.clanovi=",this.SolrService.clanovi);
      console.log("SolrResponseComponent: queryFinished$: response=",this.response);
      console.log("SolrResponseComponent: queryFinished$: this.SolrService.response=",this.SolrService.response);
      console.log("SolrResponseComponent: queryFinished$: this.responseHeader=",this.responseHeader);
      console.log("SolrResponseComponent: queryFinished$: this.SolrService.response.responseHeader=",this.SolrService.response.responseHeader);
      this.responseHeaderParams = JSON.stringify(this.responseHeader.params);
      this.queryInProgress = false;
      if (this.responseHeader.status == 0) {
        console.log("SolrResponseComponent : queryFinished : query was successful because this.responseHeader.status=",this.responseHeader.status );
        this.success = true;
      }
        this.rgfStart = this.RgfService.start;
        this.solrStart = this.SolrService.start;
        console.log("SolrResponseComponent: RgfService.start: performance=", this.rgfStart);        
        console.log("SolrResponseComponent: SolrService.start: performance=", this.solrStart);        
        this.rgfFinish = this.RgfService.finish;
        this.solrFinish = this.SolrService.finish;
        console.log("SolrResponseComponent: RgfService.finish: performance=", this.rgfFinish);        
        console.log("SolrResponseComponent: SolrService.finish: performance=", this.solrFinish);        
    }); // finish SolrService.queryFinished$.subscribe
  
  } // finish constructor

  ngOnInit() {
  }
}
