import { Component, Input } from '@angular/core';
import { Notification } from '../../types';
@Component({
  selector: 'app-notification-component',
  imports: [],
  templateUrl: './notification-component.html',
  styleUrl: './notification-component.css',
})
export class NotificationComponent {
  @Input() notification: Notification = {
    message: "",
    type: "info",
  };
}
