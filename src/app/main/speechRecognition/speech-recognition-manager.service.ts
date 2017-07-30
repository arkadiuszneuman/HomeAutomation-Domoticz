import { Injectable } from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';
import { SpeechSynthesisService } from './speech-synthesis.service';
import { RecognitionFactoryService } from './recognitionInstances/recognition-factory.service';
import { IRecognizedService } from './recognitionInstances/recognition-factory.service'

@Injectable()
export class SpeechRecognitionManagerService {

    private mainKeywordService: IRecognizedService;
    private recognitionServices: IRecognizedService[];

    private isMainWordExecuted = false;

    constructor(private speechRecognitionService: SpeechRecognitionService,
        private speechSynthesisService: SpeechSynthesisService,
        private recognitionFactoryService: RecognitionFactoryService) { 

        this.mainKeywordService = this.recognitionFactoryService.getMainKeywordService();
        this.recognitionServices = this.recognitionFactoryService.getRecognitionServices(); 
    }
    
    public start() {
        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value: string) => {
                value = value.toLowerCase();
                console.log(value);

                if (!this.isMainWordExecuted) {
                    if (this.mainKeywordService.canRecognize(value.toLowerCase())) {
                        this.mainKeywordService.executeAction(value.toLowerCase());
                        this.isMainWordExecuted = true;
                    }
                } else {
                    for (var i = 0; i < this.recognitionServices.length; i++) {
                        var recognitionService = this.recognitionServices[i];
                        if (recognitionService.canRecognize(value)) {
                            recognitionService.executeAction(value);
                            break;
                        }
                        
                        this.speechSynthesisService.speak("Nie rozpoznaję komendy");
                        this.isMainWordExecuted = false;
                    }
                }
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restarting service--");
                    this.start();
                }
            },
            //completion
            () => {
                console.log("--complete--");
                this.start();
            });
    }
}
