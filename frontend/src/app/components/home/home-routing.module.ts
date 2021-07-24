import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticleComponent } from '../articles/add-article/add-article.component';
import { ArticleDataComponent } from '../articles/article-data/article-data.component';
import { ArticlesComponent } from '../articles/articles/articles.component';
import { AddClientComponent } from '../clients/add-client/add-client.component';
import { ClientsComponent } from '../clients/clients/clients.component';
import { EditClientComponent } from '../clients/edit-client/edit-client.component';
import { AddPurchaseComponent } from '../purchases/add-purchase/add-purchase.component';
import { PurchasesComponent } from '../purchases/purchases/purchases.component';
import { AddSaleComponent } from '../sales/add-sale/add-sale.component';
import { SalesComponent } from '../sales/sales/sales.component';
import { AddSupplierComponent } from '../suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from '../suppliers/edit-supplier/edit-supplier.component';
import { SupplierComponent } from '../suppliers/suppliers/suppliers.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'clients/addClient',
        component: AddClientComponent
      },
      {
        path: 'clients/edit-client/:id',
        component: EditClientComponent
      },
      {
        path: 'articles',
        component: ArticlesComponent
      },
      {
        path: 'articles/articleData/:id',
        component: ArticleDataComponent
      },
      {
        path: 'articles/addArticle',
        component: AddArticleComponent
      },
      {
        path: 'articles/addArticle/:id',
        component: AddArticleComponent
      },
      {
        path: 'suppliers',
        component: SupplierComponent
      },
      {
        path: 'suppliers/addSupplier',
        component: AddSupplierComponent
      },
      {
        path: 'suppliers/edit-supplier/:id',
        component: EditSupplierComponent
      },
      {
        path: 'purchases/newPurchase',
        component: AddPurchaseComponent
      },
      {
        path: 'purchases',
        component: PurchasesComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'sales/newSale',
        component: AddSaleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
