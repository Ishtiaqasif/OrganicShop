import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/Models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent{
  @Input('cart') cart: ShoppingCart|undefined;
  constructor() { }

  ngOnInit(): void {
  }

}