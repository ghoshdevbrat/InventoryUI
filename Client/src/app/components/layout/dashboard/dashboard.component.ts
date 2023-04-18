import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Booking } from 'src/app/_models/_admin/booking';
import { AdminService } from 'src/app/_services/admin.service';
import { Chart } from 'angular-highcharts';
import { columnChartOption } from 'src/app/_charts/column-chart';
import { donutChartOption } from 'src/app/_charts/donut-chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardGridCols: number = 4;
  cardColspan: number = 2;
  bookings: Booking[] = [];
  // queryData: Querydto[] = [];
  isLoading: boolean = false;
  columnChart: Chart = new Chart(columnChartOption);
  donutChart: Chart = new Chart(donutChartOption);
  
  constructor(private mediaObserver: MediaObserver, private adminService:AdminService) { }

  ngOnInit(): void {
    // this.getQueries();
    this.mediaObserver.asObservable().subscribe((media: MediaChange[])=> {
      if(media.some(mediaChange => mediaChange.mqAlias == 'lt-sm')) {
        this.dashboardGridCols = 1;
        this.cardColspan = 1;

      } else if(media.some(mediaChange => mediaChange.mqAlias == 'lt-md')) {
        this.dashboardGridCols = 2;
        this.cardColspan = 2;
      } else {
        this.dashboardGridCols = 4;
        this.cardColspan = 2;
      }
    })
  }

  // getQueries() {
  //   this.adminService.getQueries().subscribe(queries => {
  //     setTimeout(() => {
  //       this.isLoading = true;
  //       this.queryData = queries;
  //       this.queryData = this.queryData.filter(x=> x.id < 9);
  //     }, 1000);
      
  //     this.isLoading = false;
  //   });
  // }
}
