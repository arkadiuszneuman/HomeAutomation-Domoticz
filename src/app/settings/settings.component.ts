import { Component, OnInit } from '@angular/core';
import { SettingsService, Settings } from './service/settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: Settings;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = this.settingsService.get();
  }

  public save() {
      this.settingsService.save(this.settings);
  }
}
