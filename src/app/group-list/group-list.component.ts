import {Component, OnInit} from '@angular/core';
import {InitializationService} from '../services/initialization.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ErrorResponse, Group, ParametersGroup} from '../interfaces';
import {MatDialog} from '@angular/material';
import {GroupEditComponent} from '../group-edit/group-edit.component';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
    public groupList: Array<Group>;
    private readonly storageName: string;
    private nameGroup: string;

    constructor(
        private initializationService: InitializationService,
        private dialog: MatDialog) {
        this.groupList = [];
        this.storageName = 'TasksDB';
    }

    ngOnInit() {
        if (LocalStorageService.checkData(this.storageName) === false) {
            this.initializationService.getInitialData()
                .subscribe(
                    (data: Array<Group>) => {
                        LocalStorageService.setData('TasksDB', data);
                        this.updateGroupList();
                    },
                    (error: ErrorResponse) => {
                        console.log(error);
                    }
                );
        }
        this.updateGroupList();
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(GroupEditComponent, {
            width: '300px',
            data: {name, isEdit: false}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.groupList.push({
                    id: new Date().getTime(),
                    name: result,
                    tasks: []
                });
                this.updateLocalStorageData();
            }
        });
    }

    public changeGroup(parameters: ParametersGroup): void {
        switch (parameters.action) {
            case 'edit': {
                this.nameGroup = this.groupList[this.findTaskIndex(parameters.id)].name;
                const dialogRef = this.dialog.open(GroupEditComponent, {
                    width: '300px',
                    data: {name: this.nameGroup, isEdit: true}
                });
                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        this.groupList[this.findTaskIndex(parameters.id)].name = result;
                        this.updateLocalStorageData();
                    }
                });
                break;
            }
            case 'remove': {
                this.groupList.splice(this.findTaskIndex(parameters.id), 1);
                this.updateLocalStorageData();
                break;
            }
            default: {
                break;
            }
        }
    }

    private updateGroupList(): void {
        if (LocalStorageService.checkData(this.storageName)) {
            this.groupList = LocalStorageService.getData(this.storageName);
        }
    }

    private updateLocalStorageData(): void {
        LocalStorageService.setData(this.storageName, this.groupList);
    }

    private findTaskIndex(id: number): number {
        return this.groupList.findIndex(item => item.id === id);
    }
}
