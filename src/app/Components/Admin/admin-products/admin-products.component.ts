import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/Shared/Models/product';
import { ProductService } from '../../../Shared/Services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: any[] = [];

  subscription: Subscription = Subscription.EMPTY;

  page = 1;
  itemsPerPage = 3;
  itemsPerPageDefault = 3;;

  constructor(private productService: ProductService) {
    this.fetchData();
  }

  fetchData() {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.filteredProducts = this.products = products;
      });
  }

  filterProducts(query: string): void {
    this.page = 1
    this.filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(query.trim().toLowerCase())
    );
  }
  sortingOrder = 1;
  sortingOrderInBool = true;
  sortedBy='';
  
  sort(colName:any) {
    this.sortingOrder *= -1;
    this.sortingOrderInBool = !this.sortingOrderInBool;
    this.sortedBy=colName;
    
    this.filteredProducts.sort((a, b) =>{
      return a[colName] > b[colName] ? 1 * this.sortingOrder : a[colName] < b[colName] ? -1 * this.sortingOrder : 0;
    }
    );
  }

  limitChange(element: any) {
    console.log(element.value);
    this.itemsPerPage = +element.value === 0 ? this.itemsPerPageDefault : +element.value;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
