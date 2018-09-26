import { Component } from '@angular/core';
import { routerTransition } from './app.animations';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  getState(outlet: RouterOutlet): any {
    console.log(outlet);
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
