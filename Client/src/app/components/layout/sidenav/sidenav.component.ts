import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Menu, Menuitems } from 'src/app/_models/menuitems';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() isExpanded: boolean;
  @Input() isShowing: boolean;
  constructor(private menuItems: Menuitems,
      private accountService: AccountService,
      private router: Router) {}
  ngOnInit(): void {  
    
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
