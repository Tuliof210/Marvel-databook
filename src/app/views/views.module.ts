import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Views
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [HomeComponent, ListComponent, DetailsComponent],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class ViewsModule {}
