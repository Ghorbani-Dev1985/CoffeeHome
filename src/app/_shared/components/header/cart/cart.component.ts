import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'app/_services/cart.service';
import { PriceLocaleStringPipe } from 'app/_shared/pipes/price-locale-string.pipe';
import { TomanComponent } from "../../toman/toman.component";

@Component({
  selector: 'app-cart',
  imports: [CommonModule, PriceLocaleStringPipe, TomanComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{
  cartService : CartService = inject(CartService)
  cartItems: any;
  totalCartPrice : number = 0;
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
     this.cartItems = cart;
     this.totalCartPrice = this.cartService.getTotalPrice();
     console.log(this.cartItems , this.totalCartPrice)
    })
   }
}
