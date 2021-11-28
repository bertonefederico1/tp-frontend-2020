import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/models/article/article';
import { ArticleSupplier } from '../../models/article-supplier/article-supplier';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  readonly URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<any>(`${this.URL}/articles`)
      .pipe(map((res: any) => {
        return this.getArticlesModel(res);
      }))
  }

  addArticle(article: any){
    let newArticle = this.getArticleModelSpanish(article);
    return this.http.post(`${this.URL}/addArticle`, newArticle);
  }

  getArticle(articleId: number){
    return this.http.get<Article>(`${this.URL}/articles/${articleId}`)
      .pipe(map((res: any) => {
        return this.getArticleModel(res);
      }))
  }

  editArticle(id: number, articleUpdated: any){
    let newArticle = this.getArticleModelSpanish(articleUpdated);
    return this.http.put(`${this.URL}/articles/${id}`, newArticle);
  }

  deleteArticle(id: number){
    return this.http.put(`${this.URL}/suspendArticle/${id}`, 'Suspend');
  }

  loadStock(purchase: ArticleSupplier){
    return this.http.post(`${this.URL}/loadStock`, purchase);
  }

  getArticlesModel(articles: any[]){
    let articlesModel: Article[] = [];
    for(let article of articles){
      articlesModel.push(this.getArticleModel(article));
    }
    return articlesModel;
  }

  getArticleModel(article: any){
    const articleModel = new Article(article.id_articulo, article.descripcion,
      article.precio, article.stock, article.imagen, article.proveedores);
    return articleModel;
  }

  getArticleModelSpanish(article: Article){
    const articleSpanish: any = {};
    console.log(article)
    if(article.articleId) articleSpanish.id_articulo = article.articleId;
    if(article.description) articleSpanish.descripcion = article.description;
    if(article.price) articleSpanish.precio = article.price;
    if(article.stock) articleSpanish.stock = article.stock;
    if(article.picture) articleSpanish.imagen = article.picture;
    if(article.suppliers) articleSpanish.proveedores = article.suppliers;
    return articleSpanish;
  }

}
