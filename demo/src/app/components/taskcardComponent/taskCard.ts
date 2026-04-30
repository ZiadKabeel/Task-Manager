import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Task } from "../../types";
import { TaskService } from "../../services/task.service";
import { NotificationService } from "../../services/notification.service";
@Component({
    selector: "app-taskcard",
    templateUrl: "./taskCard.html",
    styleUrls: ["./taskCard.css"]
})
export class taskcard {
    taskService = inject(TaskService);
    notificationService = inject(NotificationService);
    router = inject(Router);

    @Input() task!: Task;

    maketaskdone(){
        this.taskService.toggleTaskDone(this.task);
        const updatedDoneState = !this.task.done;
        this.notificationService.showNotification({
            message: updatedDoneState ? "Task marked as done." : "Task marked as not done.",
            type: "success"
        });
    }

    deleteTask(){
        this.taskService.markTaskAsDeleted(this.task);
        this.notificationService.showNotification({
            message: "Task Deleted successfully!",
            type: "success"
        });
    }

    editTask(){
        this.taskService.setTaskToEdit(this.task);
        this.taskService.markTaskAsDeleted(this.task);
        this.notificationService.showNotification({
            message: "Task loaded for editing.",
            type: "info"
        });
        this.router.navigate(['/add']);
    }

}