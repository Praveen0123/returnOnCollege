import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifetimeEarningsComponent } from './lifetime-earnings.component';

describe('LifetimeEarningsComponent', () => {
  let component: LifetimeEarningsComponent;
  let fixture: ComponentFixture<LifetimeEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifetimeEarningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifetimeEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
