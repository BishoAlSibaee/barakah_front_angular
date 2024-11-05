import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressUnitComponent } from './address-unit.component';

describe('AddressUnitComponent', () => {
  let component: AddressUnitComponent;
  let fixture: ComponentFixture<AddressUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressUnitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
