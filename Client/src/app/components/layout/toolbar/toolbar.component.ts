import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/_models/_admin/loginUser';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // @Input() showSideNav: boolean;
  currentUser: LoginUser;
  showStatistics: boolean = false;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }
  sideNavToggle() {
    // this.showStatistics = !this.showStatistics;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  navigation(navigation: string) {
    this.router.navigateByUrl(`/${navigation}`);
  }
}
