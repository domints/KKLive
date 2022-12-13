import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { StopDeparturesComponent } from './components/stop-departures/stop-departures.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PassageDetailsComponent } from './components/passage-details/passage-details.component';
import { PassageDetailListComponent } from './components/passage-details/passage-detail-list/passage-detail-list.component';
import { PassageListItemComponent } from './components/list-items/passage-list-item/passage-list-item.component';
import { TripPassageListItemComponent } from './components/list-items/trip-passage-list-item/trip-passage-list-item.component';
import { FavouriteStopListItemComponent } from './components/list-items/favourite-stop-list-item/favourite-stop-list-item.component';
import { CatLoaderComponent } from './components/cat-loader/cat-loader.component';

@NgModule({
    declarations: [
        AppComponent,
        StopDeparturesComponent,
        HomeComponent,
        NotFoundComponent,
        PassageDetailsComponent,
        PassageDetailListComponent,
        PassageListItemComponent,
        TripPassageListItemComponent,
        FavouriteStopListItemComponent,
        PassageDetailListComponent,
        CatLoaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule,
        NgbModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
