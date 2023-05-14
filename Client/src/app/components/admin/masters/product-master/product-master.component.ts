import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/_model/masters/products';
import { CrudProductService } from 'src/app/_services/crud-product.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit, AfterViewInit {
  products: Products[];
  displayedColumns: string[] = ["icon", "productName", "description", "isActive", "isDeleted", "edit", "delete"];
  dataSource = new MatTableDataSource<Products>([]);
  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) { this.dataSource.paginator = value; }
  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) { this.dataSource.sort = value; }
  isLoaderResult = true;
  resultLength = 0
  editProduct: Products;

  constructor(private crudProductService: CrudProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private matDialog: MatDialog,
    private toastr: ToastrService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Products>([]);
    this.crudProductService.getProducts().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Products>(this.products);
      this.resultLength = this.products.length;
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog() {
    debugger
    const dialogRef = this.matDialog.open(AddProductComponent, {
      width: '800px',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  updateProduct(e, element): void {
    this.editProduct = element;
    const dialogRef = this.matDialog.open(EditProductComponent, {
      width: '800px',
      disableClose: true,
      data: this.editProduct
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteProduct(e, element): void {
    this.crudProductService.deleteProduct(element.productId).subscribe(() => {
      this.toastr.success("Delete Product Successfully");
      this.ngOnInit();
    })
  }

  getProducts() {
    this.crudProductService.getProducts().subscribe(data => {
      this.products = data;
      this.dataSource = new MatTableDataSource<Products>(this.products);
      this.resultLength = this.products.length;
    });
  }

}
