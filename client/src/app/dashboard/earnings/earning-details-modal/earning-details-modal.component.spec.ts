import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EarningDetailsModalComponent} from './earning-details-modal.component';

describe('EarningDetailsModalComponent', () => {
  let component: EarningDetailsModalComponent;
  let fixture: ComponentFixture<EarningDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarningDetailsModalComponent]
    });
    fixture = TestBed.createComponent(EarningDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
