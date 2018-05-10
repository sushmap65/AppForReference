import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  Input
} from '@angular/core';
import * as _ from 'lodash';

import {
  ENVIRONMENT,
  AppKeys,
  RevenueData,
  GetParent,
  GetAssetsByOrg,
  GetAssetByUser
} from '../../constant';



@Component({
  selector: 'fleet-result',
  templateUrl: './fleetResult.component.html',
  styleUrls: ['./fleetResult.component.css']
})

export class FleetResultComponent {
    public orgId: string;
    public assetsMapData;
    public maplist;
    public centerlist;
    public userId;

	@Input() public data: any;
  @Input() public alertData: any;
  @Output() public onShowAssetAlert: EventEmitter<any> = new EventEmitter();
  public yLabel = 'count';
  public currentId;
   
  public showAssetAlert(id) {
    this.currentId = id;
    const element = _.find(this.data, (o: any) => o.guid === id);
    element.status = !element.status;
    const emitEvent = {id};
    this.onShowAssetAlert.emit(emitEvent);
  }

  public toggleVisibility(id) {
    const element = _.find(this.data, (o: any) => o.guid === id);
    element.status = !element.status;
  }
}

