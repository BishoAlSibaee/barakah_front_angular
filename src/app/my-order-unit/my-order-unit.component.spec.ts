import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderUnitComponent } from './my-order-unit.component';

describe('MyOrderUnitComponent', () => {
  let component: MyOrderUnitComponent;
  let fixture: ComponentFixture<MyOrderUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrderUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOrderUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
