import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';
// import { Ng2WeatherIconsModule } from 'ng2-weather-icons';

import 'hammerjs';
import 'chart.js'

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LightComponent } from './main/components/light/light.component';
import { SettingsComponent } from './settings/settings.component';
import { WeatherComponent } from './main/components/weather/weather.component';
import { WeatherChartComponent } from './main/components/weather/weather-chart/weather-chart.component';

import { SettingsService } from './settings/service/settings.service'
import { DomoticzApiService } from './main/service/domoticz-api.service';
import { OpenWeatherMapApiService } from './main/components/weather/service/open-weather-map-api.service';
import { SpeechRecognitionService } from './main/speechRecognition/speech-recognition.service';
import { SpeechSynthesisService } from './main/speechRecognition/speech-synthesis.service';
import { RecognitionFactoryService } from './main/speechRecognition/recognitionInstances/recognition-factory.service';
import { MainKeywordRecognitionService } from './main/speechRecognition/recognitionInstances/main-keyword-recognition.service';
import { LightRecognitionService } from './main/speechRecognition/recognitionInstances/light-recognition.service';
import { SpeechRecognitionManagerService } from './main/speechRecognition/speech-recognition-manager.service';

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
    WeatherComponent,
    WeatherChartComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    ChartsModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" },
    SettingsService, DomoticzApiService, OpenWeatherMapApiService, SpeechRecognitionService,
      SpeechSynthesisService, RecognitionFactoryService, MainKeywordRecognitionService,
      LightRecognitionService, SpeechRecognitionManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
