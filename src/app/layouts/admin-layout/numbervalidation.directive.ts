import {  
    Directive,  
    ElementRef,  
    HostListener  
  } from '@angular/core';  
  @Directive({  
    selector: '[appNumbervalidation]'  
  })  
  export class NumbervalidationDirective {  
    // Allow decimal numbers and negative values
    private regex: RegExp = new RegExp(/^\d*\.?\d{0,0}$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  
    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
  
      console.log('element', event.target.value);
      // return;
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      let current: string = event.target.value;
      const position = this.el.nativeElement.selectionStart;
      // console.log('element position', position);
      const next: string = [current.slice(2, 4), event.key == 'Decimal' ? '.' : event.key, current.slice(0)].join('');
      console.log('next', next);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
  } 