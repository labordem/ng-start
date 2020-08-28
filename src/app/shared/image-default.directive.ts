import { Directive, HostBinding, HostListener, Input } from '@angular/core';

/**
 * Replace undefined/unreachable image by a default one.
 *
 * Usage :
 * <img src="yourSource" default="profile"
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'img[default]',
})
export class ImageDefaultDirective {
  @Input() default!: string;
  @HostBinding('src') @Input() src!: string;

  // tslint:disable-next-line: no-unsafe-any
  @HostListener('error') onError(): void {
    if (this.default === 'profile') {
      this.src =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/150px-Placeholder_no_text.svg.png';
    }
  }
}
