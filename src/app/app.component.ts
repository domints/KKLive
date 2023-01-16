import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import { IRoutableComponent } from './interfaces/IRoutableComponent';
import { PlausibleService } from './services/plausible.service';
import { CityEntry, SettingsService } from './services/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  isMobile: boolean = false;
  currentComponent: IRoutableComponent;
  cities: CityEntry[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => { this.isMobile = result.matches; return result.matches; })
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private location: Location,
    plausibleService: PlausibleService,
    private settingsService: SettingsService,
    private router: Router
  ) {
    plausibleService.init();
    settingsService.getCities().subscribe(c => this.cities = c);
  }

  async onActivate(e) {
    if (this.currentComponent && this.currentComponent.onRouteOut)
      this.currentComponent.onRouteOut();
    this.currentComponent = e;
    if (this.currentComponent.onRouteIn)
      this.currentComponent.onRouteIn();
  }

  async closeDrawer() {
    this.isMobile && this.drawer.close();
  }

  get toolbarIcon(): string {
    return this.currentComponent && this.currentComponent.toolbarIcon;
  }

  get title(): string {
    return (this.currentComponent && this.currentComponent.toolbarTitle) || "Loading TTSSC...";
  }

  get showBackArrow(): boolean {
    return this.currentComponent && this.currentComponent.showBackArrow;
  }

  get currentCityName(): string {
    return this.settingsService.getCurrentCity()?.name;
  }

  goBack() {
    this.location.back()
  }

  changeCity(city: CityEntry) {
    this.settingsService.setCurrentCity(city);
    this.closeDrawer();
    this.router.navigate(['/departures']);
  }
}
