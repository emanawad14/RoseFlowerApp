import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

import { AddCategoryComponent } from "./pages/AddCategory/AddCategory.component";
import { UpdateCateComponent } from "./pages/UpdateCate/UpdateCate.component";
import { CategoryComponent } from "./pages/Category/Category.component";
import { OccasionsComponent } from "./pages/Occasions/Occasions.component";

@Component({
  imports: [AddCategoryComponent, UpdateCateComponent, CategoryComponent, OccasionsComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerceDashboard';
}
