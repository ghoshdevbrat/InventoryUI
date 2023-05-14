import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoles } from 'src/app/_model/admin/app-roles';
import { RegisterUserModel } from 'src/app/_model/admin/register-user-model';
import { UserStatus } from 'src/app/_model/admin/user-status';
import { Cities } from 'src/app/_model/masters/cities';
import { States } from 'src/app/_models/states';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bulk-user-add',
  templateUrl: './bulk-user-add.component.html',
  styleUrls: ['./bulk-user-add.component.css']
})
export class BulkUserAddComponent implements OnInit {
  addUserForm: FormGroup;
  states: States[] = [];
  cities: Cities[] = [];
  roles: AppRoles[] = [];
  userStatus: UserStatus[] = [];
  registerUserModel: RegisterUserModel;
  panelOpenState = false;
  searchText: string;
  selectedStates: States[];

  constructor(private toastr: ToastrService,
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      model: new FormArray([])
    });

    this.addItem();

    this.getRoles();
    this.getUserStatus();
    this.addUserForm.valueChanges.subscribe(value => { console.log(value) });
    this.adminService.getStates().subscribe(states => {
      this.states = states;
      this.selectedStates = states;
    })
  }

  createUserForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.pattern('^[A-Za-z]*$')]],
      lastName: [null, [Validators.pattern('^[A-Za-z ]*$')]],
      employeeId: [null, [Validators.required]],
      phoneNumber: [null, [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      email: [null, [Validators.email, Validators.required]],
      stateId: [null, [Validators.required]],
      cityId: [null, [Validators.required]],
      appStatusId: [null, [Validators.required]],
      roleId: [null, [Validators.required]]
    });
  }

  deleteGroup(index: number) {
    Swal.fire({
      title: 'Do you want to delete form?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        const remove = (<FormArray>this.addUserForm.get('model') as FormArray);
        remove.removeAt(index)
      }
      else {
        this.toastr.info('result not saved')
      }
    })
  }

  addItem(): void {
    (<FormArray>(this.addUserForm.get('model') as FormArray)).push(this.createUserForm());
  }

  getUserStatus() {
    this.adminService.getUserStatus().subscribe(result => {
      this.userStatus = result;
    }, error => {

    })
  }

  getRoles() {
    this.adminService.getRoles().subscribe(result => {
      this.roles = result;
    }, error => {
      console.log(error);
    })
  }

  onSelectionchange(e) {
    console.log(e);
    this.adminService.getCityByStateId(e.value).subscribe(
      state => {
        console.log(state);
        this.cities = state.cities;
        console.log(`City: ${this.cities}`);
      },
      error => {
        console.log(error);
      });
  }

  saveUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: '',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Cancel`
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        this.addUser()
      }
      else {
        this.toastr.info('result not saved')
      }
    })
  }

  addUser() {
    this.adminService.addBulkUsers(this.addUserForm.value).subscribe(users => {
      this.toastr.success('User added  Successful');
      //this.dialogRef.close();
      this.addUserForm.reset();
      this.router.navigateByUrl('users');
    }, error => {
      this.toastr.error('Error in updating user' + error.error);
    })
  }

  goBack() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'All form data will be lost!',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      denyButtonText: `Cancel`
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/users');
      }
      else {
        this.toastr.info('result not saved')
      }
    })
  }

  close() {
    //this.dialogRef.close();
  }

  search(value: string) {
    let filter = value.toLowerCase();
    if (value == null) {
      return this.selectedStates;
    } else {
      this.selectedStates = [];
    }
    for (let i = 0; i < this.states.length; i++) {
      if (String(this.states[i].stateName).toLowerCase().indexOf(filter) >= 0) {
        this.selectedStates.push(this.states[i]);
      }
    }
    return this.selectedStates;
  }
}
