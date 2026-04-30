import { Component, inject, signal } from '@angular/core';
import { header } from './components/headerComponent/header';
import { footer } from './components/footerComponent/footer';
import { RouterOutlet } from "@angular/router";
import { NotificationComponent } from './components/notification-component/notification-component';
import { NotificationService } from './services/notification.service';
@Component({
  selector: 'app-root',
  imports: [header, footer, RouterOutlet, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  notificationService = inject(NotificationService);
  notification = this.notificationService.notification;
  protected title = signal('taskManager');
}
