import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Cities } from 'src/app/_model/cities';
import { States } from 'src/app/_models/states';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit, AfterViewInit {
  state: States = new States;
  cities: Cities[] = [];
  stateId: number;
  resultLength = 0;
  displayedColumns: string[] = ['srno', 'cityName', 'stateName'];
  dataSource = new MatTableDataSource<Cities>([]);
  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) { this.dataSource.paginator = value; }
  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) { this.dataSource.sort = value; }

  constructor(private activatedRoute: ActivatedRoute,
    private adminService: AdminService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.stateId = Number(this.activatedRoute.snapshot.paramMap.get('stateId'));
    this.adminService.getCityByStateId(this.stateId).subscribe(
      result => {
      this.state = result;
      this.cities = result.cities;
      // for(let i = 0; i < result.cities.length; i++) {
      //   this.cities.push(result.cities[i]);
      // }

      // this.cities = result.cities;
      // console.log(this.cities);
      this.dataSource = new MatTableDataSource<Cities>(this.cities);
      this.resultLength = this.cities.length;

      console.log(this.dataSource);
    })
  }
}
