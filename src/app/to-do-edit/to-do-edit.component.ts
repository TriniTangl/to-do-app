import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData, DialogParameters, ToDoItem} from '../interfaces';

@Component({
    selector: 'app-to-do-edit',
    templateUrl: './to-do-edit.component.html',
    styleUrls: ['./to-do-edit.component.scss']
})
export class ToDoEditComponent implements OnInit {
    public dialogParameters: DialogParameters;
    public taskForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ToDoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.taskForm = new FormGroup({
            taskText: new FormControl('', Validators.required),
            taskDate: new FormControl('', Validators.required),
            taskTime: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.dialogParameters = this.data.task ? {
            title: 'Edit task',
            labels: [
                'Edit new task',
                'Enter date',
                'Enter time'
            ],
            button: 'Save'
        } : this.dialogParameters = {
            title: 'New task',
            labels: [
                'Create new task',
                'Enter date',
                'Enter time'
            ],
            button: 'Create'
        };
        if (this.data.task) {
            this.taskForm.setValue({
                taskText: this.data.task.text,
                taskDate: formatDate(this.data.task.deadline, 'yyyy-MM-dd', 'en-US'),
                taskTime: formatDate(this.data.task.deadline, 'HH:mm', 'en-US')
            });
        }
    }

    public createResponse(): ToDoItem {
        return {
            id: this.data.task ? this.data.task.id : new Date().getTime(),
            active: this.data.task ? this.data.task.active : true,
            text: this.taskForm.value.taskText,
            deadline: new Date(`${this.taskForm.value.taskDate} ${this.taskForm.value.taskTime}`).getTime()
        };
    }
}
