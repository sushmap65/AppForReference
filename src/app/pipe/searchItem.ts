import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'searchItemFilter'
})

export class SearchItemFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return _.filter(items, (item) => {
          if( item ) {
            for (let key in item ) {
              let term = '' + item[key];
              if((term.toLowerCase()).includes(criteria.toLowerCase())){
                return true;
              }
            }
          }
          return false;
        });
    }
}
