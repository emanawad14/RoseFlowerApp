import { Component, Input, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-primary-btn',
  imports: [CommonModule,ButtonModule],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.scss',
})
export class PrimaryBtnComponent {
   @Input({ required: true }) labelName!: string;
   @Input({required:false}) displayIcon:boolean=true;
    
}
