/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EnvioService } from './envio.service';

describe('Service: Envio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvioService]
    });
  });

  it('should ...', inject([EnvioService], (service: EnvioService) => {
    expect(service).toBeTruthy();
  }));
});
