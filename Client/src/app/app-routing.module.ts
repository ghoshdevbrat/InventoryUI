import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { LeadsComponent } from './components/admin/leads/leads.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { StateMasterComponent } from './components/admin/masters/state-master/state-master.component';
import { BulkUserAddComponent } from './components/admin/users/bulk-user-add/bulk-user-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'add-user', component: BulkUserAddComponent }
    ]
  },
  {
    path: 'master', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'states', component: StateMasterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
