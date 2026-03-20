import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Field } from './component/field/field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Field],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('guia-hospitalar');
}
