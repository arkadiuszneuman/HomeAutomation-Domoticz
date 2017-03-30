import { Component, OnInit } from '@angular/core';
import { Http, Response, Jsonp, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private jsonp: Jsonp, private http: Http) { }

  ngOnInit() {
    
  }

}
