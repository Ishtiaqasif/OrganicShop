import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/Models/shopping-cart';
import { ProductService } from 'src/app/Services/product.service';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<any>;
  filteredProducts$: Observable<any> = new Observable();
  category: string | null = '';
  cart: ShoppingCart | any;
  subscription: Subscription = Subscription.EMPTY;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {

    
    this.products$ = this.productService.getAllProducts();

    route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
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
    });
  
  }
  
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
    .valueChanges()
    .subscribe((cart: ShoppingCart|null) => {
      this.cart = cart;
     });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
