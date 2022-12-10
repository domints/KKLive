import { Component, OnInit } from '@angular/core';
import { IRoutableComponent } from 'src/app/interfaces/IRoutableComponent';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, IRoutableComponent {
  showBackArrow: boolean = false;
  toolbarTitle: string = "Strona nie istnieje";
  onRouteIn() {
  }
  onRouteOut() {
  }

  constructor() { }

  ngOnInit() {
  }

}
