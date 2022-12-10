import { Component, OnInit, Input } from '@angular/core';
import { PassageListItem } from 'src/app/services/stops.service';

@Component({
  selector: 'passage-list-item',
  templateUrl: './passage-list-item.component.html',
  styleUrls: ['./passage-list-item.component.scss']
})
export class PassageListItemComponent implements OnInit {
  @Input() passage: PassageListItem;

  constructor() { }

  ngOnInit() {
  }

}
