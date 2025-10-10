import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IOccasion } from '../../shared/Occasion/occasion';
import { OccasionsService } from '../../core/services/Occasions/occasions.service';

@Component({
  selector: 'app-Occasion',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, RouterModule],
  templateUrl: './Occasions.component.html',
  styleUrls: ['./Occasions.component.scss'],
})
export class OccasionsComponent implements OnInit {
  Occasion: IOccasion[] = [];
  filteredoccassion: IOccasion[] = [];
  searchTerm: string = '';

  first: number = 0;
  rows: number = 5;

  
  Math = Math;

  private readonly occasionService = inject(OccasionsService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getoccassion();
  }

  getoccassion() {
    this.occasionService.getAllOccasions().subscribe({
      next: (res) => {
        
        if (Array.isArray(res)) {
          this.Occasion = res;
        } else if (Array.isArray(res.occasions)) {
          this.Occasion = res.occasions;
        } else if (Array.isArray(res.data)) {
          this.Occasion = res.data;
        } else {
          console.error('Unexpected response format:', res);
          this.Occasion = [];
        }

        this.filteredoccassion = [...this.Occasion];
      },
      error: (err) => {
        console.error('Error fetching occasions:', err);
      },
    });
  }

  routeToAdd() {
    this.router.navigateByUrl('/add-occasion');
  }

  routeToEdit() {
    this.router.navigateByUrl('/edit-occasion');
  }

  filteroccassion() {
    const term = this.searchTerm?.toLowerCase().trim() ?? '';
    if (!term) {
      this.filteredoccassion = [...this.Occasion];
    } else {
      this.filteredoccassion = this.Occasion.filter((c) =>
        (c.name ?? '').toLowerCase().includes(term)
      );
    }
    this.first = 0; 
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
