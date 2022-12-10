import { Component, OnInit } from '@angular/core';
import { IRoutableComponent } from 'src/app/interfaces/IRoutableComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, IRoutableComponent {
  onRouteIn() {
  }
  onRouteOut() {
  }
  showBackArrow: boolean = false;
  toolbarTitle: string = "TTSS Client - Home";

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/departures'], {
      skipLocationChange: true,
      replaceUrl: true
    });
  }
}
