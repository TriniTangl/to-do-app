import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
    styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {
    @Output() clickEmitter = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    public click(isClicked: boolean): void {
        this.clickEmitter.emit(isClicked);
    }
}
