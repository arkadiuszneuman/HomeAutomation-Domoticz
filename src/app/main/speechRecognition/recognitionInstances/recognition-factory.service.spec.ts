import { TestBed, inject } from '@angular/core/testing';

import { RecognitionFactoryService } from './recognition-factory.service';

describe('RecognitionFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecognitionFactoryService]
    });
  });

  it('should be created', inject([RecognitionFactoryService], (service: RecognitionFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
