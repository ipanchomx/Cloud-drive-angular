import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhotoFormComponent } from './change-photo-form.component';

describe('ChangePhotoFormComponent', () => {
  let component: ChangePhotoFormComponent;
  let fixture: ComponentFixture<ChangePhotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePhotoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
