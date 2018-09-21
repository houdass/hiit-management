import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { fadeAnimation, routerTransition } from './animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [routerTransition]
})
export class ContentComponent implements OnInit, OnChanges {
  @Input()
  isVisible = true;
  visibility = 'shown';

  sideNavOpened = true;
  matDrawerOpened = false;
  matDrawerShow = true;
  sideNavMode = 'side';

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  constructor(private media: ObservableMedia) {}

  ngOnInit() {
    this.media.subscribe((mediaChange: MediaChange) => {
      this.toggleView();
    });
  }

  toggleView() {
    if (this.media.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true;
      this.matDrawerOpened = false;
      this.matDrawerShow = true;
    } else if (this.media.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false;
      this.matDrawerOpened = true;
      this.matDrawerShow = true;
    } else if (this.media.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false;
      this.matDrawerOpened = false;
      this.matDrawerShow = false;
    }
  }

  getState(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
