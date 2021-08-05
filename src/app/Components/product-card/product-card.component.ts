import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product | null| undefined;
  @Input('showActions') showActions: boolean | undefined;
  constructor() { }

}
