import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Strategy } from "src/app/components/strategies/strategy";
import { ArticleService } from "src/app/services/article/article.service";

export class AddArticleStrategy extends Strategy{

    constructor(
        protected articleService: ArticleService)
    {
        super();
        this.title = 'ADD ARTICLE';
        this.route = '/articles';
    }

    sendItem(articleForm: FormGroup): Observable<any>{
        return this.articleService.addArticle(articleForm);
    }
}