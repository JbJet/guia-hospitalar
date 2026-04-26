import { inject, Injectable, signal } from '@angular/core';
import { FileSizePipe } from '../../../shared/pipes/file-size-pipe';
import { Message } from '../../../shared/models/message.interface';
import { NotificationService } from '../NotificationService/notification-service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private notificationService = inject(NotificationService);

  public notificationMessage = signal<Message | null>(null);

  public uploadFile(files: FileList) {
    if (files.length == 1) {
      const file = files[0];
      const fileSize = new FileSizePipe();

      const acceptableFileFormats = '.pdf';

      if (file.size > 10000000) {
        this.notificationService.showNotification({
          title: 'Arquivo Negado',
          message: 'Tamanho excede o permitido 10MB (Atual: ' + fileSize.transform(file.size) + ')',
        });
      } else if (!file.name.toLowerCase().includes(acceptableFileFormats)) {
        this.notificationService.showNotification({
          title: 'Arquivo Negado',
          message: 'Envie somente arquivos .pdf',
        });
      } else {
        this.notificationService.showNotification({
          title: 'Arquivo Permitido',
          message: 'Tamanho aceito e formato valido',
        });
      }
    } else {
      this.notificationService.showNotification({
        title: 'Arquivo Negado',
        message: 'Envie um arquivo por vez',
      });
    }
  }
}
