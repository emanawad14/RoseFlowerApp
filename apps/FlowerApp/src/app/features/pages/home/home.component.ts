import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../../shared/components/ui/product/product.component';
import { CatigoryService } from '../../services/catigory.service';
import { Catigory } from '../../interfaces/catigory.FlowerApp';
import { CatigoryComponent } from '../../../shared/components/ui/catigory/catigory.component';
import { SpecialGiftsComponent } from '../../components/special-gifts.component';
import { FeaturesComponent } from '../../components/features.component';
import { Subscription } from 'rxjs';
import { AboutComponent } from '../../components/about/about.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ProductComponent,
    CatigoryComponent,
    SpecialGiftsComponent,
    FeaturesComponent,
    AboutComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _catigory = inject(CatigoryService);
  catigory: Catigory[] = [];
  sub!: Subscription;
  constractor() {
    this.GetCatigorys();
  }
  ngOnInit(): void {
    this.GetCatigorys();
  }

  GetCatigorys() {
    this.sub = this._catigory.getCatigory().subscribe({
      next: (response) => {
        this.catigory = response.categories;
        console.log(this.catigory);
      },
      error: (error) => {
        console.log('Error fetching categories:', error);
      },
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
