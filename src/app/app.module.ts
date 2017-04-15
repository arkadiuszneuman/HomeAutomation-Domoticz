import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { default as Ng2WeatherIconsModule } from 'ng2-weather-icons';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LightComponent } from './main/components/light/light.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './main/components/weather/weather.component';

import { SettingsService } from './settings/service/settings.service'
import { DomoticzApiService } from './main/service/domoticz-api.service';
import { OpenWeatherMapApiService } from './main/components/weather/service/open-weather-map-api.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent,
    LightComponent,
    WeatherComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    Ng2WeatherIconsModule 
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" },
    SettingsService, DomoticzApiService, OpenWeatherMapApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
