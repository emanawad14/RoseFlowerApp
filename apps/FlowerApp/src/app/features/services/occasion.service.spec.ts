import { OccasionApiInterface } from './base/occasionAPI';
import { TestBed } from '@angular/core/testing';

import { OccasionService } from './occasion.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccasionAdapter } from './adapter/occasion-adapter.adapter';
import { OccasionResponseInterface } from '../interfaces/occasion';
import { CheckboxOption } from '../interfaces/checbox-options';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { FiltersAPIEEndpoints } from './enums/filters.api.endpoints';

describe('OccasionService', () => {
  let service: OccasionService;
  let _httpTestController: HttpTestingController;
  let _OccasionAdapter: OccasionAdapter;

  const adaptedResult: CheckboxOption[] = [
    { label: 'cat1', value: 'cat1' },
    { label: 'cat2', value: 'cat2' },
  ];

  beforeEach(() => {
    const adapterMock = {
      adapt: jest.fn().mockReturnValue(adaptedResult),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccasionService,
        { provide: OccasionAdapter, useValue: adapterMock },
      ],
    });
    service = TestBed.inject(OccasionService);
    _httpTestController = TestBed.inject(HttpTestingController);
    _OccasionAdapter = TestBed.inject(OccasionAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    _httpTestController.verify(); // ✅ will NOT throw if assigned correctly
  });
  it('should call the API and return adapted result Occasions', () => {
    const mockResponse: OccasionResponseInterface = {
      message: 'string',
      metadata: { currentPage: 1, limit: 30, totalPages: 1, totalItems: 15 },
      occasions: [
        {
          _id: '673b34c21159920171827ae0',
          name: 'Wedding',
          slug: 'wedding',
          image:
            'da6919e9-6d7b-4e1e-9578-1c5b6fd098b2-sofia-hernandez-8cCfjxR8KTw-unsplash.jpg',
          createdAt: '2024-11-18T12:36:18.366Z',
          updatedAt: '2024-11-18T12:36:18.366Z',
          isSuperAdmin: true,
          productsCount: 5,
        },
      ],
    };

    service.getAllOccasions().subscribe((result) => {
      expect(result).toEqual(adaptedResult);
      expect(_OccasionAdapter.adapt).toHaveBeenCalledWith(mockResponse);
    });

    const req = _httpTestController.expectOne(
      `${environment.baseUrl}${FiltersAPIEEndpoints.GET_ALL_OCCASIONS}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
