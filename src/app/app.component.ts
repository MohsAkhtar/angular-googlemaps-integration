import { Component, NgZone } from '@angular/core';
import {
  FormControl,
  Validators,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'criton-map-challenge';
  address = new FormControl('');
  lat = new FormControl('');
  lng = new FormControl('');

  // Method to be invoked everytime we receive a new instance
  // of the address object from the onSelect event emitter.
  setAddress(addressObj: object) {
    this.lat.setValue(addressObj['lat']);
    this.lng.setValue(addressObj['lng']);
  }
}
