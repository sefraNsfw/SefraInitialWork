import { TestBed, inject } from '@angular/core/testing';

import { RgfService } from './rgf.service';

describe('RgfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RgfService]
    });
  });

  it('should ...', inject([RgfService], (service: RgfService) => {
    expect(service).toBeTruthy();
  }));
});
