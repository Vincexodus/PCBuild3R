import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DividerComponent } from '../utils/divider/divider.component';

@Component({
  selector: 'app-product-slideshow',
  standalone: true,
  imports: [ProductCardComponent, DividerComponent],
  templateUrl: './product-slideshow.component.html',
  styleUrl: './product-slideshow.component.sass'
})
export class ProductSlideshowComponent {
  @Input() title: string = "";
}
