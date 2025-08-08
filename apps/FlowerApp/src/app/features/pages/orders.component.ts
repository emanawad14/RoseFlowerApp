import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass, SlicePipe } from '@angular/common';
import { OrderService } from '../services/order/order.service';

import { Orders } from '../interfaces/orders/orders';

@Component({
  selector: 'app-orders',
  imports: [CommonModule ,
    SlicePipe ,NgClass
    
    
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',

})
export class OrdersComponent implements OnInit {


  orders: Orders[]=[];
  displayLimit = 2; 

  

  ngOnInit(): void {
      this.getOrders()
  }
    
  private readonly OrderService=inject(OrderService);

  getOrders()
  {
    this.OrderService.getUserOrders().subscribe(
      {
        next:(res)=>
        {
          console.log( 'API Response:',res);
          this.orders = res.orders;

        },
        error:(err)=>
        {
          console.log( err);

        }
      }
    )
  }

isExpanded: boolean = false;

  
toggleDisplay() {
  if (this.isExpanded) {
    this.displayLimit = 2;
  } else {
    this.displayLimit = Number.MAX_SAFE_INTEGER;
  }
  this.isExpanded = !this.isExpanded;
}






  
  



  
  
}
