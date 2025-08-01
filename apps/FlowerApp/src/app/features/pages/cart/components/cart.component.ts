import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { Router } from '@angular/router';
 @Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    PrimaryBtnComponent,
    GlobalInputComponent,
     
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  products = signal<any>([
    {
      rateAvg: 5,
      rateCount: 0,
      _id: '673e2e1f115992017ff28153',
      title: 'Dreamy White Roses Bouquet',
      slug: 'dreamy-white-roses-bouquet',
      description:
        'Elevate any celebration with our luxury rose bouquet. This exquisite arrangement features pristine white roses wrapped in a sophisticated dark teal wrap, creating a stunning visual contrast. Perfect for celebrations, anniversaries, or as a heartfelt gift, this bouquet combines timeless elegance with modern style. Make a memorable impression with this luxurious floral arrangement. Buy now to delight your loved ones with the beauty and grace of these premium roses.',
      imgCover:
        'https://flower.elevateegy.com/uploads/2d8ddf11-935f-4a45-a100-e1e0765a39c3-cover_image.png',
      images: [
        'https://flower.elevateegy.com/uploads/8ee8e389-da6a-4371-8b13-5e35fcca16c6-image_one.png',
        'https://flower.elevateegy.com/uploads/66fc9304-3ceb-4b73-97dd-730ccf790c49-image_three.png',
        'https://flower.elevateegy.com/uploads/acf9531b-5ca9-4c45-97fc-f81df9d62091-image_two.png',
      ],
      price: 320,
      priceAfterDiscount: 199,
      quantity: 1,
      category: '673c46fd1159920171827c85',
      occasion: '673b35c01159920171827aed',
      createdAt: '2024-11-20T18:44:47.407Z',
      updatedAt: '2025-07-05T11:30:17.866Z',
      __v: 0,
      isSuperAdmin: true,
      sold: 101,
      id: '673e2e1f1159920171828153',
    },
    {
      rateAvg: 5,
      rateCount: 0,
      _id: '673e2e1f1dsf9920171828153',
      title: 'Dreamy White Roses Bouquet',
      slug: 'dreamy-white-roses-bouquet',
      description:
        'Elevate any celebration with our luxury rose bouquet. This exquisite arrangement features pristine white roses wrapped in a sophisticated dark teal wrap, creating a stunning visual contrast. Perfect for celebrations, anniversaries, or as a heartfelt gift, this bouquet combines timeless elegance with modern style. Make a memorable impression with this luxurious floral arrangement. Buy now to delight your loved ones with the beauty and grace of these premium roses.',
      imgCover:
        'https://flower.elevateegy.com/uploads/2d8ddf11-935f-4a45-a100-e1e0765a39c3-cover_image.png',
      images: [
        'https://flower.elevateegy.com/uploads/8ee8e389-da6a-4371-8b13-5e35fcca16c6-image_one.png',
        'https://flower.elevateegy.com/uploads/66fc9304-3ceb-4b73-97dd-730ccf790c49-image_three.png',
        'https://flower.elevateegy.com/uploads/acf9531b-5ca9-4c45-97fc-f81df9d62091-image_two.png',
      ],
      price: 320,
      priceAfterDiscount: 199,
      quantity: -1,
      category: '673c46fd1159920171827c85',
      occasion: '673b35c01159920171827aed',
      createdAt: '2024-11-20T18:44:47.407Z',
      updatedAt: '2025-07-05T11:30:17.866Z',
      __v: 0,
      isSuperAdmin: true,
      sold: 101,
      id: '673e2e1f1159920171828153',
    },
    {
      rateAvg: 5,
      rateCount: 0,
      _id: '673e2d1b1159920171828146',
      title: 'GABRIELLE CHANEL',
      slug: 'gabrielle-chanel',
      description:
        'PRODUCT\nBefore creating the House of CHANEL, Coco was Gabrielle. A rebel at heart...passionate and free. The inspiration for the luminous floral fragrance: GABRIELLE CHANEL.\n\nThe fragrance appears to be weightlessly suspended within the striking square bottle. Made with ultra-thin glass, the 4 transparent sides fade into the background, letting light radiate through. The label and the stopper have the same square shape and precious lamé hue, a delicate balance between gold and silver, and the interior is warmed with an even more resplendent gold. The bottle is carefully protected by a sleeve imprinted with its silhouette.',
      imgCover:
        'https://flower.elevateegy.com/uploads/0c6c00d1-d816-44e4-8119-cf97807427f2-cover_image.png',
      images: [
        'https://flower.elevateegy.com/uploads/f286e018-63bb-4e6b-9d6b-feefdf28cdf3-image_one.png',
        'https://flower.elevateegy.com/uploads/75fae675-a16e-4d26-98a4-63f34e8423f0-image_three.png',
        'https://flower.elevateegy.com/uploads/7f3bcf05-7e55-476c-9d3d-8026c709a80c-image_two.png',
      ],
      price: 340,
      priceAfterDiscount: 172,
      quantity: 982,
      category: '673c47751159920171827c93',
      occasion: '673b368c1159920171827afc',
      createdAt: '2024-11-20T18:40:27.076Z',
      updatedAt: '2025-07-12T15:46:33.102Z',
      __v: 0,
      isSuperAdmin: true,
      sold: 18,
      id: '673e2d1b1159920171828146',
    },
    {
      rateAvg: 5,
      rateCount: 0,
      _id: '673e31ee1159920171828177',
      title: 'Patchi Chocolate 500g | Lilies Vase',
      slug: 'patchi-chocolate-500g-or-lilies-vase',
      description:
        "The Patchi Chocolate Box, adorned with delicate Pink Lilies and White Baby Orchids, is a true feast for the senses. This 500-gram box of Patchi chocolates, carefully encased in a stylish Cylinder Glass Vase, is the epitome of elegance and indulgence. With a harmonious blend of delectable chocolates and the natural beauty of fresh flowers, it's a perfect gift that combines sweetness for the palate with the beauty of nature for the soul. A tantalizing treat for chocolate lovers and flower enthusiasts alike, this enchanting arrangement promises a delightful and luxurious experience.",
      imgCover:
        'https://flower.elevateegy.com/uploads/31ec8c75-a82b-42ff-81ce-44c1b0c9d42e-cover_image.png',
      images: [
        'https://flower.elevateegy.com/uploads/9f861773-e79a-44fb-a3af-6554727f6bec-image_four.png',
        'https://flower.elevateegy.com/uploads/ed916315-2f60-428b-9b45-da6dcad7a4b9-image_one.png',
        'https://flower.elevateegy.com/uploads/2e964585-b7aa-47b1-84c9-a3f1c7ec9f0e-image_three.png',
        'https://flower.elevateegy.com/uploads/fca847e5-1079-4882-859a-3aad8c2f6e9b-image_two.png',
      ],
      price: 1900,
      priceAfterDiscount: 999,
      quantity: 1174,
      category: '673c479e1159920171827c99',
      occasion: '673b39241159920171827b28',
      createdAt: '2024-11-20T19:01:02.577Z',
      updatedAt: '2025-07-29T22:36:20.750Z',
      __v: 0,
      isSuperAdmin: true,
      sold: 26,
      id: '673e31ee1159920171828177',
    },
  ]);
  constructor(private _router: Router) {}
  goToProductsListPage() {
    this._router.navigate(['/product-list']);
  }
  decrementPrice() {
    console.log('decrement');
  }
  incrementPrice(product: any) {
    console.log('increment');
    //.quantity++;
  }
}
