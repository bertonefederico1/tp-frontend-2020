import { Supplier } from '../supplier/Supplier';

export class Article {

    articleId: number;
    description: string;
    price: number;
    stock: number;
    picture: string;
    suppliers: Supplier[] = [];

    constructor(
        articleId?: number,
        description?: string,
        price?: number,
        stock?: number,
        picture?: string,
        suppliers?: Supplier[]
    ){
        if(articleId)   this.articleId = articleId;
        if(description)    this.description = description;
        if(price)    this.price = price;
        if(stock)    this.stock = stock;
        if(picture)    this.picture = picture;
        if(suppliers)   this.suppliers = suppliers;
    }
}
