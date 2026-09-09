import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import {
  LucideArrowRight,
  LucideArrowUpRight,
  LucidePlay,
  LucidePlus,
  LucideSearch,
  LucideShoppingCart,
  LucideStar,
} from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [
    LucideArrowRight,
    LucideArrowUpRight,
    LucidePlay,
    LucidePlus,
    LucideSearch,
    LucideShoppingCart,
    LucideStar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild('productCard') private productCard?: ElementRef<HTMLElement>;

  protected readonly cartCount = signal(1);
  protected readonly favoriteCount = signal(4);
  protected readonly isFavorite = signal(false);
  protected readonly isSearchOpen = signal(false);
  protected readonly notification = signal('');

  protected toggleSearch(): void {
    this.isSearchOpen.update((isOpen) => !isOpen);
  }

  protected toggleFavorite(): void {
    const isNowFavorite = !this.isFavorite();
    this.isFavorite.set(isNowFavorite);
    this.favoriteCount.update((count) => count + (isNowFavorite ? 1 : -1));
    this.showNotification(isNowFavorite ? 'Added to your favorites' : 'Removed from your favorites');
  }

  protected showCart(): void {
    const itemLabel = this.cartCount() === 1 ? 'item' : 'items';
    this.showNotification(`Your cart has ${this.cartCount()} ${itemLabel}`);
  }

  protected exploreProducts(): void {
    const card = this.productCard?.nativeElement;
    card?.focus({ preventScroll: true });
    card?.classList.remove('is-highlighted');
    requestAnimationFrame(() => card?.classList.add('is-highlighted'));
    this.showNotification('Featured pick: Cozy Cat House');
  }

  protected addToCart(): void {
    this.cartCount.update((count) => count + 1);
    this.showNotification('Cozy Cat House added to your cart');
  }

  protected showNotification(message: string): void {
    this.notification.set(message);
    window.setTimeout(() => {
      if (this.notification() === message) {
        this.notification.set('');
      }
    }, 2200);
  }
}
