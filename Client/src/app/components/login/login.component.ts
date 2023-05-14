import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login } from 'src/app/_models/login';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: Login = {} as Login;
  currentUser$: Observable<User>;
  userDto!: User;
  hide: boolean = true;
  enabled: boolean = false;
  loginForm: NgForm;

  constructor(private toastr: ToastrService, 
              private accountService: AccountService, 
              private router: Router) { }
  
  ngOnInit(): void {  
    this.currentUser$ = this.accountService.currentUser$;
    // this.formValidation();
  }

  // formValidation(f: NgForm) {
  //   console.log(this.model);
  //   // f.valid ? this.toastr.success(JSON.stringify(this.model)) : this.toastr.error('invalid Username and Password');
  //   f.valid ? this.enabled = true : this.enabled = false;
  // }

  // formValidation() : boolean {
  //   if(this.model.username !== null && this.model.password !== null) return this.enabled == true;

  //   return this.enabled == false;
  // }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.userDto = JSON.parse(sessionStorage.getItem('user'));
      this.toastr.success('Welcome ' + this.userDto.username);
      this.router.navigateByUrl('/dashboard');
    })
  }
}