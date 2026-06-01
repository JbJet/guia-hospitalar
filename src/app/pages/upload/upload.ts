import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class UploadComponent {

  // Essa função vai rodar assim que você escolher o arquivo no Mac
  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      console.log('Arquivo selecionado:', file.name);

      // Envia o arquivo para o servidor Python
      this.uploadFile(file);
    }
  }

  // Função que faz o papel de levar o arquivo até o seu Backend (Porta 8000)
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Enviando arquivo para o backend Python...');
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Dados extraídos pelo Gemini com sucesso:', data);

      // Aqui depois vamos colocar esses 'data' para aparecerem na sua tela!
      alert('Arquivo processado com sucesso pelo Gemini!');

    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
      alert('Ops! O arquivo não pôde ser enviado para o servidor Python.');
    }
  }

}