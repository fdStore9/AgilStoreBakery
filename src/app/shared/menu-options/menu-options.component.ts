import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-options',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-options.component.html',
  styleUrl: './menu-options.component.css'
})
export class MenuOptionsComponent implements OnInit {
  listMenu: Array<any>;
  constructor(private readonly menu: MenuService) {
    this.listMenu = new Array<any>();
  }
  ngOnInit(): void {
    this.menu.getMenu().subscribe((rs: any) => {
      // this.listMenu = rs.menu.sort((a: any, b: any) => a.title.localeCompare(b.title));
      this.listMenu = rs.menu;
      console.log(this.listMenu);
    })
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Asegúrate de que cada elemento tenga un 'id' único
  }
}
