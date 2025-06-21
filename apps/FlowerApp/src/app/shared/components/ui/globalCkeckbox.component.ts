import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-global-ckeckbox',
  imports: [CommonModule, CheckboxModule],
  templateUrl: './globalCkeckbox.component.html',
  styleUrl: './globalCkeckbox.component.scss',
})
export class GlobalCkeckboxComponent {}
