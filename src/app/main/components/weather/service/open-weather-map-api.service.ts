import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { SettingsService, Settings } from "../../../../settings/service/settings.service";

export class Weather {
  lastSearchTime?: Date;
  dt?: number;
  name?: string;

  main?: MainWeatherInfo;
}

export class MainWeatherInfo {
  humidity?: number;
  pressure?: number;
  temp?: number;
  temp_max?: number;
  temp_min?: number;
}

export class Forecast {
  lastSearchTime?: Date;
  list?: Array<Weather>;
}

@Injectable()
export class OpenWeatherMapApiService {

  private server = 'http://api.openweathermap.org/data/2.5/';
  private weather: Weather;
  private forecast: Forecast;

  private waitMinutes = 10;
  private weatherKey = "weatherKey";
  private forecastKey = "forecastKey";

  constructor(private http: Http, private settingsService: SettingsService) {
    var weatherString = localStorage.getItem(this.weatherKey);
    if (weatherString != null) {
      this.weather = JSON.parse(weatherString, this.dateTimeReviver);
    } else {
      this.weather = {}
    }

    var forecastString = localStorage.getItem(this.forecastKey);
    if (forecastString != null) {
      this.forecast = JSON.parse(forecastString, this.dateTimeReviver);
    } else {
      this.forecast = {}
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

  public getForecast(): Observable<Forecast> {
    if (this.shouldSearch(this.forecast.lastSearchTime)) {
      this.forecast.lastSearchTime = new Date();
      const settings = this.settingsService.get();

      const query = `${this.server}forecast?id=7530992&APPID=${settings.openWeatherMapApiKey}&units=metric`;

      return this.http.get(query)
        .map(c => {

          this.forecast = c.json();
          this.forecast.lastSearchTime = new Date();

          localStorage.setItem(this.forecastKey, JSON.stringify(this.forecast));

          return this.forecast;
        });
    } else {
      return Observable.create(subscriber => {
        subscriber.next(this.forecast);
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
