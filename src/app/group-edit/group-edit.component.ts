import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData, DialogParameters, GroupItem} from '../interfaces';

@Component({
    selector: 'app-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.scss'],
})
export class GroupEditComponent implements OnInit {
    public dialogParameters: DialogParameters;
    public groupForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<GroupEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.groupForm = new FormGroup({
            groupName: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        if (this.data.group) {
            this.groupForm.setValue({
                groupName: this.data.group.name
            });
            this.dialogParameters = {
                title: 'Edit group',
                labels: ['Name of group'],
                button: 'Save'
            };
        } else {
            this.dialogParameters = this.dialogParameters = {
                title: 'New group',
                labels: ['Name of new group'],
                button: 'Create'
            };
        }
    }

    public createResponse(): GroupItem {
        return {
            id: this.data.group ? this.data.group.id : new Date().getTime(),
            name: this.groupForm.value.groupName,
            tasks: this.data.group ? this.data.group.tasks : []
        };
    }
}
