
export abstract class Strategy{
    
    route: string;
    title: string;
    
    constructor(){
    }

    abstract sendItem(articleServiceMethod, id?);
}