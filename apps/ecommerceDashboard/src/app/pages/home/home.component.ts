import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-categories',
  templateUrl: './home.component.html',
  imports: [BrowserModule, FormsModule],

})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm = '';
  currentPage = 1;
  rows = 5;
  showModal = false;

  newCategory = {
    name: '',
    image: null as File | null,
  };

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getAllCategory().subscribe({
      next: (res) => {
        this.categories = res.data || [];
        this.filteredCategories = [...this.categories];
      },
      error: (err) => console.error(err),
    });
  }

  get filteredData() {
    return this.categories.filter((cat) =>
      cat.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage() {
    if (this.currentPage * this.rows < this.filteredCategories.length)
      this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  getLastIndex(): number {
    return Math.min(this.currentPage * this.rows, this.filteredCategories.length);
  }

 
  openAddModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newCategory = { name: '', image: null };
  }

  handleImageUpload(event: any) {
    this.newCategory.image = event.target.files[0];
  }

  addCategory() {
    if (!this.newCategory.name || !this.newCategory.image) {
      alert('Please fill all fields.');
      return;
    }

    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('No token found.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newCategory.name);
    formData.append('image', this.newCategory.image);

    this.categoriesService.addCategory(formData, token).subscribe({
      next: () => {
        this.closeModal();
        this.getAllCategories();
      },
      error: (err) => {
        console.error(err);
        alert('Error adding category');
      },
    });
  }

  editCategory(cat: any) {
    console.log('Edit', cat);
  }

  deleteCategory(id: string) {
    console.log('Delete category', id);
  }
}
