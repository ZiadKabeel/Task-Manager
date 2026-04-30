import { Component, inject } from '@angular/core';
import { tabName } from '../../types';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tabs-component',
  imports: [],
  templateUrl: './tabs-component.html',
  styleUrl: './tabs-component.css',
})

export class TabsComponent {
  taskService = inject(TaskService);

  nameoftab: tabName = this.taskService.getCurrentTab();

  setTab(tab: tabName) {
    this.nameoftab = tab;
    this.taskService.setTab(this.nameoftab);
  }

}
