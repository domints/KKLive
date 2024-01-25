import { Component, HostListener, OnInit } from '@angular/core';
import { StopsService, StopAutocomplete, PassageListItem, VehicleType, vehicleTypeToString } from 'src/app/services/stops.service';
import { UntypedFormControl } from '@angular/forms';
import { IRoutableComponent } from 'src/app/interfaces/IRoutableComponent';
import { DepartureDataService } from 'src/app/services/store-services/departure-data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PlausibleService } from 'src/app/services/plausible.service';
import { interval } from 'rxjs';
import { db, StopStat } from 'src/app/db';
import { firstBy } from 'thenby';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'stop-departures',
  templateUrl: './stop-departures.component.html',
  styleUrls: ['./stop-departures.component.scss']
})
export class StopDeparturesComponent implements OnInit, IRoutableComponent {
  stopValueEvents: boolean = false;
  onRouteIn() {
    this.stopValueEvents = true;
    this.departureDataService.restore(this);
    if (this.currentStop) {
      this.refreshPassages();
      //this.startRefresher();
    }
    this.stopValueEvents = false;
  }
  onRouteOut() {
    this.stopRefresher();
    this.departureDataService.store(this);
  }
  showBackArrow: boolean = false;
  toolbarTitle: string = "Odjazdy";
  toolbarIcon: string = undefined;
  autocompleteControl: UntypedFormControl = new UntypedFormControl();
  autocompleteOptions: StopAutocomplete[] = [];
  currentStop: StopAutocomplete;
  passages: PassageListItem[] | null = null;
  currentPassages: PassageListItem[] = [];
  oldPassages: PassageListItem[] = [];
  selectedPassage: PassageListItem = null;

  favouriteStops: StopStat[] = [];

  tripId: string;
  vehicleType: VehicleType;

  screenWidth: number;

  refresherSubscription: Subscription;

  constructor(private stopsService: StopsService,
    private departureDataService: DepartureDataService,
    private router: Router,
    private plausibleService: PlausibleService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.refreshFavourites();
    this.autocompleteControl.valueChanges.subscribe((v: string | StopAutocomplete) => {
      if (!this.stopValueEvents) {
        if (typeof v === "string")
          this.stopsService.getAutocomplete(v).subscribe(r => this.autocompleteOptions = r);
        else {
          this.plausibleService.trackEvent("getDeparturesFromText", { props: { name: v.name, id: v.groupId } });
          this.showStop(v)
        }
      }
    });
  }

  clearDepartures() {
    this.stopValueEvents = true;
    this.autocompleteControl.setValue(null);
    this.autocompleteOptions = [];
    this.stopRefresher();
    this.currentStop = null;
    this.passages = null;
    this.stopValueEvents = false;
    this.toolbarTitle = "Odjazdy";
    this.selectedPassage = null;
    this.tripId = null;
    this.vehicleType = null;
  }

  refreshFavourites() {
    db.stopStats.orderBy("useCount").reverse().limit(10).toArray(stats => {
      if (!stats)
        return;
      this.favouriteStops = stats.sort(firstBy("useCount", "desc").thenBy("lastUse", "desc").thenBy("name"));
    })
  }

  favouriteSelected(stop: StopStat) {
    this.plausibleService.trackEvent("getDeparturesFromFav", { props: { name: stop.name, id: stop.groupId } });
    const stopData = {
      groupId: stop.groupId,
      name: stop.name,
      type: 0
    };
    this.stopValueEvents = true;
    this.autocompleteControl.setValue(stopData);
    this.showStop(stopData);
    this.stopValueEvents = false;
  }

  favouriteDeleted(stop: StopStat) {
    this.plausibleService.trackEvent("favStopDeleted");
    db.stopStats.delete(stop.id).then(this.refreshFavourites.bind(this));
  }

  showStop(stop: StopAutocomplete) {
    db.stopStats.where("groupId").equals(stop.groupId).first(((stat) => {
      if (stat) {
        stat.useCount++;
        stat.lastUse = Date.now();
        db.stopStats.put(stat);
      }
      else {
        db.stopStats.add({
          groupId: stop.groupId,
          name: stop.name,
          useCount: 1,
          lastUse: Date.now()
        });
      }
      this.refreshFavourites();
    }).bind(this));
    this.stopRefresher();
    this.currentStop = stop;
    this.refreshPassages();
    //this.startRefresher();
    this.toolbarTitle = "Odjazdy - " + stop.name;
  }

  startRefresher() {
    if (!this.refresherSubscription || this.refresherSubscription.closed)
      this.refresherSubscription = interval(20000).subscribe(() => this.refreshPassages());
  }

  stopRefresher() {
    if (this.refresherSubscription && !this.refresherSubscription.closed)
      this.refresherSubscription.unsubscribe();
  }

  refreshPassages() {
    this.stopsService.getPassages(this.currentStop.groupId)
      .pipe(this.loaderService.attachLoader())
      .subscribe(r => {
      this.passages = r;
      this.currentPassages = r.filter(p => !p.isOld);
      this.oldPassages = r.filter(p => p.isOld);
    });
  }

  autocompleteStopDisplayFn(stop?: StopAutocomplete) {
    return stop ? stop.name : undefined;
  }

  passageDetails(item: PassageListItem) {
    this.plausibleService.trackEvent("viewPassageDetails");

    if (this.screenWidth < 1200)
      this.router.navigate(['passage', item.tripId, vehicleTypeToString(item.vehicleType)]);
    else {
      this.selectedPassage = item;
      this.tripId = item.tripId;
      this.vehicleType = item.vehicleType;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
