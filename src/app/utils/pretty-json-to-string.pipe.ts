import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettystring'
})
export class PrettyStringPipe implements PipeTransform {

  transform(value: any) {
    return JSON.stringify(value);
  }

}