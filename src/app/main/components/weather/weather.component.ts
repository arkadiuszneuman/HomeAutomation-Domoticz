import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapApiService } from './service/open-weather-map-api.service'
import { WeathersIconsApi } from './weather-icons-api'


@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private weatherIcons = new WeathersIconsApi();
  public weatherIcon;
  public temp: number;
  public pressure: number;
  public humidity: number;

  constructor(private apiService: OpenWeatherMapApiService) { }

  ngOnInit() {
    this.refreshWeather();
  }

  public clicked() {
    this.refreshWeather();
  }

  private refreshWeather() {
    this.apiService.getCurrentWeather()
      .subscribe(weather => {

        console.log(weather);
        this.weatherIcon = this.weatherIcons.icons[weather.weather[0].id].icon;
        this.temp = Math.round(weather.main.temp * 10) / 10;
        this.pressure = weather.main.pressure;
        this.humidity = weather.main.humidity;
      });
  }
}
