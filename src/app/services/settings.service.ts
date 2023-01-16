import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { db } from "../db";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private static CURRENT_CITY_SETTING = "currentCity";

    private cities: CityEntry[] = [];
    private currentCity: CityEntry = undefined;
    constructor(private http: HttpClient) {
        db.settings.get({ "name": SettingsService.CURRENT_CITY_SETTING }).then((s => {
            if (!!s && !!s.value) {
                this.currentCity = JSON.parse(s.value);
            }
        }).bind(this))
    }

    public getCities(): Observable<CityEntry[]> {
        if (this.cities.length > 0)
            return of(this.cities);
        
        return this.http.get<CityEntry[]>(`https://gtfs.dszymanski.pl/cities`)
            .pipe(tap((entries) => this.cities = entries));
    }

    getCurrentCity(): CityEntry {
        if (!!this.currentCity)
            return this.currentCity;
        if (this.cities.length > 0) {
            return this.cities[0]
        }
        return undefined;
    }

    setCurrentCity(entry: CityEntry) {
        this.currentCity = entry;
        db.settings.get({ "name": SettingsService.CURRENT_CITY_SETTING }).then(s => {
            if (!!s) {
                db.settings.update(s, { "value": JSON.stringify(entry) });
            }
            else {
                db.settings.add({ name: SettingsService.CURRENT_CITY_SETTING, value: JSON.stringify(entry) });
            }
        })
    }
}

export class CityEntry {
    name: string;
    value: string;
}