import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';

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
    this.filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
