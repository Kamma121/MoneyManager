import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingModalComponent } from './add-saving-modal.component';

describe('AddSavingModalComponent', () => {
  let component: AddSavingModalComponent;
  let fixture: ComponentFixture<AddSavingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSavingModalComponent]
    });
    fixture = TestBed.createComponent(AddSavingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
