import { Component, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  sidenav;

  @Input()
  drawer;

  @Input()
  matDrawerShow;

  searchOpen = false;
  toolbarHelpers = ToolbarHelpers;

  constructor(public authService: AuthService) {}
}
