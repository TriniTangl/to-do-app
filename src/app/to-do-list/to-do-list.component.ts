import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckbox, MatCheckboxChange, MatDialog} from '@angular/material';
import {LocalStorageService} from '../services/local-storage.service';
import {ToDoEditComponent} from '../to-do-edit/to-do-edit.component';
import {ActionParameters, FilterStatus, GroupItem, ToDoItem} from '../interfaces';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
    @ViewChild('matCheckbox') matCheckbox: MatCheckbox;
    public groupList: Array<GroupItem>;
    public group: GroupItem;
    public renderList: Array<ToDoItem>;
    public filters: FilterStatus;
    private groupId: number;
    private readonly storageName: string;

    constructor(
        private localStorageService: LocalStorageService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog) {
        this.storageName = 'TasksDB';
        this.groupList = [];
        this.renderList = [];
        this.setDefaultFilterStatus(false);
    }

    public get activeTasksCount(): number {
        return this.renderList.filter(item => item.active === true).length;
    }

    ngOnInit() {
        this.updateGroupList();
        this.groupId = Number(this.activatedRoute.snapshot.params.id);
        this.group = this.groupList[this.findArrayIndex(this.groupList, this.groupId)];
        this.updateRenderList();
    }

    public editTaskList(parameters: ActionParameters) {
        const index: number = this.findArrayIndex(this.group.tasks, parameters.id);
        switch (parameters.action) {
            case 'changeStatus': {
                this.group.tasks[index].active = !this.group.tasks[index].active;
                break;
            }
            case 'editData': {
                this.openDialog(this.group.tasks[index]);
                break;
            }
            case 'removeTask': {
                this.group.tasks.splice(index, 1);
                break;
            }
            default: {
                break;
            }
        }
        this.updateRenderList();
        this.updateLocalStorageData();
    }

    public openDialog(task?: ToDoItem): void {
        const dialogRef = this.dialog.open(ToDoEditComponent, {
            width: '300px',
            data: {task: task ? task : null}
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (task) {
                    this.group.tasks[this.findArrayIndex(this.group.tasks, result.id)] = result;
                } else {
                    this.group.tasks.push(result);
                }
                this.updateRenderList();
                this.updateLocalStorageData();
            }
        });
    }

    public filterTask(type: string): void {
        this.setDefaultFilterStatus(true);
        switch (type) {
            case 'all': {
                this.renderList = this.group.tasks;
                this.filters.all = true;
                break;
            }
            case 'today': {
                const nowDate = new Date();
                this.renderList = this.group.tasks.filter(item => {
                    const deadlineDate = new Date(item.deadline);
                    return deadlineDate.getFullYear() === nowDate.getFullYear() &&
                        deadlineDate.getMonth() === nowDate.getMonth() &&
                        deadlineDate.getDate() === nowDate.getDate();
                });
                this.filters.today = true;
                break;
            }
            case 'active': {
                this.renderList = this.group.tasks.filter(item => item.active === true);
                this.filters.active = true;
                break;
            }
            case 'completed': {
                this.renderList = this.group.tasks.filter(item => item.active === false);
                this.filters.completed = true;
                break;
            }
            default: {
                break;
            }
        }
        this.updateMainCheckbox();
    }

    public clearCompletedTasks(): void {
        console.log(this.renderList);
        const temp = this.renderList;
        temp.forEach((item: ToDoItem) => {
            if (item.active === false) {
                console.log(item);
                this.group.tasks.splice(this.findArrayIndex(this.group.tasks, item.id), 1);
            }
        });
        this.renderList = temp;
        this.updateRenderList();
        this.updateLocalStorageData();
    }

    public changeAllTasksStatus(event: MatCheckboxChange): void {
        this.renderList.forEach((item: ToDoItem) => {
            this.group.tasks[this.findArrayIndex(this.group.tasks, item.id)].active = !event.checked;
        });
        this.updateRenderList();
        this.updateLocalStorageData();
    }

    public updateMainCheckbox(): void {
        this.matCheckbox.checked = this.renderList.every(item => item.active === false) && this.renderList.length > 0;
        this.matCheckbox.disabled = this.renderList.length <= 0;
    }

    private updateGroupList(): void {
        if (this.localStorageService.checkData()) {
            this.groupList = this.localStorageService.getData();
        }
    }

    private updateLocalStorageData(): void {
        this.groupList[this.findArrayIndex(this.groupList, this.groupId)] = this.group;
        this.localStorageService.setData(this.groupList);
    }

    private updateRenderList(): void {
        if (this.filters.today) {
            this.filterTask('today');
        } else if (this.filters.active) {
            this.filterTask('active');
        } else if (this.filters.completed) {
            this.filterTask('completed');
        } else {
            this.filterTask('all');
        }
    }

    private findArrayIndex(array: Array<any>, id: number): number {
        return array.findIndex(item => item.id === id);
    }

    private setDefaultFilterStatus(isReset: boolean): void {
        this.filters = {
            all: !isReset,
            today: false,
            active: false,
            completed: false
        };
    }
}
