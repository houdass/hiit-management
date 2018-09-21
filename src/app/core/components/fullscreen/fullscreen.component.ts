import { Component } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html'
})
export class FullscreenComponent {
  isFullscreen = false;

  constructor() {}

  toggleFullscreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    }
  }
}
