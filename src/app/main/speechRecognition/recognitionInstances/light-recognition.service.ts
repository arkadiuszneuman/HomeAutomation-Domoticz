import { Injectable } from '@angular/core';
import { IRecognizedService } from './recognition-factory.service'
import { DomoticzApiService, Light } from '../../service/domoticz-api.service';
import { SpeechSynthesisService } from '../speech-synthesis.service'

import { Observable } from "rxjs/Observable";

@Injectable()
export class LightRecognitionService implements IRecognizedService {

  constructor(private domoticzApi: DomoticzApiService,
    private speechSynthesisService: SpeechSynthesisService) { }

  canRecognize(text: string): boolean {
    return (text.includes('włącz') || text.includes('wyłącz'));
  }

  executeAction(text: string) {
    this.domoticzApi.getLights()
      .subscribe(lights => {
        for (var i = 0; i < lights.length; i++) {
          var light = lights[i];

          if (text.includes(light.Name.toLowerCase())) {
            const swichOn = text.includes('włącz');

            let command: Observable<any>;

            if (swichOn) {
              this.speechSynthesisService.speak('Włączam ' + light.Name)
              command = this.domoticzApi.switchOnLight(light);
            } else {
              this.speechSynthesisService.speak('Wyłączam ' + light.Name)
              command = this.domoticzApi.switchOffLight(light);
            }

            command.subscribe(() => {});

            break;
          }
        }
      });
  }
}
