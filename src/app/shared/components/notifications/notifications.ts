import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NotificationService } from '../../../core/services/NotificationService/notification-service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  readonly notificationService = inject(NotificationService);
}
