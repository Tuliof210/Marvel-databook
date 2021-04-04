import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Views
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
// Custom modules
import { ComponentsModule } from '../common/components/components.module';

@NgModule({
  declarations: [HomeComponent, ListComponent, DetailsComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [HomeComponent],
})
export class ViewsModule {}
