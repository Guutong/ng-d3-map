import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import DottedMap from 'dotted-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dottwd-map';
  worldMap: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.createMap();
  }

  createMap() {
    
  }
}
