import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPageComponent } from './dropdown-page.component';

describe('DropdownPageComponent', () => {
  let component: DropdownPageComponent;
  let fixture: ComponentFixture<DropdownPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownPageComponent]
    });
    fixture = TestBed.createComponent(DropdownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
