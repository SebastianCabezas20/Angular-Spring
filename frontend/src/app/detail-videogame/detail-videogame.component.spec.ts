import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVideogameComponent } from './detail-videogame.component';

describe('DetailVideogameComponent', () => {
  let component: DetailVideogameComponent;
  let fixture: ComponentFixture<DetailVideogameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailVideogameComponent]
    });
    fixture = TestBed.createComponent(DetailVideogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
