import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeRateService {
  API_KEY = 'xKcLb2lT9oM3gl8oiodSibuNbBznMqgZ1JwfUIdw';
  private apiUrl = `${environment.currencyExchangeRateApoUrl}?apikey=${this.API_KEY}`;

  constructor(private http: HttpClient) { }

  getCurrencyData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
