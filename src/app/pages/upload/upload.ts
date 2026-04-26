import { Component, inject, signal } from '@angular/core';
import { FileService } from '../../core/services/FileService/file-service';
import { Notifications } from '../../shared/components/notifications/notifications';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [Notifications],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class UploadComponent {
  private fileService = inject(FileService);
  hasFile = signal(false);

  dragHandler(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragOver(event: DragEvent) {
    this.dragHandler(event);
    this.hasFile.set(true);
  }

  onDragEnd(event: DragEvent) {
    this.dragHandler(event);
    this.hasFile.set(false);
  }

  onDrop(event: DragEvent) {
    this.dragHandler(event);

    const files = event.dataTransfer?.files;
    if (files) {
      this.fileService.uploadFile(files);
    }
    this.hasFile.set(false);
  }
}
