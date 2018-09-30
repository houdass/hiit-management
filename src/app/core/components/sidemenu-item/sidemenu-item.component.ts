import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu-item',
  templateUrl: './sidemenu-item.component.html',
  styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent {
  @Input()
  menu;
  @Input()
  iconOnly: boolean;
  @Input()
  secondaryMenu = false;

  constructor(private authService: AuthService) {}

  openLink() {
    this.menu.open = this.menu.open;
  }

  chechForChildMenu() {
    return this.menu && this.menu.sub ? true : false;
  }
}
