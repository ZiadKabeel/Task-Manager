import { inject, Injectable, computed, signal } from '@angular/core';
import { Task, tabName } from '../types';
import { API } from './api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  api = inject(API);
  tasks = signal<Task[]>([]);
  currentTab = signal<tabName>('all');
  taskToEdit = signal<Task | null>(null);

  filteredTasks = computed(() => {
    const tab = this.currentTab();
    const allTasks = this.tasks();

    if (tab === 'done') {
      return allTasks.filter((task) => !!task.done && !task.isdeleted);
    }

    if (tab === 'notdone') {
      return allTasks.filter((task) => !task.done && !task.isdeleted);
    }

    return allTasks.filter((task) => !task.isdeleted);
  });

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.api.getTasks().subscribe({
      next: (tasks) => {
        const normalizedTasks = tasks.map((task) => ({
          ...task,
          done: task.done ?? false,
          isdeleted: task.isdeleted ?? false,
          tags: task.tags ?? []
        }));
        this.tasks.set(normalizedTasks);
      },
      error: () => {
        this.tasks.set([]);
      }
    });
  }

  setTab(tab: tabName): void {
    this.currentTab.set(tab);
  }

  getCurrentTab(): tabName {
    return this.currentTab();
  }

  setTaskToEdit(task: Task): void {
    this.taskToEdit.set({
      ...task,
      tags: [...task.tags]
    });
  }

  getTaskToEdit(): Task | null {
    return this.taskToEdit();
  }

  clearTaskToEdit(): void {
    this.taskToEdit.set(null);
  }

  addTask(task: Task): void {
    const taskToAdd: Task = {
      ...task,
      tags: [...task.tags],
      done: task.done ?? false,
      isdeleted: false
    };

    this.api.addTask(taskToAdd).subscribe({
      next: (createdTask) => {
        this.tasks.update((tasks) => [...tasks, createdTask]);
      }
    });
  }

  toggleTaskDone(task: Task): void {
    if (task.id === undefined) {
      return;
    }

    const newDoneValue = !task.done;
    this.api.updateTask(task.id, { done: newDoneValue }).subscribe({
      next: () => {
        this.tasks.update((tasks) =>
          tasks.map((item) => {
            if (item.id !== task.id) {
              return item;
            }

            return { ...item, done: newDoneValue };
          })
        );
      }
    });
  }

  markTaskAsDeleted(task: Task): void {
    if (task.id === undefined) {
      return;
    }

    this.api.updateTask(task.id, { isdeleted: true }).subscribe({
      next: () => {
        this.tasks.update((tasks) =>
          tasks.map((item) => {
            if (item.id !== task.id) {
              return item;
            }

            return { ...item, isdeleted: true };
          })
        );
      }
    });
  }
}
