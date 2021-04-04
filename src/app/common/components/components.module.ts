import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { FilterComponent } from './filter/filter.component';
import { HorizontalRowComponent } from './horizontal-row/horizontal-row.component';

@NgModule({
  declarations: [CardComponent, FilterComponent, HorizontalRowComponent],
  imports: [CommonModule, FormsModule],
  exports: [CardComponent, FilterComponent, HorizontalRowComponent],
})
export class ComponentsModule {}
