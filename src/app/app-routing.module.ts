import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
// import { FilmDetailComponent }  from './film-detail.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/films', pathMatch: 'full' },
//   // { path: 'dashboard',  component: DashboardComponent },
//   // { path: 'detail/:id', component: HeroDetailComponent },
//   { path: 'films',     component: FilmsComponent }
// ];
const routes: Routes = [
  // { path: '', redirectTo: '/pretraga', pathMatch: 'full' },
  // { path: 'pretraga',  component: DashboardComponent },
  { path: '**',  component: DashboardComponent },
  // { path: '**', redirectTo: '/pretraga', pathMatch: 'full' },
  // { path: 'films',  component: FilmsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
