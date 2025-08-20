import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../../shared/components/ui/product/product.component';
import { CatigoryService } from '../../services/catigory.service';
import { Catigory } from '../../interfaces/catigory.FlowerApp';
import { Subscription } from 'rxjs';
import { GallaryComponent } from './components/gallary.component';
import { CatigoryComponent } from '../../../shared/components/ui/catigory/catigory.component';
import { SpecialGiftsComponent } from './components/special-gifts.component';
import { FeaturesComponent } from './components/features.component';
import { TrustedbyComponent } from './components/Trustedby/Trustedby.component';
import { BestComponent } from './components/Best/Best.component';
import { AboutComponent } from './components/about.component';
 
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ProductComponent,
    CatigoryComponent,
    SpecialGiftsComponent,
    FeaturesComponent,
    GallaryComponent,
    TrustedbyComponent,
    BestComponent,
    TrustedbyComponent,
    AboutComponent,
     
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _catigory = inject(CatigoryService);
  catigory: Catigory[] = [];
  sub!: Subscription;

  ngOnInit(): void {
    //console.log('Home component initializing...');
    this.GetCatigorys();
   
  }

  GetCatigorys() {
    // console.log('Fetching categories...');
    this.sub = this._catigory.getCatigory().subscribe({
      next: (response) => {
        // console.log('Categories received:', response.categories);
        this.catigory = response.categories;
      },
      error: (error) => {
        // console.error('Error fetching categories:', error);
      },
    });
  }






 
  
   
  

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
