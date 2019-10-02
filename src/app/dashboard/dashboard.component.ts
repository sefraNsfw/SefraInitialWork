import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Clan }                from '../Clan';
import { ResponseSolr }                from '../responsesolr';
import { SolrService }         from '../solr.service';
import { SolrQuery }         from '../solrquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clanovi: Clan[];
  response: ResponseSolr;
  selectedClan: Clan;
  upitPolje: Clan;
  solrquery: SolrQuery;
  constructor( 
    private SolrService: SolrService,
    private router: Router,
    ) {
      // this.solrquery = new SolrQuery("*:*") ;
     }

  ngOnInit() {
  }
  searchClanovi(query: string): void {
    console.log("dashboard.component: func searchClanovi : query JSON",JSON.stringify(query));
    this.solrquery.q = query;
    this.solrquery.wt = "json";

    this.SolrService
        .queryClanovi(this.solrquery)
        .then(response => {
          console.log("dashBoard component: searchClanovi: then response", response);
          this.response = response as ResponseSolr;
          // console.log("dashBoard component: searchClanovi:", JSON.stringify(this.response));
          // console.log("dashBoard component: searchClanovi:", this.response.response.docs);
          this.clanovi = this.response.response.docs as Clan[];
          // console.log("dashBoard component: searchClanovi:", JSON.stringify(response));
          console.log("dashBoard component: this.clanovi:", JSON.stringify(this.clanovi));
        });

    // this.films = this.response.response.docs as Clan[];
    // console.log("dashboard.component: this.films:", this.films);
  }
  onSelect(clan: Clan): void {
    this.selectedClan = clan;
    console.log("dashboard.component: onSelect: this.selectedClan:",JSON.stringify(this.selectedClan))
  }

}
