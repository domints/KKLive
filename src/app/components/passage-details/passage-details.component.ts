import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IRoutableComponent } from 'src/app/interfaces/IRoutableComponent';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PassageDetailListComponent } from './passage-detail-list/passage-detail-list.component';

@Component({
  selector: 'passage-details',
  templateUrl: './passage-details.component.html',
  styleUrls: ['./passage-details.component.scss']
})
export class PassageDetailsComponent implements OnInit, OnDestroy, IRoutableComponent {
  @ViewChild(PassageDetailListComponent) listComponent: PassageDetailListComponent;

  showBackArrow: boolean = true;
  toolbarTitle: string = "Szczegóły";

  paramSubscription: Subscription;
  tripId: any;
  vehicleType: any;
  stopListReload: boolean = true;

  onRouteIn() {

  }
  onRouteOut() {

  }

  constructor(
    private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
    this.stopListReload = true;
  }

  ngOnInit() {
    this.tripId = this.route.snapshot.params.id;
    this.vehicleType = this.route.snapshot.params.vehicleType;
    this.paramSubscription = this.route.params.subscribe(p => this.tripId = p.id);
  }

  ngAfterViewInit() {
    this.listComponent.refreshData(this.route.snapshot.data.passages);
    this.stopListReload = false;
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  updateTitle(event: string) {
    //this.toolbarTitle = event;
  }
}
