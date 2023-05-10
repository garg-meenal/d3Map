import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { UsaMapComponent } from './usa-map/usa-map.component';
import { MapboxComponent } from './mapbox/mapbox.component';

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent,
    UsaMapComponent,
    MapboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
