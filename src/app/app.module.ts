import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

import { AdminModule } from './Admin/admin.module';
import { AdminAuthGuard } from './Admin/Services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { CoreModule } from './Core/core.module';
import { ShareModule } from './Shared/share.module';
import { ProductsComponent } from './Shopping/Components/products/products.component';
import { ShoppingModule } from './Shopping/shopping.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    ShareModule,
    AdminModule,
    ShoppingModule,
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    RouterModule.forRoot([
      { path: '', component: ProductsComponent }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
