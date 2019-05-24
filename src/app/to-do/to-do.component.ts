import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParametersEditing, ToDoItem} from '../interfaces';

@Component({
    selector: 'app-to-do',
    templateUrl: './to-do.component.html',
    styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
    @Input() task: ToDoItem;
    @Output() editTaskEmitter = new EventEmitter<ParametersEditing>();
    public inActive: boolean;

    constructor() {
        this.inActive = false;
    }

    ngOnInit() {
        this.inActive = new Date().getTime() > this.task.deadline;
    }

    public editTask(action: string): void {
        this.editTaskEmitter.emit({
            id: this.task.id,
            action
        });
    }
}
