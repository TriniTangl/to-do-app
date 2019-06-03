import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly storageName: string;

    constructor() {
        this.storageName = 'TasksDB';
    }

    public getData(): any {
        return JSON.parse(localStorage.getItem(this.storageName));
    }

    public setData(data: any): void {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }

    public clearData(): void {
        localStorage.removeItem(this.storageName);
    }

    public checkData(): boolean {
        return Boolean(localStorage.getItem(this.storageName));
    }
}
