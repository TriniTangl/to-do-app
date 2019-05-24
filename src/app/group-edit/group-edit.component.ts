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
            nameGroup: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
        this.dialogParameters = this.data.group ? {
            title: 'Edit group',
            labels: ['Name of group'],
            button: 'Save'
        } : this.dialogParameters = {
            title: 'New group',
            labels: ['Name of new group'],
            button: 'Create'
        };
        if (this.data.group) {
            this.groupForm.setValue({
                nameGroup: this.data.group.name
            });
        }
    }

    public createResponse(): GroupItem {
        return {
            id: this.data.group ? this.data.group.id : new Date().getTime(),
            name: this.groupForm.value.nameGroup,
            tasks: this.data.group ? this.data.group.tasks : []
        };
    }
}
