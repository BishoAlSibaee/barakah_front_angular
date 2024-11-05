import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmClientUserComponent } from './confirm-client-user.component';

describe('ConfirmClientUserComponent', () => {
  let component: ConfirmClientUserComponent;
  let fixture: ComponentFixture<ConfirmClientUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmClientUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmClientUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
