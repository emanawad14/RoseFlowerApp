import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule,
    
    FormsModule,CommonModule,ButtonModule,ImageModule, TranslatePipe],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',

})
export class AuthLayoutComponent {
  languages: string[] =[
    'English',
    'Arabic'
];;

  selectedLang: string ='English';

  ngOnInit() {
   
  }
}
