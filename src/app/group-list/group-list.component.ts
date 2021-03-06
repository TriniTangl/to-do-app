import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {InitializationService} from '../services/initialization.service';
import {LocalStorageService} from '../services/local-storage.service';
import {GroupEditComponent} from '../group-edit/group-edit.component';
import {ActionParameters, GroupItem} from '../interfaces';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
    public groupList: Array<GroupItem>;

    constructor(
        private localStorageService: LocalStorageService,
        private initializationService: InitializationService,
        private dialog: MatDialog) {
        this.groupList = [];
    }

    ngOnInit() {
        this.initializationService.initializeData()
            .subscribe(
                () => this.updateGroupList()
            );
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
                    this.groupList[this.findGroupIndex(result.id)] = result;
                } else {
                    this.groupList.push(result);
                }
                this.updateLocalStorageData();
            }
        });
    }

    public changeGroup(parameters: ActionParameters): void {
        const index: number = this.findGroupIndex(parameters.id);
        switch (parameters.action) {
            case 'edit': {
                this.openDialog(this.groupList[index]);
                break;
            }
            case 'remove': {
                this.groupList.splice(index, 1);
                this.updateLocalStorageData();
                break;
            }
            default: {
                break;
            }
        }
    }

    private updateGroupList(): void {
        if (this.localStorageService.checkData()) {
            this.groupList = this.localStorageService.getData();
        }
    }

    private updateLocalStorageData(): void {
        this.localStorageService.setData(this.groupList);
    }

    private findGroupIndex(id: number): number {
        return this.groupList.findIndex(item => item.id === id);
    }
}
