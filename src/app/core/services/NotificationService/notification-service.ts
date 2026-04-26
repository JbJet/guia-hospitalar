import { Injectable, signal } from '@angular/core';
import { Message } from '../../../shared/models/message.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notifications = signal<Message[]>([]);
  public notifications = this._notifications.asReadonly();

  showNotification(message: Message, durationMs: number = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newMessage = { ...message, id };

    this._notifications.update((currentList) => [...currentList, newMessage]);

    if (durationMs > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, durationMs);
    }
  }

  removeNotification(id: string) {
    this._notifications.update((currentList) => currentList.filter((msg) => msg.id !== id));
  }

  clearAll() {
    this._notifications.set([]);
  }
}
