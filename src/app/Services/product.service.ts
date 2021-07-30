import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  add(product: Product){
    return this.db.list('/products').push(product);
  }

  getAllProducts(): Observable<any[]>{
    let productWithKey$ = this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    return productWithKey$;
  }

  getProduct(id: string): Observable<Product|null>{
    return this.db.object<Product>('/products/' + id).valueChanges();
  }

  updateProduct(productId: string, product: Product) {
    this.db.object<Product>('/products/' + productId).update(product);
  }

  deleteProduct(productId: string) {
    this.db.object('/products/' + productId).remove();
  }

}