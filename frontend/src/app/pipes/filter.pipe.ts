import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any, args: string): any[] {
    if (args.length >= 2 || args === ''){
      return values.filter((article) => {
        if (article.descripcion.toLowerCase().indexOf(args.toLowerCase()) > -1){
          return true;
        }
      });
    } else {
      return values;
    }
  }

}
