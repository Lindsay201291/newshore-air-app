import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync   } from '@angular/core/testing';

import { JourneyFormComponent } from './journey-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Journey } from 'src/app/core/models/journey.model';

describe('JourneyFormComponent', () => {
  let component: JourneyFormComponent;
  let fixture: ComponentFixture<JourneyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [JourneyFormComponent]
    });
    fixture = TestBed.createComponent(JourneyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate journey correctly', () => {

    let flights: any[]  = [
    {
      departureStation: "MZL",
      arrivalStation: "MDE",
      flightCarrier: "CO",
      flightNumber: "8001",
      price: 200
    },
    {   
      departureStation: "MZL",
      arrivalStation: "CTG",
      flightCarrier: "CO",
      flightNumber: "8002",
      price: 200
      },
    {
      departureStation: "PEI",
      arrivalStation: "BOG",
      flightCarrier: "CO",
      flightNumber: "8003",
      price: 200
    },
    {
      departureStation: "MDE",
      arrivalStation: "BCN",
      flightCarrier: "CO",
      flightNumber: "8004",
      price: 500
    },
    {
      departureStation: "CTG",
      arrivalStation: "CAN",
      flightCarrier: "CO",
      flightNumber: "8005",
      price: 300
    },
    {
      departureStation: "BOG",
      arrivalStation: "MAD",
      flightCarrier: "CO",
      flightNumber: "8006",
      price: 500
    },
    {
      departureStation: "BOG",
      arrivalStation: "MEX",
      flightCarrier: "CO",
      flightNumber: "8007",
      price: 300
    },
    {
      departureStation: "MZL",
      arrivalStation: "PEI",
      flightCarrier: "CO",
      flightNumber: "8008",
      price: 200
    },
    {
      departureStation: "MDE",
      arrivalStation: "CTG",
      flightCarrier: "CO",
      flightNumber: "8009",
      price: 200
    },
    {
      departureStation: "BOG",
      arrivalStation: "CTG",
      flightCarrier: "CO",
      flightNumber: "8010",
      price: 200
    },
    {
      departureStation: "MDE",
      arrivalStation: "MZL",
      flightCarrier: "CO",
      flightNumber: "9001",
      price: 200
    },
    {
      departureStation: "CTG",
      arrivalStation: "MZL",
      flightCarrier: "CO",
      flightNumber: "9002",
      price: 200
    },
    {
      departureStation: "BOG",
      arrivalStation: "PEI",
      flightCarrier: "CO",
      flightNumber: "9003",
      price: 200
    },
    {
      departureStation: "BCN",
      arrivalStation: "MDE",
      flightCarrier: "ES",
      flightNumber: "9004",
      price: 500
    },
    {
      departureStation: "CAN",
      arrivalStation: "CTG",
      flightCarrier: "MX",
      flightNumber: "9005",
      price: 300
    },
    {
      departureStation: "MAD",
      arrivalStation: "BOG",
      flightCarrier: "ES",
      flightNumber: "9006",
      price: 500
    },
    {
      departureStation: "MEX",
      arrivalStation: "BOG",
      flightCarrier: "MX",
      flightNumber: "9007",
      price: 300
    },
    {
      departureStation: "PEI",
      arrivalStation: "MZL",
      flightCarrier: "CO",
      flightNumber: "9008",
      price: 200
    },
    {
      departureStation: "CTG",
      arrivalStation: "MDE",
      flightCarrier: "CO",
      flightNumber: "9009",
      price: 200
    },
    {
      departureStation: "CTG",
      arrivalStation: "BOG",
      flightCarrier: "CO",
      flightNumber: "9010",
      price: 200
    }];
  
    component.origin = 'MZL';
    component.destination = 'BCN';
    component.calculateRoute(flights, 'USD');
  
    const expectedJourney: Journey = {
      origin: 'MZL',
      destination: 'BCN',
      price: 700,
      flights: [
        {
          transport: {
            flightCarrier: 'CO',
            flightNumber: '8001'
          },
          origin: 'MZL',
          destination: 'MDE',
          price: 200
        },
        {
          transport: {
            flightCarrier: 'CO',
            flightNumber: '8004'
          },
          origin: 'MDE',
          destination: 'BCN',
          price: 500
        }
      ]
    };
  
    expect(component.journey).toEqual(expectedJourney);
  });
});

