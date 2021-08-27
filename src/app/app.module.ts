import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ng2-validation';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminOrdersComponent } from './Admin/Components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './Admin/Components/admin-products/admin-products.component';
import { ProductFormComponent } from './Admin/Components/product-form/product-form.component';
import { BsNavbarComponent } from './Components/bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './Shopping/Components/check-out/check-out.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminAuthGuard } from './Admin/Services/admin-auth-guard.service';
import { AuthGuard as AuthGuard } from './Shared/Services/auth-guard.service';
import { ShareModule } from './Shared/share.module';
import { AdminModule } from './Admin/admin.module';
import { ShoppingModule } from './Shopping/shopping.module';
import { ProductsComponent } from './Shopping/Components/products/products.component';

@NgModule({
  declarations: [AppComponent, BsNavbarComponent, HomeComponent],
  imports: [
    ShareModule,
    AdminModule,
    ShoppingModule,
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    CustomFormsModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent }
    ]),
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
