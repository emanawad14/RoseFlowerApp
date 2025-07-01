import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalCkeckboxComponent } from './globalCkeckbox.component';

describe('GlobalCkeckboxComponent', () => {
  let component: GlobalCkeckboxComponent;
  let fixture: ComponentFixture<GlobalCkeckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCkeckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalCkeckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
