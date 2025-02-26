import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceLocaleString',
  standalone: true,
  pure: false
})
export class PriceLocaleStringPipe implements PipeTransform {
  transform(value: string | number) {
    let toNumber = Number(value);
    return toNumber.toLocaleString()
  }
}
