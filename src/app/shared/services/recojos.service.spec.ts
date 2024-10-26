/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RecojosService } from './recojos.service';

describe('Service: Recojos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecojosService]
    });
  });

  it('should ...', inject([RecojosService], (service: RecojosService) => {
    expect(service).toBeTruthy();
  }));
});
