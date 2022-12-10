import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StopStat } from 'src/app/db';

@Component({
  selector: 'favourite-stop-list-item',
  templateUrl: './favourite-stop-list-item.component.html',
  styleUrls: ['./favourite-stop-list-item.component.scss']
})
export class FavouriteStopListItemComponent implements OnInit {
  @Input() stop: StopStat;
  @Output() stopClicked = new EventEmitter<StopStat>();
  @Output() stopDeleted = new EventEmitter<StopStat>();

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    this.stopClicked.emit(this.stop);
  }

  deleted() {
    this.stopDeleted.emit(this.stop);
  }

}
