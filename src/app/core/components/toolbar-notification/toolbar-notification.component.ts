import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toolbar-notification',
  templateUrl: './toolbar-notification.component.html',
  styleUrls: ['./toolbar-notification.component.scss']
})
export class ToolbarNotificationComponent {
  cssPrefix = 'toolbar-notification';
  isOpen: boolean = false;

  @Input()
  notifications = [];

  // @HostListener('document:click', ['$event', '$event.target'])
  // onClick(event: MouseEvent, targetElement: HTMLElement) {
  //     if (!targetElement) {
  //           return;
  //     }
  //     const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  //     if (!clickedInside) {
  //          this.isOpen = false;
  //     }
  // }

  constructor(private elementRef: ElementRef) {}

  select(notification) {
    console.log('Select', notification);
  }

  delete(notification) {
    console.log('Delete', notification);
  }
}
