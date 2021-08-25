import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductWithKey } from 'src/app/Models/product';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { ProductService } from 'src/app/Services/product.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<ProductWithKey|any> = new Observable();
  filteredProducts$: Observable<any> = new Observable();
  category: string | null = '';
  cart$: Observable<ShoppingCart | any> = new Observable();

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.populateProducts();
    this.cart$ = (await this.cartService.getCart());
  }

  populateProducts(){
    this.products$ = this.productService.getAllProducts();
    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.category == 'all') {
      this.filteredProducts$ = this.products$;
    } else if (this.category) {
      this.filteredProducts$ = this.products$.pipe(
        map((products) =>
          products.filter(
            (product: any) => product.category === this.category
          )
        )
      );
    } else {
      this.filteredProducts$ = this.products$;
    }
  }

}
