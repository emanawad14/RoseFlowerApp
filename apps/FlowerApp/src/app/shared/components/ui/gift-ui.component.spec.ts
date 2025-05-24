import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftUiComponent } from './gift-ui.component';

describe('GiftUiComponent', () => {
  let component: GiftUiComponent;
  let fixture: ComponentFixture<GiftUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
