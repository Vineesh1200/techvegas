import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Router, RouterLink } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Store } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { filter, map, Observable } from 'rxjs';
import { selectedProducts } from '../../store/selector/products.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzSpinModule, FormsModule, NzModalModule, NzBadgeModule, NzPopoverModule, NzAvatarModule, AsyncPipe,RouterLink],
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
  searchProductData$!: Observable<ProductInterface[]>;
  filteredProducts$!: Observable<ProductInterface[]>;
  isLoading: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store$ = inject(Store);

  constructor() {
    this.searchForm = this.fb.group({
      searchText: [''],
    });
  }

  ngOnInit() {
    this.searchProductData$ = this.store$.select(selectedProducts);
  }

  searchData(): void {
    this.isModalVisible = true;
    if (!this.searchText) {
      this.filteredProducts$ = this.searchProductData$;
    } else {
      this.filteredProducts$ = this.searchProductData$.pipe(
        map((products) =>
          products.filter((product) =>
            product.title.toLowerCase().includes(this.searchText.toLowerCase())
          )
        )
      );
    }
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  naviProduct(productId: number): void {
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
