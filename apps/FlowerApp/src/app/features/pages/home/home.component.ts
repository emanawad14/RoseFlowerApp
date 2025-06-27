import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../../shared/components/ui/product/product.component';
import { CatigoryService } from '../../services/catigory.service';
import { Catigory } from '../../interfaces/catigory.FlowerApp';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../../core/layouts/Footer/Footer.component';
import { GallaryComponent } from '../../components/gallary.component';
import { CatigoryComponent } from '../../../shared/components/ui/catigory/catigory.component';
import { SpecialGiftsComponent } from '../../components/special-gifts.component';
import { FeaturesComponent } from '../../components/features.component';
import { NavBarComponent } from '../../../core/layouts/navBar/navBar.component';
import { TrustedbyComponent } from '../Trustedby/Trustedby.component';
import { BestComponent } from '../Best/Best.component';
import { AboutComponent } from '../../components/about.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    ProductComponent,
    CatigoryComponent,
    SpecialGiftsComponent,
    FeaturesComponent,
    GallaryComponent,
    FooterComponent,
    NavBarComponent,
    TrustedbyComponent,
    BestComponent,
    TrustedbyComponent,
    BestComponent,
    AboutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _catigory = inject(CatigoryService);
  private readonly _themeService = inject(ThemeService);
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
