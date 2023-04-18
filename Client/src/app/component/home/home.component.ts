import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<User>;
  constructor(private toastr: ToastrService, 
              private accountService: AccountService) { }

  ngOnInit(): void {
    //this.showSuccess();
    this.currentUser$ = this.accountService.currentUser$;
  }

  showSuccess() {
    this.toastr.success('Hello World!', 'Toastr Fun!!');
  }

}
