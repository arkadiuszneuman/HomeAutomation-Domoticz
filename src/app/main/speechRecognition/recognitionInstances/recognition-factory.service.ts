import { Injectable } from '@angular/core';

export interface IRecognizedService {
  canRecognize(text: string): boolean;
  executeAction();
}

@Injectable()
export class RecognitionFactoryService {

  constructor() { }

  public getMainKeywordService(): IRecognizedService {
    return null;
  }

  // public getRecognitionServices: IRecognizedService[] {
  //   return null;
  // }
}
