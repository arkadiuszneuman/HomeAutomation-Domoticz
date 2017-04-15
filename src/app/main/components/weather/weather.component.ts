import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapApiService } from './service/open-weather-map-api.service'
import { WeathersIconsApi } from './weather-icons-api'
import { WeatherNameToIconPipe } from 'ng2-weather-icons';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private weatherIcons = new WeathersIconsApi();
  public weatherIcon;
  public temp: number;
  public pressure: number;
  public humidity: number;
  public clouds: number;
  public wind: number;
  public weatherForDate: Date;

  constructor(private apiService: OpenWeatherMapApiService,
    private weatherNameToIconPipe: WeatherNameToIconPipe) { }

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
        
        this.weatherIcon = 'wi ' + this.weatherNameToIconPipe.transform(weather.weather[0].id);
        this.temp = Math.round(weather.main.temp);
        this.pressure = weather.main.pressure;
        this.humidity = weather.main.humidity;
        this.clouds = weather.clouds.all;
        this.wind = Math.round(weather.wind.speed);
        this.weatherForDate = weather.lastSearchTime;
      });
  }
}
