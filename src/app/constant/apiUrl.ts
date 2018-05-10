let FleetData = '/lg/script/getFleetData';
let RevenueData = '/lg/script/getRevenueData';
let PrivateLogin = '/lg/login/private';
let FindAsset = '/lg/asset/get';
let AssetStatus = '/lg/ts/asset/status';
let AllEvents = '/lg/ts/events/aggregate';
let GetParent = '/lg/account/getParent';
let GetAssetsByOrg = '/lg/GetAssetsByOrg';
let GetAssetByClass = '/lg/class/asset/get';
let GetOrgByAssetIdAndType = '/lg/user/org/type/get';
let GetEventHistory = '/lg/tsdata/read/history';
let GetHealthAlertByIds = '/lg/ts/asset/events/aggregate';
let GetAggregatedData = '/lg/ts/asset/dataitems/aggregate'
let GetActiveAlertsAll = '/lg/ts/asset/events/aggregate';
let GetUtilizationByAssetId = '/lg/ts/asset/dataitems';
let GetUtilizationBarChart = '/lg/ts/asset/events/utilization'
let GetAssetDIDetails = '/lg/ts/asset/dataitems';
let Mttr = '/lg/script/getDealerServicesData';
let UpcomingService = '/lg/script/getDealerServicesData';
let ServiceRealization = '/lg/script/getDealerServicesData';
let ServiceCost = '/lg/script/getAssetServiceCostData';
let LogOutApi = '/logout';
let RouteReplayLocation = "/lg/ts/asset/dataitems";
let RouteReplayStatus = "/lg/ts/asset/events";
let GetServiceInfo = '/lg/getServiceInfo';
let GetScriptConfigInfo = '/lg/GetScriptConfigInfo';
let ruleConfigUpdate = '/lg/asset/configurationitems';
let GetAssetByUser = '/lg/user/asset/get/';
let NearByDealers = '/lg/getNearByDealers';
let AllEventsReports = '/lg/ts/asset/events/';
//insight reports need to be changed when issue fixed in backend
//let InsightReport = 'https://18.194.76.150:3000/insightreport'
let InsightReport = '/lg/ts/asset/dataitem/insightreport';
let UtilizationReport = '/lg/ts/asset/events/utilization';
let TotalODO = '/lg/ts/asset/dataitems';

const GoogleDistanceApi = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
let GetUtilizationBarChart1= 'http://localhost:8087/utilizationbarchart1';

const ENVIRONMENT = process.env.ENV;

if ( ENVIRONMENT === 'local') {
    FleetData = 'http://localhost:8087/fleet';
    RevenueData = 'http://localhost:8087/revenue';
    PrivateLogin = 'http://localhost:8087/login';
    FindAsset = 'http://localhost:8087/findAssets';
    AssetStatus = 'http://localhost:8087/assetStatus';
    AllEvents = 'http://localhost:8087/allEvents';
    GetAssetByClass = 'http://localhost:8087/getAllAssets';
    GetParent = 'http://localhost:8087/getParent';
    GetAssetsByOrg = 'http://localhost:8087/getAssetsByOrg';
    GetOrgByAssetIdAndType = 'http://localhost:8087/getOrgByType';
    GetAssetDIDetails = 'http://localhost:8087/getAssetDIDetails'
    GetEventHistory = '';
    GetHealthAlertByIds = 'http://localhost:8087/healthIssue';
    GetActiveAlertsAll = 'http://localhost:8087/activealertsall';
    GetUtilizationByAssetId = 'http://localhost:8087/utilization';
    GetUtilizationBarChart = 'http://localhost:8087/utilizationbarchart';
    GetUtilizationBarChart1= 'http://localhost:8087/utilizationbarchart1';
    Mttr = 'http://localhost:8087/mttr';
    UpcomingService = 'http://localhost:8087/upcomingService';
    ServiceRealization = 'http://localhost:8087/serviceRealization';
    ServiceCost = 'http://localhost:8087/serviceCost';
    LogOutApi = 'http://localhost:8087/logout';
    GetServiceInfo = 'http://localhost:8087/getServiceInfo';
    GetScriptConfigInfo = 'http://localhost:8087/getScriptConfigInfo';
    RouteReplayLocation = 'http://localhost:8087/getRouteReplayLocation';
    RouteReplayStatus = 'http://localhost:8087/getRouteReplayStatus';
    GetAssetByUser = 'http://localhost:8087/getAssetByUser';
    NearByDealers = 'http://localhost:8087/getNearDealers';
    AllEventsReports = 'http://localhost:8087/allEventsReports';
    GetAggregatedData = 'http://localhost:8087/getAggregatedData';
    InsightReport = 'http://localhost:8087/insightReport';
    UtilizationReport = 'http://localhost:8087/utilizationReport';
    TotalODO = 'http://localhost:8087/totalOdo';
}

export { ENVIRONMENT };
export { FleetData };
export { RevenueData };
export { PrivateLogin };
export { FindAsset };
export { AssetStatus };
export { AllEvents };
export { GetAssetByClass };
export { GetOrgByAssetIdAndType };
export { GetEventHistory };
export { GetHealthAlertByIds };
export { GetUtilizationByAssetId };
export { Mttr };
export { UpcomingService };
export { ServiceRealization };
export { ServiceCost };
export { LogOutApi };
export { GetParent };
export { GetAssetsByOrg };
export { GetActiveAlertsAll };
export { GetServiceInfo };
export { GetScriptConfigInfo };
export { ruleConfigUpdate };
export { GetAssetDIDetails }
export { RouteReplayLocation };
export { RouteReplayStatus };
export { GetAssetByUser };
export { GoogleDistanceApi };
export { GetUtilizationBarChart };
export { NearByDealers };
export { AllEventsReports };
export { GetAggregatedData };
export { GetUtilizationBarChart1 };
export { InsightReport };
export { UtilizationReport };
export { TotalODO };