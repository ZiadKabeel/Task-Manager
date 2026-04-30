import { Component, computed, inject } from "@angular/core";
import { taskcard } from "../taskcardComponent/taskCard";
import { TabsComponent } from "../tabs-component/tabs-component";
import { TaskService } from "../../services/task.service";
@Component({
    selector: "app-tasklist",
    templateUrl: "./tasklist.html",
    styleUrls: ["./tasklist.css"],
    imports: [taskcard, TabsComponent]
})
export class tasklist {
    taskService = inject(TaskService);

    filteredTasks = this.taskService.filteredTasks;
    currentTab = computed(() => this.taskService.getCurrentTab());
}