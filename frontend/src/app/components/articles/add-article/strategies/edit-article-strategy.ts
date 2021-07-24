import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";
import { ErrorService } from "src/app/services/error-service/error.service";

export class EditArticleStrategy implements Strategy{

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private errorService: ErrorService ){
    }    

    sendItem(articleForm: FormGroup, id: number){
        this.articleService.editArticle(id, articleForm.value)
        .subscribe(
        res => this.router.navigate(['/articles']),
        err => this.errorService.openSnackBar(err.name)
        );
    }
}