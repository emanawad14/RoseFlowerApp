import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalCkeckboxGroupComponent } from './global-ckeckbox-group.component';

describe('GlobalCkeckboxComponent', () => {
  let component: GlobalCkeckboxGroupComponent;
  let fixture: ComponentFixture<GlobalCkeckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalCkeckboxGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalCkeckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
