import { TestBed, inject } from '@angular/core/testing';

import { LightRecognitionService } from './light-recognition.service';

describe('LightRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightRecognitionService]
    });
  });

  it('should be created', inject([LightRecognitionService], (service: LightRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
