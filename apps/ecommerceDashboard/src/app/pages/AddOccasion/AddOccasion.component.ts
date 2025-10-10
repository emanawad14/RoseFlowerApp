import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OccasionsService } from '../../core/services/Occasions/occasions.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-occasion',
  imports: [CommonModule,FormsModule],
  templateUrl: './AddOccasion.component.html',
  styleUrl: './AddOccasion.component.scss',
})
export class AddOccasionComponent {





    occassuinName: string = '';
   occassuinImage: File | null = null;
    loading = false;
  
    constructor(private OccasionsService: OccasionsService) {}
  
    
    onFileSelected(event: any) {
      this.occassuinImage = event.target.files[0];
    }
  
    
    onSubmit() {
      if (!this.occassuinName || !this.occassuinImage) {
        alert('Please fill in all required fields');
        return;
      }
  
      this.loading = true;
  
      const formData = new FormData();
      formData.append('name', this.occassuinName);
      formData.append('image', this.occassuinImage);
  
      this.OccasionsService.addOccasion(formData).subscribe({
        next: (response) => {
          alert('Category added successfully!');
          console.log(response);
          this.loading = false;
          this.occassuinName = '';
          this.occassuinImage = null;
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Something went wrong!');
          this.loading = false;
        }
      });
    }
}
