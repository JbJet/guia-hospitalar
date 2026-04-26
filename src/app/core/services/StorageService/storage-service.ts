import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  async uploadToStorage(file: File) {}
}
