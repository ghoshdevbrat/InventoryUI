import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, tap, switchMap, startWith, map } from "rxjs/operators";
import { CommonErrorStateMatcher } from 'src/app/_helpers/common-error-state-matcher';
import { AddUser } from 'src/app/_models/_user/add-user';
import { States } from 'src/app/_models/states';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  states: States[] = [];
  registerForm: FormGroup;
  validationError: string[] = [];
  customErrorStateMatcher: CommonErrorStateMatcher = new CommonErrorStateMatcher();
  isCitiesLoading: boolean = false;
  userRoles: string[] = ['SuperAdmin', 'Admin', 'User'];

  constructor(private toastr: ToastrService,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.adminService.getStates().subscribe(states => {
      this.states = states;
      this.toastr.success("States received..");
      // this.states = this.states.filter(option => option.stateName.startsWith("A"));
    }, error => {
      console.log(error);
      this.toastr.error("Error received...")
    });
  }

  ngOnInit(): void {
    //this.adminService.getStates().subscribe(states => this.states = states);
    this.initiateForms();
  }

  initiateForms() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z. ]*$')]],
      lastName: [null, [Validators.nullValidator]],
      employeeId: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      cityId: [null, [Validators.required]],
      stateId: [null, [Validators.required]],
      role: [null, [Validators.required]]
    })
  }

  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo]?.value ? null : { isMatching: true }
    }
  }
  //returns the form control object based on the form control name
  getFormControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }

  register() {
    console.log(this.registerForm.value)
    this.adminService.register(this.registerForm.value).subscribe(() => {
      this.toastr.success("User Registered Successfully");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigateByUrl('/users');
    })
  }

  filterFunction(opt: string) {
    console.log(opt)
    this.states = this.states.filter(option => option.stateName.startsWith(opt));
    console.log(this.states);
    return this.states;
  }

  //returns the error message based on the given control name and errorType
  getErrorMessage(controlName: string, errorType: string): string {
    let errorMessage: string = "";
    switch (controlName) {
      case "city":
        {
          if (errorType == "required") errorMessage = "You must choose a <strong>City</strong>";
        }

      case "firstName":
        {
          if (errorType == "required") errorMessage = "You must enter a <strong>Check-In Date</strong>";
          if (errorType == "MinLength") errorMessage = "Length should be greater than 3 characters";
        }

      case "checkOut":
        {
          if (errorType == "required") errorMessage = "You must enter a <strong>Check-Out Date</strong>";
        }
    }

    return errorMessage;
  }

}
