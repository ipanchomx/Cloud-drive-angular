import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmaterialComponent } from './testmaterial.component';

describe('TestmaterialComponent', () => {
  let component: TestmaterialComponent;
  let fixture: ComponentFixture<TestmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
