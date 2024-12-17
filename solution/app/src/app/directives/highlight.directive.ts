import { Directive, ElementRef, HostListener, Input } from '@angular/core';

// Esta directiva pinta de color los elementos al pasar por encima

@Directive({
  selector: '[appHighlight]',
  standalone: true, // Esto lo escribí yo a mano
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input('appHighlight')
  color!: string;

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  private defaultColor = 'lightblue';

  @HostListener('mouseenter')
  onMouseEnterEvent() {
    this.highlight(this.color || this.defaultColor);
  }

  @HostListener('mouseleave')
  onMouseLeaveEvent() {
    this.highlight('');
  }
}
