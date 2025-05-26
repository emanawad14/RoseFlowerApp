import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarousolComponent } from './carousol.component';

describe('CarousolComponent', () => {
  let component: CarousolComponent;
  let fixture: ComponentFixture<CarousolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarousolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarousolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
