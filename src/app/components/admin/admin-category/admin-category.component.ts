import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ProductCategory } from '../../../interface/product-category.model';
import { NgToastService } from 'ng-angular-popup';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.sass'
})

export class AdminCategoryComponent implements OnInit {
  @Input() show: boolean = false;
  productCategory!: ProductCategory[];
  isAddModalActive: boolean = false;
  editCategoryName: string = "";
  editCategoryNameShort: string = "";
  deleteModalStates: { [categoryId: string]: boolean } = {};
  editModalStates: { [categoryId: string]: boolean } = {};
  imageUrl: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService, private toast: NgToastService) { }
  
  ngOnInit() {
    this.getCategory();
  }

  categorySearch(keyword: string): void {
    if (keyword.length != 0) {
      this.productCategory = this.productCategory.filter(category =>
        category.productCategoryName.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      this.getCategory();
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  inputValidation(...strings: string[]): boolean {
    if(strings.some(str => !str)) {
      this.toast.error({detail:"FAILED",summary:'Invalid Inputs!', duration:2000, position:'topCenter'});
      return true;
    }
    return false;
  }

  maskString(input: string): string {
    const maskedIdLength = 8; // Length of the masked ID
    const ellipsis = '...';
    if (input.length <= maskedIdLength) {
      return input; // Return the original ID if it's shorter than or equal to the masked length
    } else {
      return input.substring(0, maskedIdLength) + ellipsis; // Return the masked ID
    }
  }
  

  openAddModal(): void {
    this.isAddModalActive = true;
    this.imageUrl = "";
  }

  closeAddModal(): void {
    this.isAddModalActive = false;
  }

  openDeleteModal(categoryId: string) {
    this.deleteModalStates[categoryId] = true;
  }

  closeDeleteModal(categoryId: string) {
    this.deleteModalStates[categoryId] = false;
  }
  
  openEditModal(categoryId: string) {
    this.editModalStates[categoryId] = true;
    this.imageUrl = "";
    const category = this.productCategory.find(cat => cat._id === categoryId);
    this.editCategoryName = category ? category.productCategoryName : '';
    this.editCategoryNameShort = category ? category.productCategoryNameShort: '';
  }

  closeEditModal(categoryId: string) {
    this.editModalStates[categoryId] = false;
  }

  getCategory() {
    this.productService.getProductCategory().subscribe((productCategory: ProductCategory[]) => {
      this.productCategory = productCategory;
    });
  }

  addCategory(productCategoryName: string, productCategoryNameShort: string) {
    if (!this.inputValidation(productCategoryName, productCategoryNameShort)) {
      this.productService.createProductCategory(productCategoryName, productCategoryNameShort, this.imageUrl).subscribe(() => {
        this.toast.success({detail:"SUCCESS",summary:'Product Category Added!', duration:2000, position:'topCenter'});
        this.getCategory();
        this.closeAddModal();
      }, (error) => {
        console.log(error);
      })
    }
  }

  editCategory(id: string, productCategoryName: string, productCategoryNameShort: string) {
    if (!this.inputValidation(productCategoryName, productCategoryNameShort)) {
      this.productService.updateProductCategory(id, productCategoryName, productCategoryNameShort, this.imageUrl).subscribe(() => {
        this.toast.warning({detail:"SUCCESS",summary:'Product Category Updated!', duration:2000, position:'topCenter'});
        this.getCategory();
        this.closeEditModal(id);
      }, (error) => {
        console.log(error);
      })
    }
  }

  deleteCategory(id: string) {
    this.productService.deleteProductCategory(id).subscribe(() => {
      this.toast.error({detail:"SUCCESS",summary:'Product Category Deleted!', duration:2000, position:'topCenter'});
      this.getCategory();
      this.closeDeleteModal(id);
    }, (error) => {
      console.log(error);
    })
  }
}
