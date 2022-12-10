import { Injectable } from "@angular/core";
import Plausible, { EventOptions, PlausibleOptions } from "plausible-tracker";

@Injectable({
  providedIn: 'root'
})
export class PlausibleService {
  private plausible = Plausible({
    domain: 'kklive.pl',
    apiHost: 'https://plausible.dszymanski.pl'
  });
  constructor() {
  }

  init() {
    this.plausible.enableAutoPageviews();
  }

  trackPageview(eventData?: PlausibleOptions, options?: EventOptions)
  {
    this.plausible.trackPageview(eventData, options);
  }

  trackEvent(eventName: string, options?: EventOptions, eventData?: PlausibleOptions)
  {
    this.plausible.trackEvent(eventName, options, eventData);
  }
}
