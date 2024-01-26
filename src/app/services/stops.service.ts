import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StopsService {

  constructor(private http: HttpClient) { }

  public getAutocomplete(value: string): Observable<StopAutocomplete[]> {
    return this.http.get<StopAutocomplete[]>('https://gtfs.dszymanski.pl/autocomplete?', { params: { query: value } });
  }

  public getStops(): Observable<Stop[]> {
    return this.http.get<Stop[]>('https://gtfs.dszymanski.pl/stops');
  }

  public getPassages(stopId: string): Observable<StopPassagesResult> {
    return this.http.get<StopPassagesResult>(`https://gtfs.dszymanski.pl/departures/stop/${stopId}`);
  }
}

export enum VehicleType {
  None = 0,
  Tram = 1,
  Bus = 2
}

export enum DepartureResultType {
  Success = 0,
  ScheduleOnly = 1,
  Failed = 2
}

export function vehicleTypeToString(type: VehicleType | string): string {
  switch (type) {
    case VehicleType.Bus:
      return 'bus';
    case VehicleType.Tram:
      return 'tram';
    case 'bus':
      return 'bus';
    case 'tram':
      return 'tram';
    default:
      return '';
  }
}

export class StopAutocomplete {
  groupId: string;
  name: string;
  type: VehicleType;
}

export class PassageListItem {
  line: string;
  direction: string;
  modelName: string;
  sideNo: string;
  floorType: number;
  timeString: string;
  vehicleId: string;
  isOld: boolean;
  delayMinutes: number;
  relativeTime: number;
  tripId: string;
  vehicleType: VehicleType;
}

export class StopPassagesResult {
  departures: PassageListItem[];
  resultTypes: {
    Tram: DepartureResultType
    Bus: DepartureResultType
  }
}

export class Stop {
  groupId: string;
  gtfsId: string;
  name: string;
  latitude: number;
  longitude: number;
  type: VehicleType;
}
