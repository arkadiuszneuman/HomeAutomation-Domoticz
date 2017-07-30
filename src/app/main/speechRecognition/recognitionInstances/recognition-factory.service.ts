import { Injectable } from '@angular/core';
import { MainKeywordRecognitionService } from './main-keyword-recognition.service'
import { LightRecognitionService } from './light-recognition.service'

export interface IRecognizedService {
  canRecognize(text: string): boolean;
  executeAction(text: string);
}

@Injectable()
export class RecognitionFactoryService {

  constructor(private mainKeywordRecognitionService: MainKeywordRecognitionService,
    private lightRecognitionService: LightRecognitionService) { }

  public getMainKeywordService(): IRecognizedService {
    return this.mainKeywordRecognitionService;
  }

  public getRecognitionServices(): IRecognizedService[] {
    const array: Array<IRecognizedService> = [];
    
    array.push(this.lightRecognitionService);

    return array;
  }
}
