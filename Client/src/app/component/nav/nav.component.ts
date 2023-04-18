import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { Usp } from '_model/usp';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  services: Usp[] = [];
  currentUser$: Observable<User>;
  userDto: User = {} as User;
  constructor(private accountService: AccountService,
             private router: Router) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(user => this.userDto = user);
    this.services = [
      { 
        //icon: 'https://portal2.paybingo.in/assets/menuicons/ic_aeps.png',
        icon: 'ic_aeps.png',
        serviceName: 'Aadhaar Enabled Payment System', 
        serviceDescription: 'Cash withdrawal using Aadhaar Authentication'
      },
      { 
        //icon: 'https://www.bharatbillpay.com/images/slider/slider01.jpg',
        icon: 'bbps_org.png',
        serviceName: 'Bharat Bill Payment System', 
        serviceDescription: 'Utility Bill Payments using BBPS'
      },
      { 
        //icon: 'https://portal2.paybingo.in/assets/menuicons/ic_money.png',
        icon: 'ic_money.png',
        serviceName: 'Domestic Money Transfer', 
        serviceDescription: 'Send money to any bank account across India using Mobile Number'
      },
      { 
        icon: 'indo-nepal.png',
        serviceName: 'Indo-Nepal Money Transfer', 
        serviceDescription: 'Send money to your friends and Family in Nepal'
      },
      { 
        icon: 'ic_hotel.png',
        serviceName: 'Hotel Booking', 
        serviceDescription: 'Booking hotel in your destination city across India'
      },
      { 
        icon: 'ic_plane.png',
        serviceName: 'Flight Booking', 
        serviceDescription: 'Booking any Domestic Flight'
      },
      { 
        icon: 'ic-train.png',
        serviceName: 'Train Ticket Booking', 
        serviceDescription: 'Book train ticket (IRCTC)'
      }
    ]
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }
}
