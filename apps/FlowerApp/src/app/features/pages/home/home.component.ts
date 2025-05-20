import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatigoryService } from '../../services/catigory.service';
import { Catigory } from '../../interfaces/catigory.FlowerApp';
import { CatigoryComponent } from '../../../shared/components/ui/catigory/catigory.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CatigoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly _catigory = inject(CatigoryService);
  catigory: Catigory[] = [];
  constractor() {
    this.GetCatigorys();
  }
  ngOnInit(): void {
    this.GetCatigorys();
  }

  GetCatigorys() {
    this._catigory.getCatigory().subscribe({
      next: (response) => {
        this.catigory = response.categories;
        console.log(this.catigory);
      },
      error: (error) => {
        console.log('Error fetching categories:', error);
      },
    });
  }
}
