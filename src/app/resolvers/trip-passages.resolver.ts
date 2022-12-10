import { Injectable } from '@angular/core';
import { TripPassagesService, TripPassages } from '../services/trip-passages.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { VehicleType } from '../services/stops.service';

@Injectable({
  providedIn: 'root'
})
export class TripPassagesResolver implements Resolve<TripPassages> {

  constructor(private tripPassagesService: TripPassagesService) { }

  resolve(route: ActivatedRouteSnapshot) : Observable<TripPassages> {
    return this.tripPassagesService.getTripPassages(route.paramMap.get('id'), route.paramMap.get('vehicleType'));
  }
}

