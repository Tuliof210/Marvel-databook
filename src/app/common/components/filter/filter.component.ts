import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'component-filter',
  templateUrl: './filter.template.html',
  styleUrls: ['./filter.style.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchTerm: EventEmitter<string> = new EventEmitter();

  textValue: string;
  currentSearch: string;

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendValue();
  }

  ngOnInit(): void {}

  sendValue(): void {
    this.currentSearch = this.textValue;
    this.textValue = '';
    if (this.currentSearch) this.searchTerm.emit(this.currentSearch);
  }
}
