import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractOriginalPrice'
})
export class ExtractOriginalPricePipe implements PipeTransform {

  transform(value: string) {
    const regex = /<del.*?>.*?<bdi>([\d,۰-۹]+).*?<\/bdi>/;
    const match = value.match(regex);
    return match ? match[1] : null;
  }

}
