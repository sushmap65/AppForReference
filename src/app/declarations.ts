import { AppComponent } from './app.component';
import { LoginComponent } from './components/login';
import { PreloginComponent } from './components/prelogin';
import { HomeComponent } from './components/home';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { LeftnavComponent } from './components/leftnav';
import { MapComponent } from './components/map';
import { MobileNavComponent } from './components/mobileNav';

import {
  DashboardComponent,
  FleetBoardComponent,
  ActiveAlertsComponent,
  MytaskComponent,
  RevenueGuideComponent,
  UpcomingServiceComponent,
  ServiceRealizationComponent,
  MttrComponent,
  SystemAlertsComponent,
  ActiveAlertEventComponent
} from './components/dashboard';

import {
  DirectionsMapDirective
} from './map';

import {
  BarChartComponent,
  GroupBarChartComponent,
  LineChartComponent,
  DonutChartComponent,
  StackedBarChartComponent
} from './components/chart';

import { FleetComponent } from './components/fleet';
import { FleetResultComponent } from './components/fleetResult';
import { AssetDetailsComponent } from './components/assetDetails';
import { UtilizationComponent } from './components/utilization';
import { HealthComponent } from './components/health';
import { ServiceCostComponent } from './components/serviceCost';
import { DataAnalyticsComponent } from './components/dataAnalytics';
import { RulesComponent } from './components/rules';
import { EtaComponent } from './components/eta';
import { SosComponent } from './components/sos';
import { RouteReplayComponent } from './components/routeReplay';
import { ReportsComponent } from './components/reports';
import { LoaderComponent } from './components/loader';

export const declarations = [
  AppComponent,
  LoginComponent,
  PreloginComponent,
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  LeftnavComponent,
  MapComponent,
  BarChartComponent,
  StackedBarChartComponent,
  GroupBarChartComponent,
  LineChartComponent,
  DonutChartComponent,
  DashboardComponent,
  FleetBoardComponent,
  ActiveAlertsComponent,
  SystemAlertsComponent,
  ActiveAlertEventComponent,
  MytaskComponent,
  RevenueGuideComponent,
  UpcomingServiceComponent,
  ServiceRealizationComponent,
  MttrComponent,
  FleetComponent,
  FleetResultComponent,
  AssetDetailsComponent,
  UtilizationComponent,
  HealthComponent,
  ServiceCostComponent,
  MobileNavComponent,
  DataAnalyticsComponent,
  RulesComponent,
  EtaComponent,
  SosComponent,
  RouteReplayComponent,
  ReportsComponent,
  DirectionsMapDirective,
  LoaderComponent
];
