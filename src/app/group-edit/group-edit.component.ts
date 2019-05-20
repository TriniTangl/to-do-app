import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogDataGroup, DialogParameters} from '../interfaces';

@Component({
    selector: 'app-group-edit',
    templateUrl: './group-edit.component.html',
    styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
    public dialogParameters: DialogParameters;

    constructor(
        private dialogRef: MatDialogRef<GroupEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogDataGroup) {
    }

    ngOnInit() {
        this.dialogParameters = this.data.isEdit ? {
            title: 'Edit group',
            label: 'Name of group',
            button: 'Save'
        } : this.dialogParameters = {
            title: 'New group',
            label: 'Name of new group',
            button: 'Create'
        };
    }
}
