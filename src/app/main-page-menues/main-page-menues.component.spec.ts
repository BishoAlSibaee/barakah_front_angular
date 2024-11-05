import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMenuesComponent } from './main-page-menues.component';

describe('MainPageMenuesComponent', () => {
  let component: MainPageMenuesComponent;
  let fixture: ComponentFixture<MainPageMenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageMenuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPageMenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
