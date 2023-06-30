import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../../core//models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'https://recruiting-api.newshore.es/api/flights';


  constructor(private http: HttpClient) { }

  getFlights(routeType: number): Observable<Flight[]> {
    const url = `${this.apiUrl}/${routeType}`;
    return this.http.get<Flight[]>(url);
  }
}
