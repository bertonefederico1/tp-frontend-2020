import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientComponent } from './components/clients/client/client.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { ArticleDataComponent } from './components/articles/article-data/article-data.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/suppliers/edit-supplier/edit-supplier.component';
import { AddPurchaseComponent } from './components/purchases/add-purchase/add-purchase.component';
import { PurchaseComponent } from './components/purchases/purchase/purchase.component';
import { DataPurchaseComponent } from './components/purchases/data-purchase/data-purchase.component';
import { ArticleItemComponent } from './components/articles/article-item/article-item.component';
import { LoginComponent } from './components/login/login.component';

import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { FilterPipe } from './pipes/filter.pipe';
import { SalesComponent } from './components/sales/sales/sales.component';
import { AddSaleComponent } from './components/sales/add-sale/add-sale.component';
import { ShowCustomersComponent } from './components/shared/show-customers/show-customers.component';
import { ShowArticlesComponent } from './components/shared/show-articles/show-articles.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    AddClientComponent,
    EditClientComponent,
    ArticleComponent,
    ArticleDataComponent,
    AddArticleComponent,
    SupplierComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    AddPurchaseComponent,
    PurchaseComponent,
    DataPurchaseComponent,
    FilterPipe,
    ArticleItemComponent,
    LoginComponent,
    SalesComponent,
    AddSaleComponent,
    ShowCustomersComponent,
    ShowArticlesComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DataPurchaseComponent]
})
export class AppModule { }
