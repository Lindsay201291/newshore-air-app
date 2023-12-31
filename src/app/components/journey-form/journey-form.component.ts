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
    this.currencyExchangeRateService.getCurrencyData().subscribe({
      next: (response) => {
        this.euroExchangeRate = response.data['EUR'];
        this.sterlingExchangeRate = response.data['GBP'];
      },
      error: (error) => {
        console.log(error.message);
      }
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

  getExchangeRate(currency: string): number {
    if (currency === "USD") {
      return 1;
    } else if (currency === "EUR") {
      return this.euroExchangeRate;
    } else if (currency === "GBP") {
      return this.sterlingExchangeRate;
    }
    return 0;
  }

  calculateRoute(flights: any[], currency: string) {
    this.visitedStations = [];
    this.journey = null;
    this.hasData = true;
    let exchangeRate: number = this.getExchangeRate(currency);
    this.origin = this.origin.toUpperCase();

    let journeyFlights: Flight[] = [];
    let currentOrigin = this.origin;
    this.destination = this.destination.toUpperCase();
    let iterations = 0;

    while (iterations < flights.length) {
      iterations++;
      journeyFlights = [];
      this.visitedStations = [];
      currentOrigin = this.origin.toUpperCase();
      let route: any;

      route = flights.find((flight) => flight.departureStation === currentOrigin);

      while (currentOrigin !== this.destination) {

        let nextFlight: any;

        nextFlight = flights.find(flight => flight.departureStation === currentOrigin && flight.arrivalStation === this.destination);
        
        if (nextFlight) {
          let transport = {
            flightCarrier: nextFlight.flightCarrier,
            flightNumber: nextFlight.flightNumber
          };

          let flight: Flight = {
            transport: transport,
            origin: nextFlight.departureStation.toUpperCase(),
            destination: nextFlight.arrivalStation.toUpperCase(),
            price: parseFloat((nextFlight.price*exchangeRate).toFixed(2))
          };

          journeyFlights.push(flight);
          this.saveVisitedStations(currentOrigin);
          currentOrigin = nextFlight.arrivalStation;

          this.journey = {
            origin: this.origin,
            destination: this.destination,
            price: parseFloat(journeyFlights.reduce((totalPrice, flight) => totalPrice + flight.price, 0).toFixed(2)),
            flights: journeyFlights
          };

          this.isLoading = false;
          window.scrollTo(0, document.body.scrollHeight);
          return;
        }

        nextFlight = flights.find((flight) => flight.departureStation === currentOrigin);

        if (nextFlight && !this.getVisitedStations(currentOrigin)) {

          let transport = {
            flightCarrier: nextFlight.flightCarrier,
            flightNumber: nextFlight.flightNumber
          };

          let flight: Flight = {
            transport: transport,
            origin: nextFlight.departureStation.toUpperCase(),
            destination: nextFlight.arrivalStation.toUpperCase(),
            price: parseFloat((nextFlight.price*exchangeRate).toFixed(2))
          };

          journeyFlights.push(flight);
          this.saveVisitedStations(currentOrigin);
          currentOrigin = nextFlight.arrivalStation;

        } else {
            break;
        }
      }

      let index = flights.indexOf(route);

      if (index !== -1) {
        flights.splice(index, 1);
      }

      if (currentOrigin === this.destination) {
        break;
      }
  }

    if (journeyFlights.length > 0) {
      this.journey = {
        origin: this.origin,
        destination: this.destination,
        price: parseFloat(journeyFlights.reduce((totalPrice, flight) => totalPrice + flight.price, 0).toFixed(2)),
        flights: journeyFlights
      };
      
    } else {
      this.journey = null;
      this.isLoading = false;
      this.hasData = false;
    }
    window.scrollTo(0, document.body.scrollHeight);
    this.isLoading = false;
  }

  getFlights(currency: string) {
    this.isLoading = true;
    this.journey = null;
    this.flightService.getFlights(2).subscribe({
      next: (flights: Flight[]) => {
        this.calculateRoute(flights, currency);
      },
      error: (error) => {
        this.hasData = false;
        this.isLoading = false;
        console.log(error.message);
      }
    });
  }

  onInputToUpper(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }
}
