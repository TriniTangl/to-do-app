import {Component, OnInit} from '@angular/core';
import {InitializationService} from '../services/initialization.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ErrorResponse, Group} from '../interfaces';
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

    public openDialog(isClicked: boolean): void {
        const dialogRef = this.dialog.open(GroupEditComponent, {
            width: '300px',
            data: {name: this.nameGroup}
        });
        dialogRef.afterClosed().subscribe(result => {
            this.nameGroup = result;
            console.log(this.nameGroup);
        });
    }

    private updateGroupList(): void {
        if (LocalStorageService.checkData(this.storageName)) {
            this.groupList = LocalStorageService.getData(this.storageName);
        }
    }

    private updateLocalStorageData(): void {
        LocalStorageService.setData(this.storageName, this.groupList);
    }


}
