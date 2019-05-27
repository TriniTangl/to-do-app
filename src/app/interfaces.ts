export interface ToDoItem {
    id: number;
    active: boolean;
    text: string;
    deadline: number;
}

export interface GroupItem {
    id: number;
    name: string;
    tasks: Array<ToDoItem>;
}

export interface HttpErrorResponse {
    status: number;
    message: string;
}

export interface ActionParameters {
    action: string;
    id: number;
}

export interface DialogData {
    task?: ToDoItem;
    group?: GroupItem;
}

export interface DialogParameters {
    title: string;
    labels: Array<string>;
    button: string;
}

export interface FilterStatus {
    all: boolean;
    today: boolean;
    active: boolean;
    completed: boolean;
}
