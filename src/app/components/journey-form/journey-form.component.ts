import { Component } from '@angular/core';
import { FlightService } from '../../core/services/flight.service';
import { CurrencyExchangeRateService } from '../../core/services/currency-exchange-rate.service';
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
  isLoading: boolean = false;
  hasData: boolean = true;
  currency: string = "";
  euroExchangeRate: number = 0.920161;
  sterlingExchangeRate: number = 0.792766;
  visitedStations: string[]  = [];

  constructor(private flightService: FlightService, private currencyExchangeRateService: CurrencyExchangeRateService) { }

  ngOnInit(): void {
    this.currencyExchangeRateService.getCurrencyData().subscribe(response => {
      this.euroExchangeRate = response.data['EUR'];
      this.sterlingExchangeRate = response.data['GBP'];
    });
  }

  resetJourney() {
    this.journey = null;
  }

  saveVisitedStations(station: string) {
    this.visitedStations.push(station);
  }

  getVisitedStations(station: string) {
    for (let i = 0; i < this.visitedStations.length; i++) {
      if (station === this.visitedStations[i]) {
        return true;
      }
    }
    return false;
  }

  calculateJourney(currency: string) {
    this.visitedStations = [];
    this.journey = null;
    this.isLoading = true;
    this.hasData = true;
    let exchangeRate: number;

    if (currency === "USD") {
      exchangeRate = 1;
    } else if (currency === "EUR") {
      exchangeRate = this.euroExchangeRate;
    } else if (currency === "GBP") {
      exchangeRate = this.sterlingExchangeRate;
    }

    this.flightService.getFlights(2).subscribe((flights: Flight[]) => {
      const journeyFlights: Flight[] = [];
      let currentOrigin = this.origin.toUpperCase();
      this.destination = this.destination.toUpperCase();
      console.log(currentOrigin);
      console.log(this.destination);
      let iterations = 0;

      while (currentOrigin !== this.destination && iterations < flights.length) {
        iterations++;
        let nextFlight: any = flights.find((flight) => flight.departureStation === currentOrigin);

        if (nextFlight && !this.getVisitedStations(currentOrigin)) {

          let transport = {
            flightCarrier: nextFlight.flightCarrier,
            flightNumber: nextFlight.flightNumber
          };

          let flight: Flight = {
            transport: transport,
            departureStation: nextFlight.departureStation,
            arrivalStation: nextFlight.arrivalStation,
            price: parseFloat((nextFlight.price*exchangeRate).toFixed(2))
          };

          journeyFlights.push(flight);
          this.saveVisitedStations(currentOrigin);
          currentOrigin = nextFlight.arrivalStation;
        } else {
          this.journey = null;
          this.isLoading = false;
          this.hasData = false;
          return;
        }
      }

      this.journey = {
        origin: this.origin,
        destination: this.destination,
        price: journeyFlights.reduce((totalPrice, flight) => totalPrice + flight.price, 0),
        flights: journeyFlights
      };

      console.log(JSON.stringify(this.journey))
      this.isLoading = false;
    });
  }

  onInputToUpper(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }
}
