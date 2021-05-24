import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddArticleComponent } from '../articles/add-article/add-article.component';
import { ArticleDataComponent } from '../articles/article-data/article-data.component';
import { ArticleComponent } from '../articles/article/article.component';
import { AddClientComponent } from '../clients/add-client/add-client.component';
import { ClientComponent } from '../clients/client/client.component';
import { EditClientComponent } from '../clients/edit-client/edit-client.component';
import { AddPurchaseComponent } from '../purchases/add-purchase/add-purchase.component';
import { PurchaseComponent } from '../purchases/purchase/purchase.component';
import { SalesComponent } from '../sales/sales/sales.component';
import { AddSupplierComponent } from '../suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from '../suppliers/edit-supplier/edit-supplier.component';
import { SupplierComponent } from '../suppliers/supplier/supplier.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'clients',
        component: ClientComponent
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
        component: ArticleComponent
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
        component: PurchaseComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
