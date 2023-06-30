import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CurrencyExchangeRateService } from './currency-exchange-rate.service';

describe('CurrencyExchangeRateService', () => {
  let service: CurrencyExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyExchangeRateService]
    });
    service = TestBed.inject(CurrencyExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
