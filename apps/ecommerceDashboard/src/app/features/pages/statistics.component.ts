import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsService } from '../services/statistics.service';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { Category, LowStockProduct, MonthlyRevenue, Orders, OrdersByStatu, Overall, TopSellingProduct } from '../../core/modals/statistics';
@Component({
  selector: 'app-statistics',
  imports: [CommonModule, TableModule, ChartModule, CardModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {

  private statisticsService=inject(StatisticsService)
    categories: Category[] = [];
     overallStats: Overall = {} as Overall;
      orders: Orders = {} as Orders ;
      orderStatus!:{} 
      revenueData!:{}
      lowStock: LowStockProduct[] = [];
      topProducts: TopSellingProduct[] = [];

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe(data => {
      this.categories = data.statistics.categories;
      this.overallStats = data.statistics.overall;
      this.orders= data.statistics.orders;
      
      this.orderStatus = {
    labels: ['Completed','inProgress','Pending','Cancelled'],
    datasets: [{  data : this.orders?.ordersByStatus?.map((s:any) => s.count) ?? [], backgroundColor: ['#22c55e','#facc15','#8c52ff','#ea0000'] }]
  };
      
  
  this.revenueData = {
    labels: ['Dec','Aug','Jul','Jun','May','Apr','Mar','Feb','Jan'],
    datasets: [{ 
      label: 'Revenue',
      data: this.orders?.monthlyRevenue?.map((s:any) => s.revenue) ?? [],
      borderColor: '#ef4444',
      fill: true,
      backgroundColor: 'rgba(239,68,68,0.2)'
    }]
  };

   this.lowStock = data.statistics.products.lowStockProducts;

   this.topProducts = data.statistics.products.topSellingProducts;
    });
   }

  


  chartOptions = { responsive: true, maintainAspectRatio: false, aspectRatio: 0.8 };

  

 
}
