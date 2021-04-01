// Core imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Default imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Custom modules
import { LayoutsModule } from './components/layouts/layouts.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LayoutsModule, ViewsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
