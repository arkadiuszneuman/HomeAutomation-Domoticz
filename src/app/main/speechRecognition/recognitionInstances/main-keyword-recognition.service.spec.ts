import { TestBed, inject } from '@angular/core/testing';

import { MainKeywordRecognitionService } from './main-keyword-recognition.service';

describe('MainKeywordRecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainKeywordRecognitionService]
    });
  });

  it('should be created', inject([MainKeywordRecognitionService], (service: MainKeywordRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
