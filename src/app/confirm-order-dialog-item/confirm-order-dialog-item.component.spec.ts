import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderDialogItemComponent } from './confirm-order-dialog-item.component';

describe('ConfirmOrderDialogItemComponent', () => {
  let component: ConfirmOrderDialogItemComponent;
  let fixture: ComponentFixture<ConfirmOrderDialogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderDialogItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderDialogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
