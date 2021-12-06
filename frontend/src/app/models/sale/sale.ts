import { Article } from "../article/article";

export class Sale {
    customerID: number;
    articles: Article[];
    total: number;

    constructor(articles: Article[], customerID: number, total: number) {
        this.customerID = customerID;
        this.articles = articles;
        this.total = total;
    }
}
