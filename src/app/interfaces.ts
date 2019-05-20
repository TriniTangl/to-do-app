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

export interface DialogDataGroup {
    name: string;
    isEdit: boolean;
}

export interface ParametersGroup {
    action: string;
    id: number;
}

export interface DialogParameters {
    title: string;
    label: string;
    button: string;
}


