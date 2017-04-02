import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from '../../settings/service/settings.service';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

export class Light {
  Name: string;
  Status: string;
}

@Injectable()
export class DomoticzApiService {

  private server = 'http://192.168.1.200:8080/';

  constructor(private http: Http, private settingsService: SettingsService) { }

  public getLights(): Observable<Light[]> {
    const settings = this.settingsService.get();

    return this.http.get(`${this.server}json.htm?type=devices&filter=light&used=true&username=${btoa(settings.login)}&password=${btoa(settings.password)}`)
      .map(c => c.json().result);
  }

  public switchOffLight(light) {
    const settings = this.settingsService.get();

    return this.http.get(`${this.server}json.htm?type=command&param=switchlight&idx=${light.idx}&switchcmd=Off&username=${btoa(settings.login)}&password=${btoa(settings.password)}`)
      .map(c => c.json().result);
  }

  public switchOnLight(light) {
    const settings = this.settingsService.get();

    return this.http.get(`${this.server}json.htm?type=command&param=switchlight&idx=${light.idx}&switchcmd=On&username=${btoa(settings.login)}&password=${btoa(settings.password)}`)
      .map(c => c.json().result);
  }
}
