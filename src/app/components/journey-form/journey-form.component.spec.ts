import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyFormComponent } from './journey-form.component';
import { FlightService } from '../../core/services/flight.service';
import { of } from 'rxjs';
import { Flight } from '../../core/models/flight.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('JourneyFormComponent', () => {
  let component: JourneyFormComponent;
  let fixture: ComponentFixture<JourneyFormComponent>;
  let flightService: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [JourneyFormComponent],
      providers: [FlightService]
    });
    fixture = TestBed.createComponent(JourneyFormComponent);
    component = fixture.componentInstance;
    flightService = TestBed.inject(FlightService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate journey correctly', () => {
    const flights: Flight[] = [
      {
        transport: {
          flightCarrier: 'AV',
          flightNumber: '8020'
        },
        departureStation: 'MZL',
        arrivalStation: 'JFK',
        price: 1000.00
      },
      {
        transport: {
          flightCarrier: 'AV',
          flightNumber: '8040'
        },
        departureStation: 'JFK',
        arrivalStation: 'BCN',
        price: 1000.00
      }
    ];
    spyOn(flightService, 'getFlights').and.returnValue(of(flights));
    component.origin = 'MZL';
    component.destination = 'BCN';
    component.calculateJourney('USD');
    expect(component.journey).toEqual({
      origin: 'MZL',
      destination: 'BCN',
      price: 2000.00,
      flights: flights
    });
  });
});
