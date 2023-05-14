import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Products } from 'src/app/_model/masters/products';
import { CrudProductService } from 'src/app/_services/crud-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  products: Products[];

  constructor(private formBuilder: FormBuilder,
    private crudProductService: CrudProductService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private router: Router) { }

  ngOnInit(): void {
    this.initilizeForm();
  }

  initilizeForm() {
    this.addProductForm = this.formBuilder.group({
      productName: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  saveProduct() {
    this.crudProductService.saveProduct(this.addProductForm.value.productName, this.addProductForm.value.description).subscribe(
      data => {
        if (data.didError) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,
            footer: '<a href="">Why do I have this issue?</a>'
          });
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: data.message            
          })          
        }
        this.dialogRef.close();
        this.router.navigateByUrl('masters/product-master');
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
