import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarFeaturesComponent } from '../../shared/components/ui/avatar-features.component';
import { Feature } from '../../shared/interfaces/feature';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-features',
  imports: [CommonModule, AvatarFeaturesComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
   constructor(private translate: MyTranslateService) {}
  features: Feature[] = [];

 ngOnInit(): void {
  this.loadTranslations();

  this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    this.loadTranslations();
  });
}

loadTranslations(): void {
  this.translate.get([
    'Features.Free Delivery',
    'Features.Orders Over $120s',
    'Features.Get Refund',
    'Features.Within 30 Days Returns',
    'Features.Safe Payment',
    'Features.100% Secure Payment',
    'Features.24/7 Support',
    'Features.Feel Free To Call Us'
  ]).subscribe(translations => {
    this.features = [
      {
        id: '1',
        iconImg: '/images/delivery.png',
        title: translations['Features.Free Delivery'],
        desc: translations['Features.Orders Over $120s']
      },
      {
        id: '2',
        iconImg: '/images/refund.png',
        title: translations['Features.Get Refund'],
        desc: translations['Features.Within 30 Days Returns']
      },
      {
        id: '3',
        iconImg: '/images/payment.png',
        title: translations['Features.Safe Payment'],
        desc: translations['Features.100% Secure Payment']
      },
      {
        id: '4',
        iconImg: '/images/support.png',
        title: translations['Features.24/7 Support'],
        desc: translations['Features.Feel Free To Call Us']
      }
    ];
  });
}


 













// features:Feature[]=[
//     {id:'1',iconImg:'/images/delivery.png',title:'Free Delivery',desc:'Orders Over $120s'},
//     {id:'2',iconImg:'/images/refund.png',title:'Get Refund',desc:'Within 30 Days Returns'},
//     {id:'3',iconImg:'/images/payment.png',title:'Safe Payment',desc:'100% Secure Payment'},
//     {id:'4',iconImg:'/images/support.png',title:'24/7 Support',desc:'Feel Free To Call Us'},
     
//   ];  
}
