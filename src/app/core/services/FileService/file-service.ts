import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileSizePipe } from '../../../shared/pipes/file-size-pipe';
import { Message } from '../../../shared/models/message.interface';
import { GuiaSADT } from '../../../shared/models/guia-sadt.interface';
import { NotificationService } from '../NotificationService/notification-service';

// const API_URL = 'https://backend-guia-production.up.railway.app/';
const API_URL = 'http://127.0.0.1:8000/';
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  public notificationMessage = signal<Message | null>(null);
  public guiaResult = signal<GuiaSADT | null>(null);
  public isLoading = signal(false);

  public uploadFile(files: FileList) {
    if (files.length !== 1) {
      this.notificationService.showNotification({
        title: 'Arquivo Negado',
        type: 'Error',
        message: 'Envie um arquivo por vez',
      });
      return;
    }

    const file = files[0];
    const fileSize = new FileSizePipe();

    if (file.size > MAX_SIZE_BYTES) {
      this.notificationService.showNotification({
        title: 'Arquivo Negado',
        type: 'Error',
        message: 'Tamanho excede o permitido 10MB (Atual: ' + fileSize.transform(file.size) + ')',
      });
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      this.notificationService.showNotification({
        title: 'Arquivo Negado',
        type: 'Error',
        message: 'Envie somente PDF ou imagem (JPG, PNG, WEBP)',
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.isLoading.set(true);
    this.guiaResult.set(null);

    this.http.post<GuiaSADT>(`${API_URL}api/upload`, formData).subscribe({
      next: (guia) => {
        this.guiaResult.set(guia);
        this.isLoading.set(false);
        this.notificationService.showNotification({
          title: 'Extração concluída',
          type: 'Success',
          message: `Método: ${guia.metodo_extracao} · Confiança: ${((guia.confianca_extracao ?? 0) * 100).toFixed(0)}%`,
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        const detail = err.error?.detail ?? 'Erro desconhecido';
        this.notificationService.showNotification({
          title: 'Erro na extração',
          type: 'Error',
          message: detail,
        });
      },
    });
  }
}
