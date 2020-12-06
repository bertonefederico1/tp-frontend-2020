import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article/article';

import { ArticleService } from "../../../services/article/article.service";

import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isNumber } from 'src/app/validations/validations';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  edit: boolean = false;
  idArticle: number;
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
    this.articleService.addArticle(this.articleForm.value)
      .subscribe(
        res => this.router.navigate(['/articles']),
        err => console.log(err)
      );
  }

  editArticle(){
    this.articleService.editArticle(this.idArticle, this.articleForm.value)
      .subscribe(
        res => this.router.navigate(['/articles']),
        err => console.log(err)
      );   
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
    this.router.navigate(['/articles']);
  }

}
