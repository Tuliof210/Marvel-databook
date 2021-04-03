import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Core imports
import { BrowserModule } from '@angular/platform-browser';
// Default imports
import { AppRoutingModule } from '../../app-routing.module';
// layouts
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, AppRoutingModule, BrowserModule],
  exports: [MainComponent],
})
export class LayoutsModule {}
