import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from '../../../settings/service/settings.service'
import { DomoticzApiService, Light } from '../../service/domoticz-api.service';

import { Observable } from "rxjs/Observable";

class SwitchableLight extends Light {
  isDisabled?: boolean = false;
}

@Component({
  selector: 'light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  private lights: SwitchableLight[];
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

  public toggleLight(light: SwitchableLight) {

    light.isDisabled = true;
    let command: Observable<any>;

    if (light.Status == 'On') {
      command = this.domoticzApi.switchOffLight(light);
    } else {
      command = this.domoticzApi.switchOnLight(light);
    }

    command.subscribe(result => {
      this.getLights();
      light.isDisabled = false;
    });
  }
}
