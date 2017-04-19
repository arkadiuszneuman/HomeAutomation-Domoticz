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
      let time = new Date(forecast.list[i].dt * 1000);
      time = this.convertToLocalTime(time);
      chartLabels[i] = time.getHours() + 'h' + time.getMinutes();
    }

    this.lineChartData[0] = chartData;
    this.lineChartLabels = chartLabels;
  }

  private convertToLocalTime(date: Date) {
    const offset = new Date().getTimezoneOffset();
    var newDate = new Date(date.getTime());
    
    newDate.setMinutes(newDate.getMinutes() + offset);

    return newDate;
  }

  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors:Array<any> = [
    {
      backgroundColor: '#FFF5CC',
      borderColor: '#FFCC00',
      pointBackgroundColor: '#FFF5CC',
      pointBorderColor: '#FFCC00',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
}
