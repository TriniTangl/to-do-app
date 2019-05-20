import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group, ParametersGroup} from '../interfaces';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @Input() group: Group;
    @Output() changeGroupEmitter = new EventEmitter<ParametersGroup>();
    public allCounter: number;
    public activeCounter: number;
    public completedCounter: number;

    constructor() { }

    ngOnInit() {
        this.allCounter = this.group.tasks.length;
        this.activeCounter = this.getCount(false);
        this.completedCounter = this.getCount(true);
    }

    public changeGroup(actionMethod: string): void {
        this.changeGroupEmitter.emit({
            action: actionMethod,
            id: this.group.id
        });
    }

    private getCount(type: boolean): number {
        return this.group.tasks.filter(item => item.active === type).length;
    }
}
