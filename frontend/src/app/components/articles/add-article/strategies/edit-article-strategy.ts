import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";

export class EditArticleStrategy implements Strategy{

    constructor(private articleService: ArticleService, private router: Router){
    }    

    sendItem(articleForm: FormGroup, id: number){
        this.articleService.editArticle(id, articleForm.value)
        .subscribe(
        res => this.router.navigate(['/articles']),
        err => console.log(err)
        );
    }
}