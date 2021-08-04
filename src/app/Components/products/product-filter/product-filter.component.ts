import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent{

  @Input('category') category: string | undefined | null;
  categories$: Observable<any>;

  constructor(private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getAllCategories();
  }


}
