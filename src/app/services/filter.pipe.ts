import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'typefilter',
    pure: false
})
export class TypeFilterPipe implements PipeTransform {
    transform(items: any[], filter: Object): any {
        if (!items || !filter) {
            return items;
        }

        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        // console.log(items[0].type, filter);
        
        return items.filter(item => item.type === filter);
    }
}