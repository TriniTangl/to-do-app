import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupItem, ActionParameters} from '../interfaces';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @Input() group: GroupItem;
    @Output() changeGroupEmitter = new EventEmitter<ActionParameters>();
    public allCounter: number;
    public activeCounter: number;
    public completedCounter: number;

    constructor() {
    }

    ngOnInit() {
        this.allCounter = this.group.tasks.length;
        this.activeCounter = this.getCount(true);
        this.completedCounter = this.getCount(false);
    }

    public changeGroup(action: string): void {
        this.changeGroupEmitter.emit({
            id: this.group.id,
            action
        });
    }

    private getCount(isActive: boolean): number {
        return this.group.tasks.filter(item => item.active === isActive).length;
    }
}
