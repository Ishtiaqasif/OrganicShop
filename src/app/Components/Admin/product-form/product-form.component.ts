import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/Models/product';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent{
  categories$;
  productKey: string|null;
  product: any = {};

  constructor(
    category: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = category.getAllCategories();

    this.productKey = this.route.snapshot.paramMap.get('id');

    if (this.productKey) {
      this.productService
        .getProduct(this.productKey)
        .pipe(take(1))
        .subscribe((product) => {
          this.product = product
          console.log(this.product);
        });
    }
  }

  save(product: Product) {
    if(this.productKey) {
      this.productService.updateProduct(this.productKey, product);
    }
    else{
      this.productService.add(product);
    }

    this.router.navigate(['/admin/products']);
    
  }

  delete(){
    if(confirm('Are you sure you want to delete this product?') && this.productKey){
      this.productService.deleteProduct(this.productKey);
      this.router.navigate(['/admin/products']);
    }
  }
}
