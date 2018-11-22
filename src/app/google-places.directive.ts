/// <reference types="@types/googlemaps" />
import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    // elRef will get a reference to the element where
    // the directive is placed
    this.element = elRef.nativeElement;
  }

  getGeoAddress(place) {
    // @params: place - Google Autocomplete place object
    // @returns: location_obj - An address object in human readable format

    const location_obj = {};

    location_obj['formatted_address'] = place.formatted_address;

    try {
      location_obj['lat'] = place.geometry.location.lat();
      location_obj['lng'] = place.geometry.location.lng();
    } catch (e) {
      console.log(e instanceof TypeError); // true
      console.log(e.message); // "Hello"
      console.log(e.name); // "TypeError"
    }
    console.log(location_obj);
    return location_obj;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element);

    // Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      // Emit the new address object for the updated place
      this.onSelect.emit(this.getGeoAddress(autocomplete.getPlace()));
    });
  }
}
