import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { States } from 'src/app/_models/states';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';
import { CommonErrorStateMatcher } from 'src/app/_helpers/common-error-state-matcher';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  states: States[] = [];
  registerForm: FormGroup;
  validationError: string[] = [];
  customErrorStateMatcher: CommonErrorStateMatcher = new CommonErrorStateMatcher();

  constructor(private adminService: AdminService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) {
    this.adminService.getStates().subscribe(states => {
      this.states = states;
      // this.states = this.states.filter(option => option.stateName.startsWith("A"));
    });
  }

  ngOnInit(): void {
    this.initilizeForm();
    // this.states = [
    //   'Arunachal Pradesh',
    //   'Bihar',
    //   'Chattisgarh',
    //   'Chandigarh',
    //   'Delhi',
    //   'Goa',
    //   'Haryana',
    //   'Jammu & Kashmir',
    //   'Karnataka',
    //   'Lakshdweep',
    //   'Manipur',
    //   'Maharashtra',
    //   'Nagaland',
    //   'Orrisa',
    //   'Pondichery',
    //   'Rajasthan',
    //   'Sikkim',
    //   'Tamilnadu',
    //   'Utter Pradesh',
    //   'West Bangal'
    // ]
  }

  matchValue(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo]?.value ? null : { isMatching: true }
    }
  }

  initilizeForm() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z. ]*$')]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      state: [null, [Validators.required]],
      query: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  register() {
    console.log(this.registerForm.value)
    this.adminService.register(this.registerForm.value).subscribe(() => {
      this.toastr.success("Query Registered Successfully");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigateByUrl('/login');
    })
  }

  filterFunction(opt: string) {
    console.log(opt)
    this.states = this.states.filter(option => option.stateName.startsWith(opt));
    console.log(this.states);
    return this.states;
  }

  getFormControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string) {
    switch(controlName)
    {
      case "name":
      {
        if(errorType === "required") return "You must specify <string>Name</strong>";
        else if(errorType === "minlength") return "Name length must be at least of 3 characters";
        else if(errorType === "pattern") return "Name can't have digits or specical characters";
        else return "";
      }
      case "email":
      {
        if(errorType === "required") return "You must specify <string>Email</strong>";
        else if(errorType === "email") return "Invalid email like <strong>example@domain.com</strong>";
        else return "";
      }
      case "mobile":
      {
        if(errorType === "required") return "You must specify <string>Mobile Number</strong>";
        else if(errorType === "minlength") return "Name length must be at least of 10 characters";
        else if(errorType === "maxlength") return "Name length must be at max of 10 characters";
        else if(errorType === "patter") return "Invalid mobile number";
        else return "";
      }
      case "state":
      {
        if(errorType === "required") return "You must select <string>State</strong>";
        else return "";
      }
      case "query":
      {
        if(errorType === "required") return "You must enter something in <string>Querybox</strong>";
        else if(errorType === "email") return "Invalid email like <strong>example@domain.com</strong>";
        else return "";
      }
      default: return "";
    }
  }
}
