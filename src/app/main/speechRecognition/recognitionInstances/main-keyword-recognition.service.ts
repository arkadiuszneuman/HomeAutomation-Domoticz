import { Injectable } from '@angular/core';
import { IRecognizedService } from './recognition-factory.service'
import { SpeechSynthesisService } from '../speech-synthesis.service'

@Injectable()
export class MainKeywordRecognitionService implements IRecognizedService {

  constructor(private speechSynthesisService: SpeechSynthesisService) { }

  canRecognize(text: string): boolean {
    if (text == 'ok domku' || text == 'hej domku' || text == 'okej domku'){
      return true;
    }
    return false;
  }

  executeAction(text: string) {
    this.speechSynthesisService.speak('Słucham', 1.2);
  }
}
