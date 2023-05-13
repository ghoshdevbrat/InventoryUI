import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { States } from 'src/app/_models/states';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit, AfterViewInit {
  states: States[];
  displayedColumns: string[] = ["S.No", "stateName", "stateCode", "gstStateCode"];
  dataSource = new MatTableDataSource<States>([]);
  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) { this.dataSource.paginator = value; }
  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) { this.dataSource.sort = value; }
  isLoaderResult = true;
  resultLength = 0

  constructor(private adminService: AdminService, private _liveAnnouncer: LiveAnnouncer) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.adminService.getStates().subscribe(states => {
      this.states = states;
      //console.log(this.states);
      this.dataSource = new MatTableDataSource<States>(this.states);
      this.resultLength = this.states.length;
    })
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

}
