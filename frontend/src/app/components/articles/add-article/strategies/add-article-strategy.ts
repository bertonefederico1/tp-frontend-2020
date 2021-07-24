import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";
import { ErrorService } from "src/app/services/error-service/error.service";

export class AddArticleStrategy implements Strategy{

    constructor(
        private articleService: ArticleService,
        private router: Router,
        private errorService: ErrorService){
    }    

    sendItem(articleForm: FormGroup, id = 0){
        this.articleService.addArticle(articleForm.value)
        .subscribe(
        res => this.router.navigate(['/articles']),
        err => this.errorService.openSnackBar(err.name)
        );
    }
}