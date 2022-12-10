import { Injectable } from '@angular/core';
import { StopDeparturesComponent } from '../../components/stop-departures/stop-departures.component';
import { StopAutocomplete, PassageListItem } from '../stops.service';

@Injectable({
  providedIn: 'root'
})
export class DepartureDataService {
  private isSaved: boolean = false;
  toolbarTitle: string = "Odjazdy";
  autocompleteValue: StopAutocomplete | string;
  autocompleteOptions: StopAutocomplete[] = [];
  passages: PassageListItem[] = [];

  constructor() { }

  store(c: StopDeparturesComponent)
  {
    this.isSaved = true;
    this.toolbarTitle = c.toolbarTitle;
    this.autocompleteOptions = c.autocompleteOptions;
    this.passages = c.passages;
    this.autocompleteValue = c.autocompleteControl.value;
  }

  restore(c: StopDeparturesComponent)
  {
    if(!this.isSaved) return;

    c.toolbarTitle = this.toolbarTitle;
    c.autocompleteOptions = this.autocompleteOptions;
    c.passages = this.passages;
    c.currentPassages = this.passages && this.passages.filter(p => !p.isOld);
    c.oldPassages = this.passages && this.passages.filter(p => p.isOld);
    c.autocompleteControl.setValue(this.autocompleteValue);
    if(this.autocompleteValue && (<StopAutocomplete>this.autocompleteValue).groupId)
      c.currentStop = <StopAutocomplete>this.autocompleteValue;
  }
}
