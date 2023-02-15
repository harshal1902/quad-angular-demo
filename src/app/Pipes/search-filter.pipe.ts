import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(data: any, config: any, q: string) {
    return data.filter((item: { [x: string]: { toString: () => string; }; }) => {
      for (let i = 0; i < config.length; i ++) {
        const type = config[i];
        if (item[type].toString().toLowerCase().indexOf(q) > -1) {
          return true;
        }
      }
      return false;
    });
  }

}
