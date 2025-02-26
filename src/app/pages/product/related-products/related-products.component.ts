import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { ProductsService } from 'app/_services/products.service';
import { LoadingComponent } from "../../../_shared/components/loading/loading.component";
import { ProductCardComponent } from "../../../_shared/components/product-card/product-card.component";


@Component({
  selector: 'app-related-products',
  imports: [CommonModule, LoadingComponent, ProductCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
  providers: [ProductsService]
})
export class RelatedProductsComponent implements OnInit{
  productsService: ProductsService = inject(ProductsService)
  @Input() relatedProductsIds: number[] = [];
  isLoading: boolean = false;
  relatedProducts: any;
    constructor(){

    }
    ngOnInit(): void {
       this.loadRelatedProducts();
    }
    loadRelatedProducts(): void {
      this.isLoading = true;
      if(this.relatedProductsIds.length > 0){
        this.productsService.getRelatedProducts(this.relatedProductsIds).subscribe((data) => {
          this.relatedProducts = data;
          this.isLoading = false;
          console.log(this.relatedProducts)
        })
      }
    }
      breakpoints = {
        640: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 10
        }
      }

}
