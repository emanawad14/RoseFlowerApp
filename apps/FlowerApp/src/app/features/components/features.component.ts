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
    {id:'1',iconImg:'/images/delivery.png',title:'Free Delivery',desc:'Orders Over $120s'},
    {id:'2',iconImg:'/images/refund.png',title:'Get Refund',desc:'Within 30 Days Returns'},
    {id:'3',iconImg:'/images/payment.png',title:'Safe Payment',desc:'100% Secure Payment'},
    {id:'4',iconImg:'/images/support.png',title:'24/7 Support',desc:'Feel Free To Call Us'},
     
  ];
}
