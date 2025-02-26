import { PriceLocaleStringPipe } from './price-locale-string.pipe';

describe('PriceLocaleStringPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceLocaleStringPipe();
    expect(pipe).toBeTruthy();
  });
});
