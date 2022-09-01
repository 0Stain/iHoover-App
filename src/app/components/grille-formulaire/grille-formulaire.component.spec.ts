import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleFormulaireComponent } from './grille-formulaire.component';

describe('GrilleFormulaireComponent', () => {
  let component: GrilleFormulaireComponent;
  let fixture: ComponentFixture<GrilleFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleFormulaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
