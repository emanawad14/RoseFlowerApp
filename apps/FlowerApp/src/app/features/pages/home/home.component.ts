import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedbyComponent } from "../Trustedby/Trustedby.component";
import { BestComponent } from "../Best/Best.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, TrustedbyComponent, BestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent   {
 
}
