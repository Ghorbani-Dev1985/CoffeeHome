import { inject, Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class CartService{
  http : HttpClient = inject(HttpClient);
  loadingService: LoadingService = inject(LoadingService);
  toast: HotToastService = inject(HotToastService);
  private cartKey = 'cart';
  private cartSubject = new BehaviorSubject<any[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();
  constructor() { }
  getCart(): any[] {
     const cart = localStorage.getItem(this.cartKey);
     console.log('Cart Data:', cart ? JSON.parse(cart) : []);
     return cart ? JSON.parse(cart) : [];
  }
  getTotalPrice(): number {
    const cart = this.getCart();
    return cart.reduce((total , item) => total + Number(item.price) * Number(item.quantity) , 0)
  }
  saveCart(cart: any[]): void {
    localStorage.setItem(this.cartKey , JSON.stringify(cart));
    this.cartSubject.next(cart);
  }
  isProductInCart(productId: number, selectedAttr: string[]): boolean {
    const cart = this.getCart();
    return cart.some(
      (item) =>
        item.id === productId &&
        JSON.stringify(item.selectedAttr) === JSON.stringify(selectedAttr)
    );
  }
  getProductQuantity(productId: string, selectedAttr: string[]): number {
    const cart = this.getCart();
    const product = cart.find(
      (item) => item.id === productId && JSON.stringify(item.selectedAttr) === JSON.stringify(selectedAttr)
    );
    return product ? product.quantity : 0;
  }
  addToCart(product: any , selectedAttr: string[] , quantity: number): void {
   const cart = this.getCart();
   const cartItemIndex = cart.findIndex(
    (item) => item.id === product.id && JSON.stringify(item.selectedAttr) === JSON.stringify(selectedAttr)
  );
   if(cartItemIndex !== -1){
    cart[cartItemIndex].quantity += quantity;
    cart[cartItemIndex].selectedAttr = selectedAttr;
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
   }else{
    cart.push({...product , quantity: quantity , selectedAttr})
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
   }
   this.saveCart(cart)
  }
  deleteFromCart(productId: string , selectedAttr: string[]): void {
    let cart = this.getCart();
    cart = cart.filter(
      (item) => !(item.id === productId && JSON.stringify(item.selectedAttr) === JSON.stringify(selectedAttr))
    );
    this.saveCart(cart);
  }
  updateCart(productId: string, selectedAttr: string[], quantity: number
  ): void {
    let cart = this.getCart();
    const index = cart.findIndex(
      (item) => item.id === productId && JSON.stringify(item.selectedAttr) === JSON.stringify(selectedAttr)
    );
    if (index !== -1) {
      if (quantity > 0) {
        cart[index].quantity = quantity;
        this.toast.success("محصول مورد نظر با موفقیت از سبد خرید حذف شد");
      } else {
        cart.splice(index, 1);
      }
    }
    this.saveCart(cart);
  }
  clearCart(): void {
    localStorage.removeItem(this.cartKey)
  }
}
