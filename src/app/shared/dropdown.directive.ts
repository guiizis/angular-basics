import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  className = 'open'

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click', ['$event.target']) onClick(eventData: Event) {
    if (!this.elRef.nativeElement.classList.contains(this.className)) {
      this.renderer.addClass(this.elRef.nativeElement, this.className)
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, this.className)
    }
  }
}
