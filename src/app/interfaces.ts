export interface ToDo {
    id: number;
    active: boolean;
    text: string;
    deadline: number;
}

export interface Group {
    id: number;
    name: string;
    tasks: Array<ToDo>;
}

export interface ErrorResponse {
    status: number;
    message: string;
}

export interface DialogData {
    id: number;
    name: string;
    tasks: Array<ToDo>;
}
