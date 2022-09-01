import { Component, ViewChild } from '@angular/core';
import { Grille } from './model/grille.model';
import { GrilleComponent } from './components/grille/grille.component';
import { Aspirateur } from './model/aspirateur.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iHoover';
  grille: Grille = {
    dimensions: {
      X: 10,
      Y: 10
    },
    instructions: ''
  };
  aspirateur: Aspirateur = {
    position: {
      X: 0,
      Y: 0
    },
    orientation: 'N'
  };

  @ViewChild('grilleComponent')
  grilleComponent: GrilleComponent;

  validerEvent(): void {
    this.grilleComponent.update();
  }
}
