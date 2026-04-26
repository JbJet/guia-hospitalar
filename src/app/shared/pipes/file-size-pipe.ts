import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return '?';
    if (bytes === 0) return '0 Bytes';

    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const number = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision);

    return `${size} ${units[number]}`;
  }
}
