export const GoogleAppKey = 'AIzaSyB_APIgbjs7IUrqq3ULqj1ykxSY1w2sJIk';

export const enginAlertEventList = [
       'OilPressure',
       'EngineCoolentTemperature'
       // 'NormalSpeed'
     ];
export const safetyAlertList = [
  'SpeedAlert_OEMAMW_1518604049825'
     ];
export const securityAlertList = [
    'DeviceConnectedToVehicle',
    'DeviceRemovalFromVehicle'

     ];
export const enginAlertDIList = [
       'OilPressure',
       'EngineCoolentTemperature',
     ];
 export const batteryAlertEventList = [

    ];
export const batteryAlertDIList = [
       'InternalBatteryCharge',
       'ExternalBatteryVoltage'
    ];

export const serviceDueAlert = [
        'AMWServiceDue'
    ];
export const allAlertsList = [
      'OverSpeed',
      'LowInternalbattery',
      'NormalSpeed',
      'DeviceRemovalFromVehicle',
      'DeviceConnectedToVehicle',
      'LowVehicleBattery',
      'NormalVehicleBattery',
      'HighCoolantTemperature',
      'NormalCoolantTemperature',
      'LowOilPressure',
      'NormalOilPressure',
      'PowerON'
    ];
export const abnormalAlerts = [
      'OverSpeed',
      'LowInternalbattery',
      'DeviceRemovalFromVehicle',
      'LowVehicleBattery',
      'HighCoolantTemperature',
      'LowOilPressure'
];

export const EventValues = {
      OverSpeed: 'VehicleSpeedCAN',
      LowInternalbattery: 'InternalBatteryCharge',
      LowVehicleBattery: 'ExternalBatteryVoltage',
      HighCoolantTemperature: 'EngineCoolentTemperature',
      LowOilPressure: 'OilPressure'
};

export const insightsAlerts =[{
                "guid": "DeviceConnectedToVehicle",
                "name": "DeviceConnectedToVehicle",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "OverSpeed",
                "name": "OverSpeed",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "LowInternalbattery",
                "name": "LowInternalbattery",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "LowVehicleBattery",
                "name": "LowVehicleBattery",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "LowOilPressure",
                "name": "LowOilPressure",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "HighCoolantTemperature",
                "name": "HighCoolantTemperature",
                "function": "COUNT",
                "resolution": "1d"
            },
            {
                "guid": "DeviceRemovalFromVehicle",
                "name": "DeviceRemovalFromVehicle",
                "function": "COUNT",
                "resolution": "1d"
            },
        ];
        
export const rulesAlerts = [
      'AMWGeoFence_OEMAMW_1519211417582',
      'AMWGeoFence_OEMAMW_1519020818294',
      'AMWGeoFence_OEMAMW_1518783983722',
      'AMWTimefence_OEMAMW_1518856049777',
      'AMWTimefence_OEMAMW_1518847968724',
      'AMWTimefence_OEMAMW_1518771669667',
      'AMWServiceDue_OEMAMW_1519792944767'
];
export const rulesAlias = {
       GeoFenceRule1: 'AMWGeoFence_OEMAMW_1519211417582',
       GeoFenceRule2: 'AMWGeoFence_OEMAMW_1519020818294',
       GeoFenceRule3: 'AMWGeoFence_OEMAMW_1518783983722',
       TimeFenceRule1: 'AMWTimefence_OEMAMW_1518856049777',
       TimeFenceRule2: 'AMWTimefence_OEMAMW_1518847968724',
       TimeFenceRule3: 'AMWTimefence_OEMAMW_1518771669667',
       ServiceDueAlert: 'AMWServiceDue_OEMAMW_1519792944767'
};
export const platformAlerts = [
      'EngineCoolentTemperatureAlert_OEMAMW_1518604044230',
      'ExternalBatteryVoltageAlert_OEMAMW_1518604044428',
      'SpeedAlert_OEMAMW_1518604049825',
      'InternalBatteryChargeAlert_OEMAMW_1518604049612',
      'OilPressureAlert_OEMAMW_1518604039038',
]

export const rulesCategories = {
  AMWGeoFence: 'geoFence',
  AMWTimefence: 'timeFence',
  EngineCoolentTemperatureAlert: 'preferences',
  ExternalBatteryVoltageAlert: 'preferences',
  InternalBatteryChargeAlert: 'preferences',
  OilPressureAlert: 'preferences',
  SpeedAlert: 'preferences',
  AMWServiceDue :'serviceDue'
};

export const reportsDataItems = [
  // {lable: '', name: 'Geo Fence Alerts'},
  // {lable: '', name: 'Halt/Stop'},
  // {lable: '', name: 'Ignition ON/OFF'},
  // {lable: '', name: 'Over Speed'},
  // {lable: '', name: 'Security Alert'},
  // {lable: '', name: 'Insights'}
  {label: 'EngineRPM', name: 'Engine RPM'},
  {label: 'EngineHours', name: 'Engine Hours'},
  {label: 'OilPressure', name: 'Oil Pressure'}
];

export const mapIcons = {
  // red : '../assets/img/pin (12).png',
  red : '../assets/img/maps-and-flags (29).png',
  yellow : 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle-lv.png',
  blue: 'http:// labs.google.com/ridefinder/images/mm_20_blue',
  dealer: 'http://maps.google.com/mapfiles/kml/pal5/icon51l.png',
  dataitems: '../assets/img/delivery-truck (1).png',
  locationIcon:'../assets/img/truck (2).png',
};

export const ServiceDueConstants = {
  totalOdo: 'total_odo',
  lastServiceDate:'last_service_date',
  lastServiceOdo:'last_service_odo',
  nextServiceOdo:'next_service_odo',
  nextServiceDate:'next_service_date'
}

export const ServiceDueConstantsArray = [
  'total_odo',
  'last_service_date',
  'last_service_odo',
  'next_service_odo',
  'next_service_date'
]
export const GeoFenceItems =[
  'Long',
  'Lat',
  'radius',
  'OncePerDay'
]