import { Injectable } from '@angular/core';

@Injectable()
export class SpeechSynthesisService {

  constructor() { }

  public speak(text: string, rate: number = 1) {
    var msg = new SpeechSynthesisUtterance(text);
    msg.rate = rate;
    window.speechSynthesis.speak(msg);
  }
}
