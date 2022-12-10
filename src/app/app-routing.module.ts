import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopDeparturesComponent } from './components/stop-departures/stop-departures.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PassageDetailsComponent } from './components/passage-details/passage-details.component';
import { TripPassagesResolver } from './resolvers/trip-passages.resolver';

const routes: Routes = [
  { path: 'departures', component: StopDeparturesComponent },
  { path: 'passage/:id/:vehicleType', component: PassageDetailsComponent, resolve: { passages: TripPassagesResolver } },
  { path: '', component: HomeComponent },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TripPassagesResolver]
})
export class AppRoutingModule { }
