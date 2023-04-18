import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Querydto } from 'src/app/_models/querydto';
import { AdminService } from 'src/app/_services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'state', 'query', 'createdOn', 'pendingStatus'];
  // dataSource = new MatTableDataSource([]);
  queries: Querydto[] = [];
  totalCount = 0;
  isLoading: boolean;
  constructor(private adminService: AdminService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.isLoading = false;
    this.getQueries();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    // this.isLoading = false;
    // this.getQueries();
    // this.dataSource.paginator = this.paginator;
  }

  getQueries() {
    this.isLoading = true;
    this.adminService.getQueries().subscribe(queries => {
      // setTimeout(() => {
      //   this.totalCount = queries.length;
      //   this.queries = queries;
      //   this.isLoading = false;
      // }, 3000);
      this.queries = queries;
      this.isLoading = false;
      // this.dataSource = new MatTableDataSource(queries); 
    });
    
  }

  deleteQuery(model: Querydto) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: 'blue',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.adminService.delteQuery(model).subscribe(response => {
          this.toastr.success('Updates Successfully');
          Swal.fire(
            'Deleted!',
            'Record has been deleted.',
            'success'
          )
        });
        // this.getQueries();
        this.queries.forEach((element, index) => {
          if(element.id === model.id ) this.queries.splice(index, 1);
        })
      }
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   )
      // }
    })
  }

  confirmBox() {
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
