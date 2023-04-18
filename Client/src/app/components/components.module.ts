import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LeadsComponent } from './admin/leads/leads.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './admin/users/users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { ContactComponent } from './contact/contact.component';
import { InputValidationComponent } from './_form/input-validation/input-validation.component';
import { DateInputComponent } from './_form/date-input/date-input.component';
import { AddUserComponent } from './admin/users/add-user/add-user.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    SidenavComponent,
    LeadsComponent,
    UserProfileComponent,
    UsersComponent,
    ToolbarComponent,
    ContactComponent,
    InputValidationComponent,
    DateInputComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    DashboardComponent,
    LayoutComponent,
    SidenavComponent,
    LeadsComponent,
    UserProfileComponent,
    FlexLayoutModule,
    ToolbarComponent,
    ContactComponent,
    InputValidationComponent,
    DateInputComponent,
    AddUserComponent
  ]
})
export class ComponentsModule { }
