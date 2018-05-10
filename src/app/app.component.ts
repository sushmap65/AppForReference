import {
  Component,
  ViewEncapsulation,
  ErrorHandler
} from '@angular/core';
import { GlobalErrorHandler } from './error-handler';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from './app.service';
import { MissionService, LocalStorageService } from './services';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent {
  public name = 'LookingGlass';
  public message = 'pre-login';
  public type;
  public subscription: Subscription;

  constructor(
    public appState: AppState,
    private missionService: MissionService,
    private storageService: LocalStorageService
  ) {
    this.subscription = this.missionService
      .getMessage()
      .subscribe( (message) => {
        // this.storageService.set('userType', message.type);
        this.type = message.type;
        this.message = message.text;
      });
  }
}
