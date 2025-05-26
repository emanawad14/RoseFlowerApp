import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarFeaturesComponent } from './avatar-features.component';

describe('AvatarFeaturesComponent', () => {
  let component: AvatarFeaturesComponent;
  let fixture: ComponentFixture<AvatarFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
