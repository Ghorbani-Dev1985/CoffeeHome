import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'app/_services/products.service';

@Component({
  selector: 'app-product-categories',
  imports: [CommonModule],
  templateUrl: './product-categories.component.html',
  providers: [ProductsService]
})
export class ProductCategoriesComponent{
  router: Router = inject(Router)
  productsService: ProductsService = inject(ProductsService)
  categories: any[] = [];
  categoriesLinkItems: Array<{id: string, src: string, alt: string }> = [
    {
      id: "3769",
      src: '1.jpg',
      alt: 'پالتو زیپ پلاس'
    },
    {
     id: "681",
      src: '2.jpg',
      alt: 'شال و روسری زیپ پلاس'
    },
    {
      id: "672",
      src: '3.jpg',
      alt: 'کت جین زیپ پلاس'
    },
    {
      id: "520",
      src: '4.jpg',
      alt: 'شلوار جین زیپ پلاس'
    },
    {
      id: "5168",
      src: '5.jpg',
      alt: 'دامن جین زیپ پلاس'
    },
    {
      id: "4379",
      src: '6.jpg',
      alt: 'بادی بلوز بافت کراپ زیپ پلاس'
    }
  ];
  constructor(){

  }
  getCategories(): void {
    this.productsService.getCategories().subscribe((data) => {
      this.categories = data;
    })
  }
  navigateToCategory(categoryId: string , categoryName: string): void {
    this.router.navigate(['/category', categoryId], {queryParams: {name: categoryName}});
  }
}
