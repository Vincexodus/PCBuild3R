import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Directory } from '../../interfaces/directory';
import { RouterLink } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink, OrderHistoryComponent, WishlistComponent, ShoppingCartComponent,
            EditProfileComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.sass'
})
export class AccountComponent {
  directories: Directory[] = [
    { name: "Order History", icon: "fa-regular fa-clipboard", link:'/orderHistory' },
    { name: "Wishlist", icon: "fa-regular fa-heart", link:'/wishlist' },
    { name: "Shopping Cart", icon: "fa-regular fa-cart-shopping", link:'/cart' },
    { name: "Edit Profile", icon: "fa-solid fa-pen-to-square", link:'/editProfile' },
    { name: "Logout", icon: "fa-solid fa-right-from-bracket", link:'/logout' },
  ]
}
