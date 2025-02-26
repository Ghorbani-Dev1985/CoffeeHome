import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { LoadingService } from '../../_services/loading.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../_shared/components/loading/loading.component";
import { ProductCardComponent } from "../../_shared/components/product-card/product-card.component";
import { ProductCategoriesComponent } from "./product-categories/product-categories.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, LoadingComponent, ProductCardComponent, ProductCategoriesComponent],
  standalone: true,
  templateUrl: './home.component.html',
  providers: [LoadingService , ProductsService]
})
export class HomeComponent implements OnInit {
  loadingService : LoadingService = inject(LoadingService)
  productsService: ProductsService = inject(ProductsService)
  products: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  constructor() {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
   }
   loadProducts(): void {
    this.productsService.getProducts(this.currentPage).subscribe((data: any) => {
      this.products = data;
    });
  }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
  nextPage(): void {
    this.currentPage++;
    this.loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  goFirstPage(): void {
      this.currentPage = 1;
      this.loadProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

