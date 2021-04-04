import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'component-horizontal-row',
  templateUrl: './horizontal-row.template.html',
  styleUrls: ['./horizontal-row.style.scss'],
})
export class HorizontalRowComponent implements OnInit {
  constructor() {}

  @Input() fullData: any[];

  ngOnInit(): void {}

  openRedirect(link: string) {
    window.open(link, '_blank');
  }
}
