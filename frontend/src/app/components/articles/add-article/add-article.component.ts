import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';

import { ArticleService } from '../../../services/article/article.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber } from 'src/app/validations/validations';
import { Strategy } from '../../strategies/strategy';
import { EditArticleStrategy } from './strategies/edit-article-strategy';
import { AddArticleStrategy } from './strategies/add-article-strategy';
import { AlertService } from 'src/app/services/alert-service/alert.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  idArticle: number;
  strategy: Strategy;

  articleForm = new FormGroup({
    id_articulo: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, isNumber]),
    stock: new FormControl('0', [Validators.required, isNumber]),
    imagen: new FormControl(''),
    proveedores: new FormControl(''),
  });

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.article = new Article(); 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idArticle = params.id; });
    if (this.idArticle) {
      this.strategy = new EditArticleStrategy(this.articleService);
      this.getArticle();
    }
    else{
      this.strategy = new AddArticleStrategy(this.articleService);
    }
  }

  getArticle(){
    this.articleService.getArticle(this.idArticle)
      .subscribe(
        res => this.articleForm.patchValue({
          id_articulo: res.id_articulo,
          descripcion: res.descripcion,
          precio: res.precio,
          stock: res.stock,
          imagen: res.imagen,
          proveedores: res.proveedores
        }),
        err => this.alertService.openSnackBar(err.name)
      );
  }

  sendArticle(articleForm: FormGroup, id: number){
    this.strategy.sendItem(articleForm, id)
      .subscribe(
            () => this.router.navigate([this.strategy.route]),
            err => this.alertService.openSnackBar(err.name)
        );
  }

  cancel(){
    this.router.navigate(['/articles']);
  }

  isEdit(){
    return (this.strategy instanceof EditArticleStrategy)
  }
}
