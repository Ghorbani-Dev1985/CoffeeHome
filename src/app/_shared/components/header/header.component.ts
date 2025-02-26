import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from 'app/_services/cart.service';
import { PriceLocaleStringPipe } from 'app/_shared/pipes/price-locale-string.pipe';

import { categoriesItems } from 'app/_shared/utils/categoriesItems';
import { CartComponent } from "./cart/cart.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, PriceLocaleStringPipe, CartComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{
cartService : CartService = inject(CartService)
  showMobileMenu : boolean = false;
  categoriesNav: Array<{id: string, name: string }> = categoriesItems;
  cartItems: any[] = [];
  totalCartPrice : number = 0;
  constructor(){

  }
  ShowMobileMenuHandler(){
    this.showMobileMenu = !this.showMobileMenu;
  }
  ngOnInit(): void {
   this.cartService.cart$.subscribe((cart) => {
    this.cartItems = cart;
    this.totalCartPrice = this.cartService.getTotalPrice();
    console.log(this.cartItems , this.totalCartPrice)
   })
  }

}
