import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from 'primeng/stepper';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-add-address',
  imports: [
    CommonModule,
    StepperModule,
    GlobalInputComponent,
    PrimaryBtnComponent,
    GoogleMapsModule,
  ],
  templateUrl: './addAddress.component.html',
  styleUrl: './addAddress.component.scss',
})
export class AddAddressComponent {
  activeStep: number = 1;
  zoom = 14;
  // location: google.maps.LatLngLiteral = {
  //   lat: 30.061611, // Ramses Cairo
  //   lng: 31.246907,
  // };
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral = {
    lat: 30.061611, // Ramses Cairo
    lng: 31.246907,
  };

  findMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.markerPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    } else {
      alert('Geolocation not supported by this browser.');
    }
  }

  // When user clicks on map
  setLocation(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markerPosition = { lat, lng };
      console.log('Selected Location:', lat, lng);
    }
  }
}
