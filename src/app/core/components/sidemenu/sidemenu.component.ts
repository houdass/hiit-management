import { Component, Input } from '@angular/core';
import { menus } from './menu-element';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  @Input()
  iconOnly = false;
  public menus = menus;

  constructor() {}
}
