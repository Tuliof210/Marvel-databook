import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [CardComponent, FilterComponent],
  imports: [CommonModule, FormsModule],
  exports: [CardComponent, FilterComponent],
})
export class ComponentsModule {}
