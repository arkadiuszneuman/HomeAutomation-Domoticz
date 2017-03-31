import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from '../settings/service/settings.service'
import { DomoticzApiService } from './service/domoticz-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private lights;
  constructor(private domoticzApi: DomoticzApiService) { }

  ngOnInit() {
    this.domoticzApi.getLights()
      .subscribe(lights => {
        this.lights = lights;
      });
    var  x = 123;
    ++x;
  }

}
