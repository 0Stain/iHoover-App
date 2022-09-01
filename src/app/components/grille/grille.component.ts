import { Component, Input, OnInit } from '@angular/core';
import { Grille } from '../../model/grille.model';
import { Aspirateur } from '../../model/aspirateur.model';
import { Case } from '../../model/case.model';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {
  @Input()
  grille: Grille;
  @Input()
  aspirateur: Aspirateur;

  aspirateurDisplay: Aspirateur;
  grilleDisplay: Array<Array<Case>>;

  private N = 'transform:rotate(0deg);';
  private E = 'transform:rotate(90deg);';
  private S = 'transform:rotate(180deg);';
  private W = 'transform:rotate(270deg);';
  private orientationsStyle = new Map().set('N', this.N).set('E', this.E).set('S', this.S).set('W', this.W);
  private orientationsOrdre = ['N', 'E', 'S', 'W']; // [0, 1, 2, 3]

  constructor() {
  }

  ngOnInit(): void {
  }

  update(): void {
    this.aspirateurDisplay = {
      position: {
        X: +this.aspirateur.position.X,
        Y: +this.aspirateur.position.Y
      },
      orientation: this.aspirateur.orientation
    };
    this.grille.dimensions.X = +this.grille.dimensions.X;
    this.grille.dimensions.Y = +this.grille.dimensions.Y;
    this.dessinerGrille();
    this.lancer();
  }

  dessinerGrille(): void {
    this.grilleDisplay = new Array<Array<Case>>();
    let sousGrilleDisplay: Array<Case>;
    for (let row = 0; row < this.grille.dimensions.Y; row++) {
      sousGrilleDisplay = new Array<Case>();
      for (let column = 0; column < this.grille.dimensions.X; column++) {
        if (row === this.YDisplayCalcul(this.aspirateurDisplay.position.Y) && column === this.aspirateurDisplay.position.X) {
          sousGrilleDisplay.push({
            image: 'assets/vacuum-cleaner.png',
            orientation: this.orientationsStyle.get(this.aspirateurDisplay.orientation)
          });
        } else {
          sousGrilleDisplay.push({
            image: 'assets/carreBleuClair.png',
            orientation: this.N
          });
        }
      }
      this.grilleDisplay.push(sousGrilleDisplay);
    }
  }

  YDisplayCalcul(Y): number {
    return this.grille.dimensions.Y - 1 - Y;
  }

  avancer(): Aspirateur {
    const newAspirateur = this.aspirateurDisplay;
    let newY;
    let newX;
    switch (this.aspirateurDisplay.orientation) {
      case 'N':
        newY = (this.aspirateurDisplay.position.Y + 1);
        if (newY === this.grille.dimensions.Y) {
          newY = this.aspirateurDisplay.position.Y;
        }
        newAspirateur.position.Y = newY;
        break;
      case 'E':
        newX = this.aspirateurDisplay.position.X + 1;
        if (newX === this.grille.dimensions.X) {
          newX = this.aspirateurDisplay.position.X;
        }
        newAspirateur.position.X = newX;
        break;
      case 'S':
        newY = this.aspirateurDisplay.position.Y - 1;
        if (newY === -1) {
          newY = 0;
        }
        newAspirateur.position.Y = newY;
        break;
      case 'W':
        newX = this.aspirateurDisplay.position.X - 1;
        if (newX === -1) {
          newX = 0;
        }
        newAspirateur.position.X = newX;
        break;
      default:
        break;
    }
    return newAspirateur;
  }

  lancer(): void {
    const instructions = this.grille.instructions;
    instructions.split('', instructions.length).map(instruction => {
      const indexOldOrientation = this.orientationsOrdre.indexOf(this.aspirateurDisplay.orientation);
      let newOrientation = this.aspirateurDisplay.orientation;
      let newPosition = this.aspirateurDisplay.position;
      switch (instruction) {
        case 'A':
          newPosition = this.avancer().position;
          break;
        case 'D':
          newOrientation = this.orientationsOrdre[(indexOldOrientation + 1) % 4];
          break;
        case 'G':
          let indexNewOrientation = indexOldOrientation - 1;
          if (indexNewOrientation === -1) {
            indexNewOrientation = 3;
          }
          newOrientation = this.orientationsOrdre[indexNewOrientation];
          break;
        default:
          break;
      }
      this.aspirateurDisplay = {
        position: newPosition,
        orientation: newOrientation
      };
      this.dessinerGrille();
    });
  }

}
