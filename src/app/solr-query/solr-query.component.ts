import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { SolrQuery } from '../solrquery';
import { ResponseSolr }                from '../responsesolr';
import { SolrService }         from '../solr.service';
import { RgfService }         from '../rgf.service';
import { Clan }                from '../Clan';
import { Highlight }                from '../highlight';
import { HighlightingResponse}  from '../highlightingresponse'

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-solr-query',
  templateUrl: './solr-query.component.html',
  styleUrls: ['./solr-query.component.css']
})
export class SolrQueryComponent implements OnInit {

  clanovi: Clan[];
  solrquery: SolrQuery;
  guiQ: string;
  response: ResponseSolr;
  vebran: string;
  clanoviSolr: Clan[];
  // highlighting: HighlightingResponse;
  highlighting: Object;
  debugServices: boolean;
  errorMessage: string;

  constructor(
    private SolrService: SolrService,
    private RgfService: RgfService,
    private router: Router,
  ) { }

  ngOnInit( ) {
    this.resetQuery();
    this.debug();
    // console.log("SolrQueryComponent:ngOnInit:this.solrquery=%s",this.solrquery);
  }

  resetQuery(): void {
    // console.log("SolrQueryComponent:resetQuery: PERFORMING QUERY RESET");
    this.solrquery = new SolrQuery("");
    // console.log("SolrQueryComponent:resetQuery:this.solrquery=%s",this.solrquery);
  }
  updateQ(): void {    
  }

  debug(): void {
    this.debugServices = !this.debugServices;
    this.RgfService.debug = this.debugServices;
    this.SolrService.debug = this.debugServices;
    this.SolrService.announceDebug(this.guiQ);
    console.log("SolrQueryComponent:toggle:this.debugServices",this.debugServices)
  }

  toggle(e: Event) {
    // we're receiving reference to object which needs to be toggled
    // we just change .on propertly on the referenced object
    // so it's displayed on UI
    // console.log("SolrQueryComponent:toggle:event",e)
    // console.log("SolrQueryComponent:toggle:event.currentTarget.name",this.solrquery.)
    // console.log("SolrQueryComponent:toggle:this.hl.on",this.solrquery.hl.on)
    // e.currentTarget.on = !e.currentTarget.on;
    // console.log("SolrQueryComponent:toggle:this.hl.on",this.solrquery.hl.on)
  }

  // onSelect(clan: Clan): void {}

  updateVerbranResults(verbran: string){
    this.RgfService.finish = performance.now();
    console.log("SolrQueryComponent: func updateVerbranResults: this.RgfService.finish", this.RgfService.finish);
    console.log("SolrQueryComponent: func updateVerbranResults: verbran", verbran);
    this.vebran = verbran;
    this.RgfService.vebran = this.vebran;
    this.solrquery.q = verbran;

  }
  ;
  updateSolrResults(response: ResponseSolr){
    this.SolrService.finish = performance.now();
    console.log("SolrQueryComponent: func updateSolrResults: this.SolrService.finish", this.SolrService.finish);
    console.log("SolrQueryComponent: func updateSolrResults: response", response);
    this.response = response as ResponseSolr;
    // this.response = response as ResponseSolr;
    this.clanovi = this.response.response.docs as Clan[];
    this.SolrService.clanovi = this.response.response.docs as Clan[];
    console.log("SolrQueryComponent: func updateSolrResults: this.clanovi", this.clanovi);
    console.log("SolrQueryComponent: func updateSolrResults: this.SolrService.clanovi", this.SolrService.clanovi);

    if (response.hasOwnProperty('highlighting')) {
      console.log("YOHOOOO HIGHLIGHTING")
      this.highlighting = response.highlighting as Object;
      } else {
      this.highlighting = null;
    }

          if (this.highlighting) 
          {
            /// we will implement regex replacement details, for now let's just implement clan text replacement
            // console.log("We have HIGHLIGHTING: highlighting:", this.highlighting)  
              for (let id in this.highlighting){
              // console.log("We have HIGHLIGHT clan id", id)
              // console.log("SINGLE HIGHLIGHT: highlighting:clan", this.highlighting[id]);
                let i = 0;
                for (let clan of this.clanovi) {
                  if (clan.id == id && this.highlighting[id].hasOwnProperty('tekst') ) {
                clan.tekst = this.highlighting[id].tekst[0];
                // console.log("SINGLE HIGHLIGHT AFTER: highlighting:clan.tekst", this.clanovi[i].tekst);
                i++;
                  }

              }
              
              }
              console.log("SolrQueryComponent:FINISHED func updateSolrResults: highlighting:clan",this.clanovi);
            }         
          this.SolrService.announceQueryFinish(this.guiQ);


  }
  ;

