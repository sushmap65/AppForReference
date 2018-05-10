import { Routes } from '@angular/router';
import { HomeComponent } from './components/home';
import { LoginComponent } from './components/login';
import { PreloginComponent } from './components/prelogin';
import { FleetComponent } from './components/fleet';
import { AssetDetailsComponent } from './components/assetDetails';
import { UtilizationComponent } from './components/utilization';
import { HealthComponent } from './components/health';
import { ServiceCostComponent } from './components/serviceCost';
import { DataAnalyticsComponent } from './components/dataAnalytics';
import { RulesComponent } from './components/rules';
import { EtaComponent } from './components/eta';
import { SosComponent } from './components/sos';
import { RouteReplayComponent } from './components/routeReplay';
import { AuthGuardService } from './services';
import { ReportsComponent } from './components/reports';


export const ROUTES: Routes = [
  { path: 'prelogin', component: PreloginComponent },
  { path: '', component: PreloginComponent },
  { path: 'login/:type', component: LoginComponent},
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'fleet', component: FleetComponent, canActivate: [AuthGuardService]},
  { path: 'asset/:id', component: AssetDetailsComponent, canActivate: [AuthGuardService]},
  { path: 'utilisation', component: UtilizationComponent, canActivate: [AuthGuardService]},
  { path: 'health', component: HealthComponent, canActivate: [AuthGuardService]},
  { path: 'service', component: ServiceCostComponent, canActivate: [AuthGuardService]},
  { path: 'data', component: DataAnalyticsComponent, canActivate: [AuthGuardService]},
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuardService]},
  { path: 'eta', component: EtaComponent , canActivate: [AuthGuardService]},
  { path: 'sos', component: SosComponent , canActivate: [AuthGuardService]},
  { path: 'routereplay', component: RouteReplayComponent , canActivate: [AuthGuardService]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuardService]}
];
