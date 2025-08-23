import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { OrderService } from '../services/order/order.service';

import { Orders } from '../interfaces/orders/orders';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: Orders[] = [];
  displayLimit: number = 4;
  isExpanded: boolean = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getOrders();
  }
  private readonly OrderService = inject(OrderService);
  expandedOrders: Set<string> = new Set();
  getOrders() {
    this.OrderService.getUserOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log('API Response:', res);
          this.orders = res.orders;
        },
        error: (err) => {
          //console.log(err);
        },
      });
  }

  // toggleDisplay() {
  //   // if (this.isExpanded) {
  //   //   this.displayLimit = 4;
  //   // } else {
  //   //   this.displayLimit = this.orders.length;
  //   // }
  //   this.isExpanded = !this.isExpanded;
  // }
  toggleOrder(orderId: string) {
    if (this.expandedOrders.has(orderId)) {
      this.expandedOrders.delete(orderId);
    } else {
      this.expandedOrders.add(orderId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
