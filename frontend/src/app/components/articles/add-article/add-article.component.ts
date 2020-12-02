import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";

import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  edit: boolean = false;
  idArticle: number;
  

  constructor(
    private articleService: ArticleService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.article = new Article();
  }
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idArticle = params.id;});
    if (this.idArticle) {
      this.edit = true;
      this.getArticle();
    }
  }


  addArticle(){
    if(this.validate()){
      this.articleService.addArticle(this.article)
        .subscribe(
          res => this.router.navigate(['/articles']),
          err => console.log(err)
        );
    }
    else{
      alert('Complete la descripción y el precio del artículo')
    }
  }

  editArticle(){
    if(this.validate()){
      this.articleService.editArticle(this.idArticle, this.article)
        .subscribe(
          res => this.router.navigate(['/articles']),
          err => console.log(err)
        );
    }
    else{
      alert('Complete la descripción y el precio del artículo')
    }
  }

  getArticle(){
    this.articleService.getArticle(this.idArticle)
      .subscribe(
        res => this.article = res,
        err => console.log(err)
      );
  }

  cancel(){
    this.router.navigate(['/articles']);
  }

  validate(){
    if(this.article.descripcion === undefined || this.article.precio === undefined){
      return false;
    }
    else{
      if(this.article.descripcion === '' || this.article.precio.toString() === ''){
        return false;
      }
      else{
        return true;
      }
    }
  }
}
