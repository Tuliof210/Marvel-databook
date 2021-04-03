import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'component-filter',
  templateUrl: './filter.template.html',
  styleUrls: ['./filter.style.scss'],
})
export class FilterComponent implements OnInit {
  @Output() customQuery: EventEmitter<object> = new EventEmitter();

  textValue: string;
  displayQuery: string;

  desc: boolean = true;
  updated: boolean = true;

  currentFilter = {
    nameStartsWith: '',
    orderBy: '-modified',
  };

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendKeyWord();
  }

  ngOnInit(): void {}

  sendKeyWord(): void {
    if (this.textValue) {
      this.currentFilter['nameStartsWith'] = 'nameStartsWith=' + this.textValue;
      this.displayQuery = this.textValue;
      this.textValue = '';
      this.customQuery.emit(this.currentFilter);
    }
  }

  sendGenericFilter(): void {
    this.currentFilter['orderBy'] = `${this.desc ? '-' : ''}${this.updated ? 'modified' : 'name'}`;
    this.customQuery.emit(this.currentFilter);
  }

  resetSearchTerm() {
    this.currentFilter['nameStartsWith'] = '';
    this.customQuery.emit(this.currentFilter);
  }

  changeOrderBy(event: boolean) {
    this.updated = event;
    this.sendGenericFilter();
  }

  changeDownUpOrder(event: boolean) {
    this.desc = event;
    this.sendGenericFilter();
  }
}
