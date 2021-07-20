import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';

import { ArticleService } from '../../../services/article/article.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber } from 'src/app/validations/validations';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Strategy } from '../../strategies/strategy';
import { EditArticleStrategy } from './strategies/edit-article-strategy';
import { AddArticleStrategy } from './strategies/add-article-strategy';

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
    private localStorage: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.article = new Article(); 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {this.idArticle = params.id; });
    if (this.idArticle) {
      this.strategy = new EditArticleStrategy(this.articleService, this.router);
      this.getArticle();
    }
    else{
      this.strategy = new AddArticleStrategy(this.articleService, this.router);
      const form = this.getForm();
      this.articleForm.patchValue({
        descripcion: form.descripcion,
        precio: form.precio,
        imagen: form.imagen
      });
    }
  }

  setStrategy(strategy: Strategy){
    this.strategy = strategy;
  }

  sendArticle(articleForm: FormGroup, id: number){
    this.localStorage.removeForm();
    this.strategy.sendItem(articleForm, id);
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
        err => console.log(err)
      );
  }

  cancel(){
    this.saveForm();
    this.router.navigate(['/articles']);
  }

  getForm(){
    return this.localStorage.getForm();
  }

  saveForm(){
    this.localStorage.setForm(this.articleForm.value);
  }

  isEdit(){
    return (this.strategy instanceof EditArticleStrategy)
  }
}
