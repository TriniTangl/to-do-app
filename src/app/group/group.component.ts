import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../interfaces';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @Input() group: Group;
    public activeCounter: number;
    public completedCounter: number;

    constructor() {
    }

    ngOnInit() {
        this.activeCounter = this.getCount(false);
        this.completedCounter = this.getCount(true);
    }

    private getCount(type: boolean): number {
        return this.group.tasks.filter(item => item.active === type).length;
    }


}