  searchClanovi(query: SolrQuery): void {
    query.setQ(this.guiQ);
    // console.log("SolrQueryComponent: func searchClanovi");

    this.RgfService.start = performance.now();
    let first = this.RgfService.getDelafs(query)
    .map( result => this.updateVerbranResults(result),
          e => console.log('onError: %s',e),
          )
    .mergeMap(
      response => this.SolrService.getClanovi(query)
    )
    .subscribe(
      response => this.updateSolrResults(response),
      e => console.log('onError: %s',e),
      // () => this.SolrService.announceQueryFinish(this.guiQ)
      // () => this.SolrService.announceQueryFinish(this.guiQ)
    )
    ;
    console.log("REZULT2: first=",first);

    // announce query start
    this.SolrService.announceQueryStart(this.guiQ);
    // console.log("SolrQueryComponent: RgfService.start: performance=", this.RgfService.start);        
    // this.RgfService.start = performance.now();
    // this.RgfService
    //     .queryDelafs(query)
    //     .then(response => {
    //       this.RgfService.finish = performance.now();
    //       console.log("SolrQueryComponent: RgfService.finish: performance=", this.RgfService.finish);        
    //       console.log("SolrQueryComponent: searchClanovi: then RgfService", response);
    //       this.vebran = response;
    //       this.RgfService.vebran = this.vebran;
    //     console.log("SolrQueryComponent: searchClanovi: then RgfService, this.vebran=", this.vebran);
    //     console.log("SolrQueryComponent: searchClanovi: then RgfService, query=", query);
    //     query.setVebran(this.vebran);        
    //     console.log("SolrQueryComponent: searchClanovi: then RgfService AFTER, query=", query);        
    //     // console.log("SolrQueryComponent: SolrService.start: performance=", this.SolrService.start);        
    //     this.SolrService.start = performance.now();
    //     this.SolrService
    //     .queryClanovi(query)
    //     .then(response => {
    //       // console.log("SolrQueryComponent: searchClanovi: then response", response);
    //       this.SolrService.finish = performance.now();
    //     // console.log("SolrQueryComponent: SolrService.finish: performance=", this.SolrService.finish);        
    //       this.response = response as ResponseSolr;
    //       this.clanovi = this.response.response.docs as Clan[];
    //     console.log("SolrQueryComponent: searchClanovi: BEFORE this.SolrService.clanovi=", this.SolrService.clanovi);        
    //       this.SolrService.clanovi = this.response.response.docs as Clan[];
    //     console.log("SolrQueryComponent: searchClanovi: AFTER this.SolrService.clanovi=", this.SolrService.clanovi);        
    //       if (response.hasOwnProperty('highlighting')) {
    //         // console.log("YOHOOOO HIGHLIGHTING")
    //         this.highlighting = response.highlighting as Object;
    //       } else {
    //         this.highlighting = null;
    //       }
    //       if (this.highlighting) 
    //       {
    //         /// we will implement regex replacement details, for now let's just implement clan text replacement
    //         // console.log("We have HIGHLIGHTING: highlighting:", this.highlighting)  
    //           for (let id in this.highlighting){
    //           // console.log("We have HIGHLIGHT clan id", id)
    //           // console.log("SINGLE HIGHLIGHT: highlighting:clan", this.highlighting[id]);
    //             let i = 0;
    //             for (let clan of this.clanovi) {
    //               if (clan.id == id && this.highlighting[id].hasOwnProperty('tekst') ) {
    //             // console.log("SINGLE HIGHLIGHT: highlighting:clan.id", clan.id);
    //             // console.log("SINGLE HIGHLIGHT: highlighting:highlight.tekst", this.highlighting[id].tekst[0]);
    //             // console.log("SINGLE HIGHLIGHT: highlighting:clan.tekst", clan.tekst[0]);
    //             /// we will implement regex replacement details, for now let's just implement clan text replacement              var re = '/<em>.*</em>/'
    //             // var grupe = this.highlighting[id].tekst[0].match(re)
    //             // console.log("MATCH: grupe=", grupe);
    //             // for (let grupa in grupe) {
    //             //   console.log("SINGLE MATCH: grupa=", grupa);
    //             // }
    //             // console.log("SINGLE HIGHLIGHT BEFORE: highlighting:clan.tekst", this.clanovi[i].tekst);
    //             clan.tekst = this.highlighting[id].tekst[0];
    //             // console.log("SINGLE HIGHLIGHT AFTER: highlighting:clan.tekst", this.clanovi[i].tekst);
    //             i++;
    //               }

    //           }
    //           // console.log("FINISHED PROCESSING: highlighting:clan");
              
    //           }
    //         }         
          
    //       // console.log("dashBoard component: searchClanovi:", JSON.stringify(this.response));
    //       // console.log("dashBoard component: searchClanovi:", this.response.response.docs);
    //       // this.clanovi = this.response.response.docs as Clan[];
    //       // console.log("SolrQueryComponent: searchClanovi:", JSON.stringify(response));
    //       // console.log("SolrQueryComponent: SolrService: getResponseHeader", JSON.stringify(this.SolrService.getResponseHeader()));
    //       // console.log("dashBoard component: this.clanovi:", JSON.stringify(this.clanovi));

    //       // announce Query Has finishes, so that solrresponse can update it's list
    //       this.SolrService.announceQueryFinish(this.guiQ);
    //     });
    //     });


    // this.films = this.response.response.docs as Clan[];
    // console.log("dashboard.component: this.films:", this.films);
  }

  prevPage(query: SolrQuery): void {
    if (this.solrquery.start != null){
      if (this.solrquery.start < this.solrquery.rows) {
        this.solrquery.start = 0;
      } else {
          this.solrquery.start = this.solrquery.start - this.solrquery.rows;
        }
      }  else {
        this.solrquery.start = 0;
      }
    }
      // this.searchClanovi(this.solrquery);
  nextPage(query: SolrQuery): void {
      // console.log("SolrQuery:nextPage:query=",query);
      if (query.start != null){
      query.start = query.start + 10;
      query.rows = 10;
      } else {
        this.solrquery.start = this.solrquery.rows;

      }
      // this.searchClanovi(this.solrquery);
  }
}
