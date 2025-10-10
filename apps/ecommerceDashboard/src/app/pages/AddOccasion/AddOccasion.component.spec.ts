import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOccasionComponent } from './AddOccasion.component';

describe('AddOccasionComponent', () => {
  let component: AddOccasionComponent;
  let fixture: ComponentFixture<AddOccasionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOccasionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOccasionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
