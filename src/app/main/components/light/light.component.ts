import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from '../../../settings/service/settings.service'
import { DomoticzApiService, Light } from '../../service/domoticz-api.service';
import { SpeechRecognitionService } from '../../speechRecognition/speech-recognition.service';
import { SpeechSynthesisService } from '../../speechRecognition/speech-synthesis.service';

import { Observable } from "rxjs/Observable";

class SwitchableLight extends Light {
  isDisabled?: boolean = false;
}

@Component({
  selector: 'light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {

  public lights: SwitchableLight[];
  public speechData;
  constructor(private domoticzApi: DomoticzApiService,
    private speechRecognitionService: SpeechRecognitionService,
    private speechSynthesisService: SpeechSynthesisService) { }

  ngOnInit() {
    this.getLights();
    this.startRecognition();
  }

  private startRecognition() {
    this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;
                console.log(value);
                
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restarting service--");
                    this.startRecognition();
                }
            },
            //completion
            () => {
                console.log("--complete--");
                this.startRecognition();
            });
  }

  private getLights() {
    this.domoticzApi.getLights()
      .subscribe(lights => {
        this.lights = lights;
      });
  }

  public toggleLight(light: SwitchableLight) {

    light.isDisabled = true;
    let command: Observable<any>;

    if (light.Status == 'On') {
      command = this.domoticzApi.switchOffLight(light);
    } else {
      command = this.domoticzApi.switchOnLight(light);
    }

    command.subscribe(result => {
      this.getLights();
      light.isDisabled = false;
    });
  }
}
