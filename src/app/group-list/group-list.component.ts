import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {InitializationService} from '../services/initialization.service';
import {LocalStorageService} from '../services/local-storage.service';
import {GroupEditComponent} from '../group-edit/group-edit.component';
import {GroupItem, HttpErrorResponse, ParametersEditing} from '../interfaces';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
    public groupList: Array<GroupItem>;
    private readonly storageName: string;

    constructor(
        private initializationService: InitializationService,
        private dialog: MatDialog) {
        this.storageName = 'TasksDB';
        this.groupList = [];
    }

    ngOnInit() {
        if (LocalStorageService.checkData(this.storageName) === false) {
            this.initializationService.getInitialData()
                .subscribe(
                    (data: Array<GroupItem>) => {
                        LocalStorageService.setData(this.storageName, data);
                        this.updateGroupList();
                    },
                    (error: HttpErrorResponse) => {
                        console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                    }
                );
        }
        this.updateGroupList();
    }

    public openDialog(group?: GroupItem): void {
        const dialogRef = this.dialog.open(GroupEditComponent, {
            width: '300px',
            data: {group: group ? group : null}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (group) {
                    this.groupList[this.findTaskIndex(result.id)] = result;
                } else {
                    this.groupList.push(result);
                }
                this.updateLocalStorageData();
            }
        });
    }

    public changeGroup(parameters: ParametersEditing): void {
        const index: number = this.findTaskIndex(parameters.id);
        switch (parameters.action) {
            case 'edit': {
                this.openDialog(this.groupList[index]);
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
