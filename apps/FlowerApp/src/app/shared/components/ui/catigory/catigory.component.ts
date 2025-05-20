import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Catigory } from '../../../../features/interfaces/catigory.FlowerApp';

@Component({
  selector: 'app-catigory',
  imports: [CommonModule, CardModule],
  templateUrl: './catigory.component.html',
  styleUrl: './catigory.component.css',
})
export class CatigoryComponent {
  @Input() categories!: Catigory[];
}
