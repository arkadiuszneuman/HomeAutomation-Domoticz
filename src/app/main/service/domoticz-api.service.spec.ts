import { TestBed, inject } from '@angular/core/testing';

import { DomoticzApiService } from './domoticz-api.service';

describe('DomoticzApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomoticzApiService]
    });
  });

  it('should ...', inject([DomoticzApiService], (service: DomoticzApiService) => {
    expect(service).toBeTruthy();
  }));
});
