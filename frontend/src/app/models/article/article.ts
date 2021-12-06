import { Supplier } from '../supplier/Supplier';

export class Article {

    articleID: number;
    description: string;
    price: number;
    stock: number;
    picture: string;
    suppliers: Supplier[] = [];

    constructor(
        articleID?: number,
        description?: string,
        price?: number,
        stock?: number,
        picture?: string,
        suppliers?: Supplier[]
    ){
        if(articleID)   this.articleID = articleID;
        if(description)    this.description = description;
        if(price)    this.price = price;
        if(stock)    this.stock = stock;
        if(picture)    this.picture = picture;
        if(suppliers)   this.suppliers = suppliers;
    }
}
