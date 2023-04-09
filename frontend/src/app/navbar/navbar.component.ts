import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isShowSignIn = false;
  itemSelectCount = 0;
  getIsShowSignInSub: Subscription;
  getSelectItemSub: Subscription;
  userId: number;

  constructor(
    @Inject('NavbarService') private navbarService: NavbarService,
    private router: Router
  ) {
    const getSelectItem = localStorage.getItem('shopping');

    if (getSelectItem != null) {
      this.navbarService.setSelectItem(JSON.parse(getSelectItem));
      this.itemSelectCount = JSON.parse(getSelectItem).length;
    }

    this.getIsShowSignInSub = this.navbarService
      .getIsShowSignIn()
      .subscribe((e) => (this.isShowSignIn = e));

    this.getSelectItemSub = this.navbarService
      .getSelectItem()
      .subscribe((e) => (this.itemSelectCount = e.length));

    const token = localStorage.getItem('token');

    if (token != null) {
      const decode: any = jwtDecode(token);
      this.userId = decode.id;
    }
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('shopping');
    this.navbarService.setIsShowSignIn(false);
    this.navbarService.setSelectItem([]);
    this.router.navigate(['signIn']);
  }

  ngOnInit(): void {
    console.log('ngOnInit NavbarComponent');
  }
}
