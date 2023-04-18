import { createViewChild } from '@angular/compiler/src/core';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { merge } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { User } from 'src/app/_model/user';
import { AdminService } from 'src/app/_services/admin.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  users: User[];
  displayedColumns: string[] = ["icon", "employeeId", "firstName", "lastName", "email", "phoneNumber", "action"];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  isLoaderResult = true;
  resultLength = 0;  

  constructor(private adminService: AdminService,
    private matDialog: MatDialog) {    
    this.adminService.getUsers().subscribe(users => {      
      this.users = users;      
      this.dataSource = new MatTableDataSource<User>(this.users);  
      this.resultLength = this.users.length;     
      console.log(this.dataSource);
      console.log(this.users);
    });
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  getNext(event: PageEvent) {
    var offset = event.pageSize * event.pageIndex
  }

  sortData(event: Sort) {
  }

  getUsers() {
    this.adminService.getUsers().subscribe(users => this.users = users);
    console.log(this.users);
  }
}
