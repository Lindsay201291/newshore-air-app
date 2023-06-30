import { Component } from '@angular/core';
import { FlightService } from '../../core/services/flight.service';
import { Journey } from '../../core/models/journey.model';

@Component({
  selector: 'app-journey-form',
  templateUrl: './journey-form.component.html',
  styleUrls: ['./journey-form.component.css']
})
export class JourneyFormComponent {
  origin: string = "";
  destination: string = "";
  journey!: Journey;

  constructor(private flightService: FlightService) { }

  calculateJourney(): void {
    this.flightService.getFlights(0).subscribe((flights) => {
      
    });
  }

  onInputToUpper(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }
}
