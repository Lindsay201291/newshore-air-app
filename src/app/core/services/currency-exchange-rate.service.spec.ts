import { TestBed } from '@angular/core/testing';

import { CurrencyExchangeRateService } from './currency-exchange-rate.service';

describe('CurrencyExchangeRateService', () => {
  let service: CurrencyExchangeRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
