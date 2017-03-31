import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/service/settings.service'
import { DomoticzApiService } from './main/service/domoticz-api.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SettingsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [SettingsService, DomoticzApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
