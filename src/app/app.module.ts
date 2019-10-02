import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SolrService } from './solr.service';
import { RgfService } from './rgf.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SolrQueryComponent } from './solr-query/solr-query.component';
import { SolrResponseComponent } from './solr-response/solr-response.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SolrQueryComponent,
    SolrResponseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [SolrService,RgfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
console.log("Ucitao App Module.ts");
