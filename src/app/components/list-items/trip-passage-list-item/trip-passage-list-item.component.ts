import { Component, OnInit, Input } from '@angular/core';
import { TripPassageListItem } from 'src/app/services/trip-passages.service';

@Component({
  selector: 'trip-passage-list-item',
  templateUrl: './trip-passage-list-item.component.html',
  styleUrls: ['./trip-passage-list-item.component.scss']
})
export class TripPassageListItemComponent implements OnInit {
  @Input() item: TripPassageListItem;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Input() isEdge: boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
