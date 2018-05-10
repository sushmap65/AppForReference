import { Component, OnInit } from '@angular/core';
import { DashboardDataService, LocalStorageService } from '../../../services';
import { dataHelper } from '../../../data';
import {
    ENVIRONMENT,
    AppKeys,
    FleetData,
    RevenueData,
    AllEvents
  } from '../../../constant';
@Component({
  selector: 'fleet-board',
  providers: [ DashboardDataService ],
  templateUrl: './fleetBoard.component.html',
  styleUrls: ['./fleetBoard.component.css']
})

export class FleetBoardComponent implements OnInit {
    public fleetData;

    constructor(
        public dashboardDataService: DashboardDataService,
        public localStorageService: LocalStorageService
    ) { }

    public ngOnInit() {
        const userId = this.localStorageService.get('userId');
        let fleetApiUrl = FleetData + '?appId=' + AppKeys.main + '&user=' + userId;
        if ( ENVIRONMENT === 'local' ) {
            fleetApiUrl = FleetData;
                }
                    this.dashboardDataService
                    .getFleetData(fleetApiUrl)
                    .subscribe((data) => {
                            this.fleetData = data;
                    });

    }
}
