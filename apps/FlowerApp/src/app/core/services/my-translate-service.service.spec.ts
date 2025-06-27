import { TestBed } from '@angular/core/testing';

import { MyTranslateServiceService } from './my-translate-service.service';

describe('MyTranslateServiceService', () => {
  let service: MyTranslateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTranslateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
