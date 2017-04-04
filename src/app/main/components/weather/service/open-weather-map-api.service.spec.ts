import { TestBed, inject } from '@angular/core/testing';

import { OpenWeatherMapApiService } from './open-weather-map-api.service';

describe('OpenStreetMapApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenWeatherMapApiService]
    });
  });

  it('should ...', inject([OpenWeatherMapApiService], (service: OpenWeatherMapApiService) => {
    expect(service).toBeTruthy();
  }));
});
