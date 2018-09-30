import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from '../../app.animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [routerTransition]
})
export class AuthComponent {
  getState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
