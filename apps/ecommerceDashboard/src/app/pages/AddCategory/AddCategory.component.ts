import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './AddCategory.component.html',
  styleUrl: './AddCategory.component.scss',
})
export class AddCategoryComponent {




   categoryName: string = '';
  categoryImage: File | null = null;
  loading = false;

  constructor(private categoriesService: CategoriesService) {}

  
  onFileSelected(event: any) {
    this.categoryImage = event.target.files[0];
  }

  
  onSubmit() {
    if (!this.categoryName || !this.categoryImage) {
      alert('Please fill in all required fields');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.categoryName);
    formData.append('image', this.categoryImage);

    this.categoriesService.addCategory(formData).subscribe({
      next: (response) => {
        alert('Category added successfully!');
        console.log(response);
        this.loading = false;
        this.categoryName = '';
        this.categoryImage = null;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong!');
        this.loading = false;
      }
    });
  }
}
