import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAddressesComponent } from './getAddresses.component';

describe('GetAddressesComponent', () => {
  let component: GetAddressesComponent;
  let fixture: ComponentFixture<GetAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAddressesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
