import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirElementComponent } from './dir-element.component';

describe('DirElementComponent', () => {
  let component: DirElementComponent;
  let fixture: ComponentFixture<DirElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
