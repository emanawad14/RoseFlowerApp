import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarsRatingsComponent } from './starsRatings.component';

describe('StarsRatingsComponent', () => {
  let component: StarsRatingsComponent;
  let fixture: ComponentFixture<StarsRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarsRatingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarsRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
