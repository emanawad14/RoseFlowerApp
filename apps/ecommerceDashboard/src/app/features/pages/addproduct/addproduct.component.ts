import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
 import { InputTextModule } from 'primeng/inputtext';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { NgIf } from '@angular/common';
 import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { CatigoryService } from '../../services/catigory.service';
import { OccasionService } from '../../services/occasion.service';
import { ProductService } from '../../services/product.service';
    
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextModule,
     FileUploadModule,
    ButtonModule,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    SelectModule,
    DropdownModule
  ],
})
export class addProductComponent implements  OnInit {
  productForm!: FormGroup;
  submitted = false;
  loading = false;

  coverFile: File | null = null;
  galleryFiles: File[] = [];
  categories: string[] = [];
  occasions: string[] = [];
  
  private _productService=inject(ProductService)
  private _occasionService=inject(OccasionService)
  private _categoryService=inject(CatigoryService)
  private _activatedRoute=inject(ActivatedRoute)

 private fb: FormBuilder = inject(FormBuilder);

  ngOnInit() {
    this.productFormInit();
    this.onPriceChange();
    this.loadCategories();
    this.loadOccasions();
    this.productchecked();

  
    
  }

  productchecked(){
     if(this._activatedRoute.snapshot.paramMap.has('id')){
       
      //edit mode
      const productId=this._activatedRoute.snapshot.paramMap.get("id");
      //fetch product data and patch the form
      this._productService.getproductById(productId as string).subscribe({
        next:(productData)=>{
             this.productForm.patchValue({
            title: productData.product.title,
            description: productData.product.description,
            price: productData.product.price, 
            discount: productData.product.discount,
            priceAfterDiscount: productData.product.priceAfterDiscount,
            occasion: productData.product.occasion,
            category: productData.product.category,
            quantity: productData.product.quantity,
          }); 
          this.coverFile=productData.product.imgCover;
          this.galleryFiles=productData.product.images;
            
        }
      })
     } 
    }
  

  loadCategories() {
    this._categoryService.getCatigory().subscribe((categories) => {
      this.categories = categories.occasions;
     });
  }
  loadOccasions() {
    this._occasionService.getAllOccasions().subscribe((v) => {
      this.occasions = v.categories;
     });
  }

  onPriceChange() {
    this.productForm.valueChanges.subscribe((val) => {
      const price = val.price
      const discount = val.discount
      const after = price - (price * discount) / 100;
      this.productForm.patchValue({ priceAfterDiscount: after }, { emitEvent: false });
    });
  }
  
  productFormInit(){
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      discount: [0],
      priceAfterDiscount: [{ value: null, disabled: true }],
      quantity: [null, [Validators.required, Validators.min(1)]],
      category: [null, Validators.required],
      occasion: [null, Validators.required],
    });

  }

  onFileUpload(e: FileSelectEvent, type: 'cover' | 'gallery') {
     const files = e.files 
      
    
    if (type === 'cover'&& files) {
      this.coverFile = files[0]
          console.log(this.coverFile);

    } else if (type === 'gallery' && files) {
      this.galleryFiles = Array.from(files);
      console.log(this.galleryFiles);
    }
    
    
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid && this.coverFile && this.galleryFiles.length > 0) {
        
       
      const formData = new FormData();
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);
      formData.append('quantity', this.productForm.get('quantity')?.value);
      formData.append('category',this.productForm.get('category')?.value);
      formData.append('occasion', this.productForm.get('occasion')?.value);
      formData.append('imgCover', this.coverFile );
      this.galleryFiles.forEach((file) => {
        formData.append('images', file );
      });
      this._productService.addProduct(formData).subscribe({
        next:(res)=>{
          console.log('Product added successfully', res);
            this.productForm.reset();
          this.coverFile = null;
          this.galleryFiles = [];
        },
        error:(err)=>{
          console.log('Error adding product', err);
        }
        });
    } 

   
  }
}
