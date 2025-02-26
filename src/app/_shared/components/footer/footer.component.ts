import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { categoriesItems } from 'app/_shared/utils/categoriesItems';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  categoriesNav: Array<{id: string, name: string }> = categoriesItems;
}
