import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { CountByCategoryService } from '../../../services/count-by-category.service';
import { CountbycategoryAdapter } from './adapter/count-by-category.adapter';
import { CountbycategoryResponse } from '../interfaces/countbycategory';
import { CheckboxOption } from '../interfaces/checbox-options';
import { environment } from 'apps/FlowerApp/src/environments/environment';
import { FiltersAPIEEndpoints } from './enums/filters.api.endpoints';

describe('CountByCategoryService ', () => {
  let service: CountByCategoryService;
  let httpMock: HttpTestingController;
  let adapter: CountbycategoryAdapter;

  const mockResponse: CountbycategoryResponse = {
    categoryProductCount: [
      { _id: 'cat1', category: 'cat1', productCount: 2 },
      { _id: 'cat2', category: 'cat2', productCount: 2 },
    ],
  };

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
        CountByCategoryService,
        { provide: CountbycategoryAdapter, useValue: adapterMock },
        provideHttpClientTesting(), // ✅ NEW recommended API
      ],
    });

    service = TestBed.inject(CountByCategoryService);
    httpMock = TestBed.inject(HttpTestingController);
    adapter = TestBed.inject(CountbycategoryAdapter);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify(); // ✅ will NOT throw if assigned correctly
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API and return adapted result', () => {
    service.getCountByCategory().subscribe((result) => {
      expect(result).toEqual(adaptedResult);
      expect(adapter.adapt).toHaveBeenCalledWith(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}${FiltersAPIEEndpoints.GET_COUNT_BY_CATEGORY}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
