import { Component, Input } from '@angular/core';

@Component({
  selector: 'field',
  imports: [],
  templateUrl: './field.html',
  styleUrl: './field.css',
})
export class Field {
  @Input({ required: true }) fieldStyle!: string;
  @Input({ required: true }) fieldId!: string;
  @Input({ required: true }) fieldIndex!: string;
  @Input({ required: true }) fieldSize!: number;
  protected fieldName!: string;
  protected numbers!: number[];
  ngOnInit() {
    this.numbers = Array.from({ length: this.fieldSize }, (_, i) => i);
    this.fieldName = this.fieldId
      .split('-')
      .map((word) =>
        word.length != 3 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toUpperCase(),
      )
      .join(' ');
  }
}
