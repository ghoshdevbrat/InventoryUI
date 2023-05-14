import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/_model/masters/products';
import { CrudProductService } from 'src/app/_services/crud-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editForm: NgForm;
  editProduct: Products;

  constructor(private router: Router,
    private toastr: ToastrService,
    private crudProductService: CrudProductService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Products) { 
      this.editProduct = data;
    }

  ngOnInit(): void {
  }

  saveProduct() {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'YES, Update IT!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateProduct()
      }
      else {
        this.toastr.info('result not saved')
      }
    })
  }

  updateProduct() {
    console.log(this.editProduct);
    this.crudProductService.updateProduct(this.editProduct).subscribe(
      data => {
        if (data.didError) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: data.message,
            timer: 3000,
            timerProgressBar: true
          });
        }
        else {
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: data.message,            
            timer: 3000,
            timerProgressBar: true
          });
        }
        this.dialogRef.close();
        this.router.navigateByUrl('masters/product-mastermasters');
      }
    )
  }

  close() {
    this.dialogRef.close(true);
  }

}
