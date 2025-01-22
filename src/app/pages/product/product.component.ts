import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from 'app/_services/products.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ExtractOriginalPricePipe } from 'app/_shared/pipes/extract-original-price.pipe';
import { PriceLocaleStringPipe } from 'app/_shared/pipes/price-locale-string.pipe';
import { TomanComponent } from "../../_shared/components/toman/toman.component";
import { SafeHtmlPipe } from 'app/_shared/pipes/safe-html.pipe';
import { RelatedProductsComponent } from "./related-products/related-products.component";
import { ProductLoadingComponent } from "./product-loading/product-loading.component";
import {FormsModule} from '@angular/forms'
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from 'app/_services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, ExtractOriginalPricePipe, PriceLocaleStringPipe, TomanComponent, SafeHtmlPipe, RelatedProductsComponent, ProductLoadingComponent, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProductsService]
})
export class ProductComponent implements OnInit{
 route: ActivatedRoute = inject(ActivatedRoute)
 router: Router = inject(Router)
 toast: HotToastService = inject(HotToastService)
 productsService: ProductsService = inject(ProductsService)
 product: any;
 productImages:any;
 isLoading: boolean = false;
 productId!: string;
 quantity: number = 1;
 relatedProductsIds : number[] = [];
 selectedAttr: string[] = ["0", "0"];
 isInCart: boolean = false;
 quantityInCart: number = 0;
 constructor(private cartService : CartService){
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      window.scrollTo(0, 0);
    }
  });
 }
 ngOnInit(): void {
  this.route.params.subscribe(async (params) => {
    this.productId = params['id']
    this.isLoading = true;
    try {
     this.product = await firstValueFrom(this.productsService.getProduct(this.productId))
     this.isLoading = false;
     this.productImages = this.product.images
     this.relatedProductsIds = this.product.related_ids;
    this.checkProductInCart();
    this.updateIsInCart()
    } catch (error) {
      this.isLoading = false;
    }
  });
  this.cartService.cart$.subscribe(() => {this.updateIsInCart()});
 }
 updateIsInCart(): void {
  this.isInCart = this.cartService.isProductInCart(Number(this.productId) , this.selectedAttr);
}
checkProductInCart(): void {
  this.quantityInCart = this.cartService.getProductQuantity(this.productId, this.selectedAttr);
}
onAttributeChange(): void {
  console.log("Selected Attributes:", this.selectedAttr);
  this.isInCart = false;
  this.checkProductInCart();
}
 increaseQty(){
  this.quantity++;
  this.isInCart = false;
 }
 decreaseQty(){
  if(this.quantity > 1){
    this.quantity -= 1;
    }
 }
 addToCartHandler(){
  if (this.product.attributes.length === 0) {
    this.cartService.addToCart(this.product, [] , this.quantity);
    this.toast.success("محصول مورد نظر با موفقیت به سبد خرید افزوده شد");
  } else if (this.product.attributes.length === 1) {
    if (this.selectedAttr[0] === "0") {
      this.toast.error(`لطفا مقدار ${this.product.attributes[0].name} را وارد نمایید`);
    } else {
      this.cartService.addToCart(this.product, this.selectedAttr , this.quantity);
      this.toast.success("محصول مورد نظر با موفقیت به سبد خرید افزوده شد");
    }
  } else if (this.product.attributes.length === 2) {
    if (this.selectedAttr[0] === "0" && this.selectedAttr[1] === "0") {
      this.toast.error(`لطفا مقدار ${this.product.attributes[0].name} و ${this.product.attributes[1].name} را وارد نمایید`);
    }else if(this.selectedAttr[0] === "0"){
      this.toast.error(`لطفا مقدار ${this.product.attributes[0].name} را وارد نمایید`);
    }else if(this.selectedAttr[1] === "0"){
      this.toast.error(`لطفا مقدار ${this.product.attributes[1].name} را وارد نمایید`);
    }else {
      this.cartService.addToCart(this.product, this.selectedAttr , this.quantity);
      this.isInCart = true;
      this.checkProductInCart();
      this.loadCart()
      console.log(this.isInCart)
      this.toast.success("محصول مورد نظر با موفقیت به سبد خرید افزوده شد");
    }
  }
  }
  deleteFromCardHandler(){
    const quantity = this.cartService.getProductQuantity(this.product.id , this.selectedAttr);
    if (quantity === 1) {
      this.cartService.deleteFromCart(this.product.id, this.selectedAttr);
      this.isInCart = false;
      this.quantityInCart =0;
      this.toast.success("محصول مورد نظر با موفقیت از سبد خرید حذف شد");
    } else {
      this.cartService.updateCart(this.product.id, this.selectedAttr , quantity - 1);
      this.quantityInCart = quantity - 1;
    }
  }
  loadCart(): void {
    this.cartService.getCart()
   }
}
