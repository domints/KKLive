import { Injectable } from "@angular/core";
import { MapComponent } from "src/app/map/map.component";
import { Stop } from "../stops.service";

@Injectable({
  providedIn: 'root'
})
export class MapDataService {
  centerLat: number = 50.0660383;
  centerLon: number = 19.9466524;
  zoom: number = 14;
  stops: Stop[] = [];

  constructor() { }

  store(c: MapComponent) {
    this.centerLat = c.centerLat;
    this.centerLon = c.centerLon;
    this.zoom = c.zoom;
    this.stops = c.stops;
  }

  restore(c: MapComponent) {
    c.centerLat = this.centerLat;
    c.centerLon = this.centerLon;
    c.zoom = this.zoom;
    c.stops = this.stops;
  }
}
