import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");

  }

}
