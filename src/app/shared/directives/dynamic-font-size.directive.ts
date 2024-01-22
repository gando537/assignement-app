import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appDynamicFontSize]'
})
export class DynamicFontSizeDirective implements OnInit {
    @Input() texte: string = '';

    constructor(private el: ElementRef) {}

    ngOnInit() {
        const fontSize = this.calculateFontSize(this.texte.length);
        this.el.nativeElement.style.fontSize = fontSize;
    }

    calculateFontSize(textLength: number): string {
        if (textLength < 10) {
            return '1.2em';
        } else if (textLength < 20) {
            return '0.9em';
        } else {
            return '0.5em';
        }
    }
}

