import { Component } from '@angular/core';
import { FlightService } from '../../core/services/flight.service';
import { Journey } from '../../core/models/journey.model';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.css']
})
export class JourneyFormComponent {
  origin: string = "";
  destination: string = "";
  journey!: Journey | null;

  constructor(private flightService: FlightService) { }

  calculateJourney(): void {
    this.flightService.getFlights(0).subscribe((flights: Flight[]) => {
      const journeyFlights: Flight[] = [];
      let currentOrigin = this.origin;

      while (currentOrigin !== this.destination) {
        const nextFlight = flights.find((flight) => flight.departureStation === currentOrigin);

        if (nextFlight) {
          journeyFlights.push(nextFlight);
          currentOrigin = nextFlight.arrivalStation;
        } else {
          this.journey = null;
          return;
        }
      }

      this.journey = {
        origin: this.origin,
        destination: this.destination,
        price: journeyFlights.reduce((totalPrice, flight) => totalPrice + parseFloat(flight.price), 0),
        flights: journeyFlights
      };
    });
  }

  onInputToUpper(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }
}
