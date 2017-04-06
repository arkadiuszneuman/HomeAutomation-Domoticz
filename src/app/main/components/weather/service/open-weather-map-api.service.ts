import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { SettingsService, Settings } from "../../../../settings/service/settings.service";

export class CurrentWeather {
  test?: number;
  lastSearchTime?: Date;
}

@Injectable()
export class OpenWeatherMapApiService {

  private server = 'http://api.openweathermap.org/data/2.5/';
  private weather: CurrentWeather = {};

  private waitMinutes = 10;
  private weatherKey = "weatherKey";


  constructor(private http: Http, private settingsService: SettingsService) {
    var weatherString = localStorage.getItem(this.weatherKey);
    if (weatherString != null) {
      this.weather = JSON.parse(weatherString, this.dateTimeReviver);
    } else {
      this.weather = {}
    }
  }

  private dateTimeReviver = (key, value) => {
    var a;
    if (typeof value === 'string') {
      a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/.exec(value);
      if (a) {
        return new Date(value);
      }
    }
    return value;
  }

  public getCurrentWeather() {
    if (this.shouldSearch(this.weather.lastSearchTime)) {
      this.weather.lastSearchTime = new Date();
      const settings = this.settingsService.get();

      const query = `${this.server}weather?id=7530992&APPID=${settings.openWeatherMapApiKey}&units=metric`;

      return this.http.get(query)
        .map(c => {

          this.weather = c.json();
          this.weather.lastSearchTime = new Date();

          localStorage.setItem(this.weatherKey, JSON.stringify(this.weather));

          return this.weather;
        });
    } else {
      return Observable.create(subscriber => {
        subscriber.next(this.weather);
        subscriber.complete();
      });
    }
  }

  private shouldSearch(lastDate: Date): boolean {
    if (lastDate == null)
      return true;

    var diffMs = new Date().getTime() - lastDate.getTime();
    var diffMins = Math.floor((diffMs / 1000) / 60)

    return diffMins >= this.waitMinutes;
  }
}
