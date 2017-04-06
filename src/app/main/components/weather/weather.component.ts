import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapApiService } from './service/open-weather-map-api.service'

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private apiService: OpenWeatherMapApiService) { }

  ngOnInit() {
  }

  public clicked() {
    this.apiService.getCurrentWeather()
      .subscribe(weather => { 
        console.log(weather)
      });
  }

}
