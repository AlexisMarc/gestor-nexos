import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
   name : 'Search'
})
export class FilterPipe implements PipeTransform {

    transform(value: any, arg: any): any {
        if (arg === '' || arg.length < 2) { return value; }
        const resultSearch = [];
        for (const post of value) {
            if (post.name) {
                if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                    resultSearch.push(post);
                }
            }
            if (post.residential_name) {
                if (post.residential_name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
                    resultSearch.push(post);
                }
            }
        }
        return resultSearch;
    }

    // transform2(value: any, arg: any): any {
    //     if (arg === '' || arg.length < 2) { return value; }
    //     const resultSearch = [];
    //     for (const post of value) {
    //         if (post.residential_name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
    //             resultSearch.push(post);
    //         }
    //     }
    //     return resultSearch;
    // }
}
