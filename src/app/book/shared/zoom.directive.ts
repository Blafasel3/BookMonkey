import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  // semantic class 'small' is activated when isZoomed is true
  @HostBinding('class.small') isZoomed: boolean;

  // listen to event Mouse Enter, set isZoomed to true
  @HostListener('mouseenter') onMouseEnter() {
    this.isZoomed = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isZoomed = false;
  }

}
