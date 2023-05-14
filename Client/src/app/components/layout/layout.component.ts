import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/_models/_admin/loginUser';
import { Notifications } from 'src/app/_models/_user/notification';
import { AccountService } from 'src/app/_services/account.service';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;

  events: string[] = [];
  opened: boolean = true;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isLoading: boolean = false;

  showFiller = false;
  currentUser: LoginUser;
  showStatistics: boolean = false;
  showSideNav: boolean;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  availableBalance: number = 0;
  notifications: Notifications[] = [];

  constructor(private accountService: AccountService, private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private adminService: AdminService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.showSideNav = false;
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
    //this.getAvailableBalance();
    this.getNotification();
  }

  sideNavToggle() {
    this.showSideNav = !this.showSideNav;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

  navigation(navigation: string) {
    this.router.navigateByUrl(`/${navigation}`);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  // getAvailableBalance() {
  //   this.isLoading = true;
  //   this.adminService.getAvailableBalance(this.currentUser.username).subscribe(balance => {
  //     setTimeout(() => {
  //       if (balance) this.availableBalance = Number(balance);
  //       console.log(balance);
  //       this.isLoading = false;
  //     }, 1000);
  //   });
  // }

  getNotification() {

    this.notifications = [
      { id: 1, message: 'Transaction Id: 5372843 is successfull' },
      { id: 2, message: 'Transaction Id: 12345 is Pending' },
      { id: 3, message: 'You have received topup of 5 L' },
      { id: 4, message: 'Transaction Id: 5372842 is successfull' },
      { id: 5, message: 'Transaction Id: 5372848 is successfull' },
      { id: 6, message: 'You have received topup of 1 L' }
    ];
  }

  updateNotification(model: Notifications) {
    Swal.fire({
      title: 'Notification',
      text: `${model.message}`,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: 'blue'
    }).then(() => {
      this.notifications.forEach((element, index) => {
        if (element.id === model.id) this.notifications.splice(index, 1);
      })
    })
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
