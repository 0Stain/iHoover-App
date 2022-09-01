import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Grille } from '../../model/grille.model';
import { Aspirateur } from '../../model/aspirateur.model';

@Component({
  selector: 'app-grille-formulaire',
  templateUrl: './grille-formulaire.component.html',
  styleUrls: ['./grille-formulaire.component.css']
})
export class GrilleFormulaireComponent implements OnInit {
  @Output()
  validerEvent = new EventEmitter();
  @Input()
  grille: Grille;
  @Input()
  aspirateur: Aspirateur;

  dimensionXFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  dimensionYFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  aspirateurPositionXFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  aspirateurPositionYFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$')
  ]);
  orientationFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[NESW]$')
  ]);
  instructionsFormControl = new FormControl('', [
    Validators.pattern('^[ADG]*$')
  ]);

  constructor() {
  }

  ngOnInit(): void {
  }

  valider(): void {
    this.validerEvent.emit();
  }

}
