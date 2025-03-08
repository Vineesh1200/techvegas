import { Component, inject } from '@angular/core';
import { NzRowDirective, NzColDirective } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Router } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzRowDirective, NzColDirective, CommonModule, NzInputModule, NzSpinModule, FormsModule, NzModalModule, NzBadgeModule, NzPopoverModule, NzAvatarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  userProfileData: any;
  items = [
    { title: 'Help & Support', count: '', icon: 'assets/IC_Help.svg', link: '/help' },
    { title: 'Logout', count: '', icon: 'assets/IC_Logout.svg', link: '' },
  ];
  searchForm: FormGroup;
  searchText: string = '';
  isModalVisible: boolean = false;
  searchProductData: any[] = [];
  isLoading: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.searchForm = this.fb.group({
      searchText: [''],
    });
  }

  searchData(): void {
    this.isLoading = true;
    this.isModalVisible = true;

    setTimeout(() => {
      this.searchProductData = [
        {
          _id: '1',
          title: 'Product 1',
          category: 'Category 1',
          productUrls: [{ url: 'assets/product1.jpg' }],
        },
        {
          _id: '2',
          title: 'Product 2',
          category: 'Category 2',
          productUrls: [{ url: 'assets/product2.jpg' }],
        },
      ];
      this.isLoading = false;
    }, 2000);
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  naviProduct(productId: string): void {
    this.router.navigate([`/product/${productId}`]);
  }

  navigateUrl(link: string): void {
    this.router.navigate([link]);
  }

  navHandleChange(title: string): void {
    console.log('Clicked:', title);
    if (title === 'Logout') {
      console.log('Logout');
    }
  }
}
