import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$: Observable<any>;
  filteredProducts$: Observable<any> = new Observable();
  category: string | null = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.products$ = this.productService.getAllProducts();
    

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      if (this.category == 'all') {
        this.filteredProducts$ = this.products$;
      } 
      else if (this.category) {
        this.filteredProducts$ = this.products$.pipe(
          map((products) =>
            products.filter(
              (product: any) => product.category === this.category
            )
          )
        );
      }
      else {
        this.filteredProducts$ = this.products$;
      }
    });
  }
}
