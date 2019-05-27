import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionParameters, ToDoItem} from '../interfaces';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
    @Input() task: ToDoItem;
    @Output() editTaskEmitter = new EventEmitter<ActionParameters>();
    public inactive: boolean;

    constructor() {
        this.inactive = false;
    }

    ngOnInit() {
        this.inactive = new Date().getTime() > this.task.deadline;
    }

    public editTask(action: string): void {
        this.editTaskEmitter.emit({
            id: this.task.id,
            action
        });
    }
}
