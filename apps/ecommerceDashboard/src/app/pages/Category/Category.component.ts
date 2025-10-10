import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/category/category-i';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {

  categories: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  searchTerm: string = '';

  // pagination
  first: number = 0;
  rows: number = 5;

  
  Math = Math;

  private readonly categoryService = inject(CategoriesService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res.categories ?? res;
        this.filteredCategories = [...this.categories];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  routeToAdd() {
    this.router.navigateByUrl('/add-category');
  }

  routeToEdit() {
    this.router.navigateByUrl('/edit-category');
  }

  filterCategories() {
    const term = this.searchTerm?.toLowerCase().trim() ?? '';
    if (!term) {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter((c) =>
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
