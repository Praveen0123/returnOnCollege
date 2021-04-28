import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifetimeEarningsPopoverComponent } from './lifetime-earnings-popover.component';

describe('LifetimeEarningsPopoverComponent', () => {
  let component: LifetimeEarningsPopoverComponent;
  let fixture: ComponentFixture<LifetimeEarningsPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifetimeEarningsPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifetimeEarningsPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
