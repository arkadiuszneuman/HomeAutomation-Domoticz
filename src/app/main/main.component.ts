import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from '../settings/service/settings.service'
import { DomoticzApiService } from './service/domoticz-api.service';

import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private lights;
  constructor(private domoticzApi: DomoticzApiService) { }

  ngOnInit() {
   this.getLights();
  }

  private getLights() {
    this.domoticzApi.getLights()
          .subscribe(lights => {
            this.lights = lights;
          });
  }

  public toggleLight(light) {

    let command: Observable<any>;

    if (light.Status == 'On') {
      command = this.domoticzApi.switchOffLight(light);
    } else {
      command = this.domoticzApi.switchOnLight(light);    
    }

    command.subscribe(result => this.getLights());
  }
}
