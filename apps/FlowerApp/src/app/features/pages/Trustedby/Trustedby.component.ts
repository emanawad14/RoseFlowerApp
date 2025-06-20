import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trustedby',
  imports: [CommonModule , TranslatePipe ],
  templateUrl: './Trustedby.component.html',
  styleUrl: './Trustedby.component.scss',
})
export class TrustedbyComponent {}
