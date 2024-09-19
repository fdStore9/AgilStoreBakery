import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  listMenu: Array<any>;
  openSubmenuIndex: number | null = null;
  uiSubscription: Subscription;
  user: any;
  defaultImage = '../../../assets/images/user.png';

  constructor(private readonly menu: MenuService,
    private readonly loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.listMenu = new Array<any>();
  }
  ngOnInit(): void {
    this.uiSubscription = this.store.select('user')
      .subscribe(setUser => {
        this.user = setUser;
        (this.user)
      });
    this.menu.getMenu().subscribe((rs: any) => {
      // this.listMenu = rs.menu.sort((a: any, b: any) => a.title.localeCompare(b.title));
      this.listMenu = rs.menu;
    })
  }
  toggleSubmenu(index: number): void {
    this.openSubmenuIndex = this.openSubmenuIndex === index ? null : index;
  }
  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/']);
    })

  }
}
