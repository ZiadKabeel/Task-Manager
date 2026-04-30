export interface Task {
    id?: number;
    title: string;
    description: string;
    peririty: string;
    datetime: string;
    category: string;
    tags: string[];
    done?: boolean;
    isdeleted?: boolean;
}
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}
export type error = {
  message: string;
  state: boolean;
};

export type tabName = "all" | "done" | "notdone";

export interface Notification {
    message: string;
    type: "success" | "error" | "info" | "warning";
}