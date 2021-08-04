import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<any>;
  categories$: Observable<any>;
  category: string | null = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.productService.getAllProducts();
    this.categories$ = this.categoryService.getAllCategories();

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category == 'all') {
        this.products$ = this.products$;
      } else if (this.category) {
        this.products$ = this.products$.pipe(
          map((products) =>
            products.filter(
              (product: any) => product.category === this.category
            )
          )
        );
      }
    });
  }
}
