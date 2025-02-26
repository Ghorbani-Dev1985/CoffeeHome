import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'app/_services/cart.service';
import { TomanComponent } from "../../_shared/components/toman/toman.component";

@Component({
  selector: 'app-cart',
  imports: [TomanComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{
  cartService : CartService = inject(CartService)
  cartItems: any;
  totalCartPrice : number = 0;
  showModal: boolean = false;
   constructor(){}
   ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
     this.cartItems = cart;
     this.totalCartPrice = this.cartService.getTotalPrice();
     console.log(this.cartItems , this.totalCartPrice)
    })
   }
   showModalHandler(){
   this.showModal = !this.showModal;
   }
   deleteAllCartHandler(){
    this.cartService.clearCart();
   }
}
