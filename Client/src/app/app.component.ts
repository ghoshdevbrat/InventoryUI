import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser$: Observable<User>;
  constructor(public accountService: AccountService) {
    this.currentUser$ = this.accountService.currentUser$;
  }
  title = 'PaySpotHome';
}
