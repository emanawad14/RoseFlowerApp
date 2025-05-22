import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarFeaturesComponent } from '../../shared/components/ui/avatar-features.component';
import { Feature } from '../../shared/interfaces/feature';

@Component({
  selector: 'app-features',
  imports: [CommonModule,AvatarFeaturesComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {

  features:Feature[]=[
    {iconImg:'/images/delivery.png',title:'Free Delivery',desc:'Orders Over $120s'},
    {iconImg:'/images/refund.png',title:'Get Refund',desc:'Within 30 Days Returns'},
    {iconImg:'/images/payment.png',title:'Safe Payment',desc:'100% Secure Payment'},
    {iconImg:'/images/support.png',title:'24/7 Support',desc:'Feel Free To Call Us'},
     
  ];
}
