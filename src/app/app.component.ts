import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedFeature: string;
  title = 'app';
  constructor() {

  }

  ngOnInit() {
    firebase.initializeApp({
    apiKey: 'AIzaSyCkydlbUhw6uSC3RVRLAesw2SwzOlnkWE8',
    authDomain: 'myangularjourney.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.selectedFeature = feature;
  }
}
