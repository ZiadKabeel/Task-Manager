import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Task, error } from "../../types";
import { TaskService } from "../../services/task.service";
import { NotificationService } from "../../services/notification.service";
@Component({ 
    selector: "app-input",
    templateUrl: "./input.html",
    styleUrls: ["./input.css"],
    imports: [FormsModule]
})
export class input {
    taskService = inject(TaskService);
    notificationService = inject(NotificationService);

    task : Task = {
        title: "",
        description: "",
        peririty: "",
        datetime: "",
        category: "",
        tags: [],
        done: false,
        isdeleted: false
    }
    tagsText = "";
    error : error = {
        message: "",
        state: false
    }
    isEditMode = false;

    ngOnInit(): void {
        const pendingTask = this.taskService.getTaskToEdit();
        if (!pendingTask) {
            return;
        }

        this.isEditMode = true;
        this.task = {
            ...pendingTask,
            tags: [...pendingTask.tags],
            done: pendingTask.done ?? false,
            isdeleted: false
        };
        this.tagsText = pendingTask.tags.join(", ");
    }
    
    addTask() {
        this.error.state = false;
        if(this.task.title === "" || this.task.description === "" || this.task.peririty === "" || this.task.datetime === "" || this.task.category === "" ){
            this.error.message = "All fields are required";
            this.error.state = true;
            this.notificationService.showNotification({
                message: "Please fill all required fields before saving the task.",
                type: "warning"
            });
            return;
        }
        const taskToEmit: Task = {
            ...this.task,
            id: undefined,
            tags: this.tagsText
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0),
            isdeleted: false
        };
        this.taskService.addTask(taskToEmit);

        this.notificationService.showNotification({
            message: this.isEditMode ? "Task edited and added again successfully!" : "Task added successfully!",
            type: "success"
        });

        this.task = {
            title: "",
            description: "",
            peririty: "",
            datetime: "",
            category: "",
            tags: [],
            done: false,
            isdeleted: false
        };
        this.tagsText = "";
        this.isEditMode = false;
        this.taskService.clearTaskToEdit();
    }

}