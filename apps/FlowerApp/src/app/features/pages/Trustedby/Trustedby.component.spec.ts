import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrustedbyComponent } from './Trustedby.component';

describe('TrustedbyComponent', () => {
  let component: TrustedbyComponent;
  let fixture: ComponentFixture<TrustedbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedbyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustedbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
