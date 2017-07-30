import { Injectable } from '@angular/core';

@Injectable()
export class SpeechSynthesisService {

  constructor() { }

  public speak(text: string) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }
}
