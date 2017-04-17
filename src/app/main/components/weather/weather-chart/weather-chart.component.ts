import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapApiService, Forecast } from '../service/open-weather-map-api.service'

@Component({
  selector: 'weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent implements OnInit {

  public lineChartData: Array<number[]>;
  public lineChartLabels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  constructor(private apiService: OpenWeatherMapApiService) { }

  ngOnInit() {
    this.lineChartData = new Array<number[]>();

    this.apiService.getForecast()
      .subscribe(forecast => {
        console.log(forecast);
        this.prepareData(forecast);
      });
  }

  private prepareData(forecast: Forecast) {
    const chartData: number[] = [];
    const chartLabels: string[] = [];

    for (let i = 0; i < 5; ++i) {
      chartData[i] = forecast.list[i].main.temp;
      var time = new Date(forecast.list[i].dt * 1000);
      chartLabels[i] = time.getHours() + 'h' + time.getMinutes();
    }

    this.lineChartData[0] = chartData;
    this.lineChartLabels = chartLabels;
  }

  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
}
