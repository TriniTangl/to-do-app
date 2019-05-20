import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Group} from '../interfaces';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
    selector: 'app-to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
    private idGroup: number;
    public group: Group;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const parameterName: string = 'id';
        this.idGroup = Number(this.activatedRoute.snapshot.params[parameterName]);
        this.group = LocalStorageService.getData('TasksDB').filter(item => item.id === this.idGroup)[0];
        console.log(this.group);
    }

}
