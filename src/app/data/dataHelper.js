let dataHelper;


const findAssets = [
      {
        "serialNumber": "VINHAR3DXSSH01897051",
        "name": "VINHAR3DXSSH01897051",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_f04f6cb9-0c8b-4da1-8d36-c111555e64fc",
        "imei": "11111111995646278",
        "location": "Marathahalli",
        "model": "#A#C#B884535299",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02524525",
        "name": "VINHAR3DXSSC02524525",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111751457927",
        "guid": "0_20eef876-d151-44da-891c-e49a9e81d44d",
        "location": "Marathahalli",
        "model": "#A#C#B640346948",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSP01882099",
        "name": "VINHAR3DXSSP01882099",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111448052771",
        "guid": "0_78121e4f-294b-4145-926a-76f92121ace7",
        "location": "Marathahalli",
        "model": "#A#C#B336941792",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSL01888137",
        "name": "VINHAR3DXSSL01888137",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111112295372152",
        "guid": "0_92328b35-bc4c-4143-a6cd-057eb4a49a71",
        "location": "Marathahalli",
        "model": "#A#C#B1184261173",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSK01887367",
        "name": "VINHAR3DXSSK01887367",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111756576185",
        "guid": "0_dc2ee383-e633-4a67-b36b-bb4b1a24fbb4",
        "location": "Marathahalli",
        "model": "#A#C#B645465206",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSA02521313",
        "name": "VINHAR3DXSSA02521313",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111113224889867",
        "guid": "0_6a5f9b0a-df1d-442c-8e99-efdb16166b6b",
        "location": "Marathahalli",
        "model": "#A#C#B2113778888",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSE01886097",
        "name": "VINHAR3DXSSE01886097",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111308600112",
        "guid": "0_e38630b1-cafc-43a1-9421-b6c8e415e255",
        "model": "#A#C#B197489133",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02525948",
        "name": "VINHAR3DXSSC02525948",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111824384546",
        "guid": "0_d8943b47-ae26-4390-aabd-8d4eb8de0284",
        "location": "Marathahalli",
        "model": "#A#C#B713273567",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC01887493",
        "name": "VINHAR3DXSSC01887493",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111355016759",
        "guid": "0_af9b6aa6-7e7b-40d1-abf5-425bc97d51e0",
        "location": "Marathahalli",
        "model": "#A#C#B243905780",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV02518572",
        "name": "VINHAR3DXSSV02518572",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111809875589",
        "guid": "0_4070ee09-2fb1-4675-bb3f-8cb2475f98c9",
        "location": "Marathahalli",
        "model": "#A#C#B698764610",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSL02524343",
        "name": "VINHAR3DXSSL02524343",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111505214030",
        "guid": "0_f7f4ab1b-f847-41cd-84b3-442caa56a977",
        "location": "Marathahalli",
        "model": "#A#C#B394103051",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSE02528492",
        "name": "VINHAR3DXSSE02528492",
        "guid": "0_7f437c84-052d-4dfd-aae0-9d618fa9d863",
        "imei": "11111113117885162",
        "model": "#A#C#B2006774183",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSA01892784",
        "name": "VINHAR3DXSSA01892784",
        "guid": "0_5a50d6c7-cc55-4135-a4c9-81a6957f13e2",
        "imei": "11111111984912614",
        "location": "Marathahalli",
        "model": "#A#C#B873801635",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSP02525239",
        "name": "VINHAR3DXSSP02525239",
        "guid": "0_b20be304-c21b-4e27-aa87-4c0aa1b28f45",
        "imei": "11111111754133993",
        "location": "Marathahalli",
        "model": "#A#C#B643023014",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSK01893122",
        "name": "VINHAR3DXSSK01893122",
        "guid": "0_24cfb0e5-497d-4ada-9605-56b250898352",
        "imei": "11111112423522564",
        "location": "Marathahalli",
        "model": "#A#C#B1312411585",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC01889476",
        "name": "VINHAR3DXSSC01889476",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_a244fd59-f04e-4843-b9ca-a3fbd178beb5",
        "imei": "11111111998935753",
        "location": "Marathahalli",
        "model": "#A#C#B887824774",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSA01890730",
        "name": "VINHAR3DXSSA01890730",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_9e92ca44-62aa-46d7-927a-e2122367b623",
        "imei": "11111111661717819",
        "location": "Marathahalli",
        "model": "#A#C#B550606840",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSE01884785",
        "name": "VINHAR3DXSSE01884785",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_7dd056d8-7145-4f60-a9bf-8c688842c8fe",
        "imei": "11111112684534248",
        "location": "Marathahalli",
        "model": "#A#C#B1573423269",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV01889477",
        "name": "VINHAR3DXSSV01889477",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_034ff46c-eb9e-447b-b45c-1aaf3ad2b4b6",
        "imei": "11111112790840563",
        "location": "Marathahalli",
        "model": "#A#C#B1679729584",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSK02520334",
        "name": "VINHAR3DXSSK02520334",
        "dealer": "PODDER & PODDER EQPT",
        "guid": "0_a83ac108-e1c7-492a-ae5e-480e78f60699",
        "imei": "11111112965156973",
        "location": "Marathahalli",
        "model": "#A#C#B1854045994",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSK01886476",
        "name": "VINHAR3DXSSK01886476",
        "guid": "0_e09bef8b-5363-4b92-890d-f20c564f62b1",
        "imei": "11111112775528684",
        "location": "Bangalore",
        "model": "#A#C#B1664417705",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02527201",
        "name": "VINHAR3DXSSC02527201",
        "guid": "0_6f1c7a20-62e3-4745-b969-fdf3b0c6804c",
        "imei": "11111112897504306",
        "location": "Marathahalli",
        "model": "#A#C#B1786393327",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSP02520753",
        "name": "VINHAR3DXSSP02520753",
        "guid": "0_f0ac7461-a660-4efe-854e-0691d8fb1ede",
        "imei": "11111112195368818",
        "location": "Marathahalli",
        "model": "#A#C#B1084257839",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV01894937",
        "name": "VINHAR3DXSSV01894937",
        "guid": "0_73d167f4-91a2-437a-969b-a529a3a040ff",
        "imei": "11111113083660680",
        "location": "Marathahalli",
        "model": "#A#C#B1972549701",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV01895490",
        "name": "VINHAR3DXSSV01895490",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111113197690994",
        "guid": "0_bb7fd350-c4d4-43bf-9f1a-da886b00718f",
        "location": "Marathahalli",
        "model": "#A#C#B2086580015",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02523021",
        "name": "VINHAR3DXSSC02523021",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111112442030405",
        "guid": "0_e136e04d-cd43-496e-8985-1f27d28b3686",
        "location": "Marathahalli",
        "model": "#A#C#B1330919426",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSJ02519556",
        "name": "VINHAR3DXSSJ02519556",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111111630165697",
        "guid": "0_16d18233-9271-4b9e-a0c2-3edefffec847",
        "location": "Marathahalli",
        "model": "#A#C#B519054718",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV02522914",
        "name": "VINHAR3DXSSV02522914",
        "dealer": "KRISHNA AUTOMOBILES",
        "imei": "11111112123418412",
        "guid": "0_4f77e842-6910-4104-be9c-0e2ff1866528",
        "location": "Marathahalli",
        "model": "#A#C#B1012307433",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSH02524344",
        "name": "VINHAR3DXSSH02524344",
        "guid": "0_5d6cb1b0-927d-481c-a289-4e2aa7e46536",
        "imei": "11111111307211127",
        "location": "Marathahalli",
        "model": "#A#C#B196100148",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSH02517703",
        "name": "VINHAR3DXSSH02517703",
        "guid": "0_8020c22b-4ebd-477f-9032-77a8f70c6636",
        "imei": "11111112015665897",
        "location": "Marathahalli",
        "model": "#A#C#B904554918",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSK02524528",
        "name": "VINHAR3DXSSK02524528",
        "guid": "0_2da8f319-21eb-4f78-a362-09fc122e5c79",
        "imei": "11111112997095835",
        "location": "Marathahalli",
        "model": "#A#C#B1885984856",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSST01886488",
        "name": "VINHAR3DXSST01886488",
        "guid": "0_0adb61fa-d254-45b1-adb1-cbe6afbb0e86",
        "imei": "11111111137266222",
        "location": "Marathahalli",
        "model": "#A#C#B26155243",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV01890757",
        "name": "VINHAR3DXSSV01890757",
        "guid": "0_2fe871ac-0896-41fb-a58f-5809742595c1",
        "imei": "11111112787244272",
        "model": "#A#C#B1676133293",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSL02524701",
        "name": "VINHAR3DXSSL02524701",
        "guid": "0_5b794fd9-7800-4bc9-a111-e6f9655d46eb",
        "imei": "11111113019894600",
        "location": "Marathahalli",
        "model": "#A#C#B1908783621",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC01879501",
        "name": "VINHAR3DXSSC01879501",
        "guid": "0_6876c111-23d4-4603-8c82-755ad7108b99",
        "imei": "11111112506756946",
        "location": "Marathahalli",
        "model": "#A#C#B1394684095",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02528033",
        "name": "VINHAR3DXSSC02528033",
        "guid": "0_5634531a-b95b-42dc-81ca-4c86c336a9dd",
        "imei": "11111113087268394",
        "location": "Marathahalli",
        "model": "#A#C#B569901559",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSP01886427",
        "name": "VINHAR3DXSSP01886427",
        "guid": "0_4bbbe3fd-21f5-4ed1-9052-c7317afc7560",
        "imei": "11111111175541081",
        "location": "Marathahalli",
        "model": "#A#C#B1884899196",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSA02525104",
        "name": "VINHAR3DXSSA02525104",
        "guid": "0_b59af34e-82d1-4037-8cc3-b887ec51af22",
        "imei": "11111111517136802",
        "location": "Marathahalli",
        "model": "#A#C#B406025823",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSE01878467",
        "name": "VINHAR3DXSSE01878467",
        "guid": "0_5e8ad980-395c-4143-82ed-b3fda1c1a2b1",
        "imei": "11111112361117939",
        "location": "Marathahalli",
        "model": "#A#C#B1250006960",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSP02527170",
        "name": "VINHAR3DXSSP02527170",
        "guid": "0_d7e88b70-76b4-480f-a1f2-128d310328d4",
        "imei": "11111112016926424",
        "location": "Marathahalli",
        "model": "#A#C#B905815445",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSST01895692",
        "name": "VINHAR3DXSST01895692",
        "guid": "0_76bfab77-7d97-4850-9164-c9f6b5b2614e",
        "imei": "11111111211792578",
        "location": "Marathahalli",
        "model": "#A#C#B100681599",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSV01889480",
        "name": "VINHAR3DXSSV01889480",
        "guid": "0_f27e0f1f-7bf6-4eed-8c79-73bb72d4cdd7",
        "imei": "11111111747500276",
        "location": "Marathahalli",
        "model": "#A#C#B636389297",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSST01880934",
        "name": "VINHAR3DXSST01880934",
        "guid": "0_6f94a3c0-ac38-42e9-8362-d7b787c4e045",
        "imei": "11111112709238693",
        "location": "Marathahalli",
        "model": "#A#C#B1598127714",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSST01882098",
        "name": "VINHAR3DXSST01882098",
        "guid": "0_98a05478-f24f-40d2-b7cb-d15848bb2cdb",
        "imei": "11111112133028575",
        "location": "Marathahalli",
        "model": "#A#C#B1021917596",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSA02521652",
        "name": "VINHAR3DXSSA02521652",
        "guid": "0_845e3160-70ff-4569-b10f-b65d819e41f2",
        "imei": "11111112210903216",
        "location": "Marathahalli",
        "model": "#A#C#B1099792237",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02523401",
        "name": "VINHAR3DXSSC02523401",
        "guid": "0_a7ca639e-274f-44d4-a10f-0d633a6de989",
        "imei": "11111112180919778",
        "location": "Marathahalli",
        "model": "#A#C#B1069808799",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSE01895494",
        "name": "VINHAR3DXSSE01895494",
        "guid": "0_5c00cd9e-315a-4997-a5af-2fee0b66064d",
        "imei": "11111111832256459",
        "location": "Marathahalli",
        "model": "#A#C#B721145480",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSH02517975",
        "name": "VINHAR3DXSSH02517975",
        "guid": "0_9516ac61-4435-4fe8-901e-891223a6e9a1",
        "imei": "11111112731858307",
        "location": "Marathahalli",
        "model": "#A#C#B1620747328",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC01886148",
        "name": "VINHAR3DXSSC01886148",
        "guid": "0_013c83e4-9c3a-4233-a76d-e49a3204a42f",
        "imei": "11111112769880802",
        "location": "Marathahalli",
        "model": "#A#C#B1658769823",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      },
      {
        "serialNumber": "VINHAR3DXSSC02525004",
        "name": "VINHAR3DXSSC02525004",
        "guid": "0_d68c54bb-9dd9-4c04-8a07-786aa4a3313b",
        "imei": "11111111947133269",
        "location": "Bannerghatta",
        "model": "#A#C#B836022290",
        "label": "asset",
        "activationDate": 1502531906000,
        "type": "Z3IT"
      }
    ];

const revenue = [{"State":"Apr","consumables":37705346,"listItems":11444937,"parts":4198293,"wearItems":25212768,"total":78561344},{"State":"May","consumables":31576061,"listItems":9979414,"parts":4688189,"wearItems":26086508,"total":72330172},{"State":"Jun","consumables":28713346,"listItems":8987384,"parts":3968769,"wearItems":29912424,"total":71581923},{"State":"Jul","consumables":30891059,"listItems":9922510,"parts":4478063,"wearItems":32395767,"total":77687399},{"State":"Aug","consumables":37499891,"listItems":9902269,"parts":6620573,"wearItems":28172768,"total":82195501},{"State":"Sep","consumables":31559938,"listItems":12517966,"parts":4490793,"wearItems":36630312,"total":85199009}];

const fleet = {
    "userName": "JCBindialookingglass@gmail.com",
    "timestamp": 1502668800000,
    "assetSoldCount": 41224,
    "assetInWarehouseCount": 866,
    "assetInTransitCount": 444
};

const allEvents =[["Health",89]];
const healthData = [["Low Fuel",23,"2017-03-25T12:52:08Z"],["Test Hello",6,"2017-03-25T12:52:08Z"],["Low Coolant Level On",68,"2017-03-25T12:52:08Z"]];
const assetDetails = {"serialNumber":"VINHAR3DXSSH01897051","name":"VINHAR3DXSSH01897051","dealer":"PODDER & PODDER EQPT","guid":"0_f04f6cb9-0c8b-4da1-8d36-c111555e64fc","imei":"11111111995646278","location":"Marathahalli","model":"#A#C#B884535299","label":"asset","activationDate":1502531906000,"type":"Z3IT"};
const healthIssue = {"serialNumber":"VINHAR3DXSSH01897051","name":"VINHAR3DXSSH01897051","dealer":"PODDER & PODDER EQPT","guid":"0_f04f6cb9-0c8b-4da1-8d36-c111555e64fc","imei":"11111111995646278","location":"Marathahalli","model":"#A#C#B884535299","label":"asset","activationDate":1502531906000,"type":"Z3IT","status":true,"alerts":[["Health",1299]]};
const assetStatus = {"dataItem":[{"name":"Last_Updated_Timestamp","time":"2017-09-13T04:25:49.000Z","val":1505276749000},{"name":"FuelLevel","time":"2017-09-13T04:25:49.000Z","val":110},{"name":"GPSFix","time":"2017-09-13T04:25:49.000Z","val":true},{"name":"signalstrength","time":"2017-09-13T04:25:49.000Z","val":25},{"name":"Altitude","time":"2017-09-13T04:25:49.000Z","val":111.2},{"name":"FW_Version_Number","time":"2017-09-13T04:25:49.000Z","val":"09.01.02"},{"name":"SerialNumber","time":"2017-09-13T04:25:49.000Z","val":"VINHAR3DXSSL01888137"},{"name":"Engine Temperature","time":"2017-09-13T04:25:49.000Z","val":50,"color":"grey","type":"°C"},{"name":"Hour","time":"2017-09-13T04:25:49.000Z","val":3608.9},{"name":"EngineRunningBand7","time":"2017-09-13T03:40:30.000Z","val":0},{"name":"External Battery Voltage","time":"2017-09-13T04:25:49.000Z","val":14.2,"color":"grey","type":"Volt"},{"name":"Internal Battery Charge","time":"2017-09-13T04:25:49.000Z","val":97,"color":"grey","type":"%"},{"name":"EngineRunningBand1","time":"2017-09-13T03:40:30.000Z","val":2},{"name":"EngineRunningBand2","time":"2017-09-13T03:40:30.000Z","val":50},{"name":"EngineRunningBand3","time":"2017-09-13T03:40:30.000Z","val":243},{"name":"EngineRunningBand4","time":"2017-09-13T03:40:30.000Z","val":32},{"name":"EngineRunningBand5","time":"2017-09-13T03:40:30.000Z","val":24},{"name":"EngineRunningBand6","time":"2017-09-13T03:40:30.000Z","val":34},{"name":"Latitude","time":"2017-09-13T04:25:49.000Z","val":24.01972222222222},{"name":"Longitude","time":"2017-09-13T04:25:49.000Z","val":87.26}],"dataEvent":{"result":[{"time":"2017-09-06T06:27:36.000Z","name":"Low Fuel","type":100,"status":true,"priority":1,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1504679256000|Latitude:2400.99N|Longitude:08715.72E|Altitude:00109.9|Hour:03575.8|EngineTemperature:049|ExternalBatteryVoltage:14.2|InternalBatteryCharge:090|FuelLevel:015|signalstrength:25|GPSFix:true|name:019|status:true|IGNITION_ON:true|ENGINE_ON:true"},{"time":"2017-09-13T04:25:49.000Z","name":"ENGINE_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505276749000|Latitude:2400.71N|Longitude:08715.36E|Altitude:00111.2|Hour:03608.9|EngineTemperature:050|ExternalBatteryVoltage:14.2|InternalBatteryCharge:097|FuelLevel:110|signalstrength:25|GPSFix:true|name:009|status:true|IGNITION_ON:true|ENGINE_ON:true"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"TestDAta_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"TEST_One","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"},{"time":"2017-09-13T03:03:26.000Z","name":"IGNITION_ON","type":100,"status":true,"priority":3,"description":"FW_Version_Number:09.01.02|SerialNumber:VINHAR3DXSSL01888137|Last_Updated_Timestamp:1505271806000|Latitude:2400.86N|Longitude:08715.39E|Altitude:00104.7|Hour:03608.0|EngineTemperature:043|ExternalBatteryVoltage:13.8|InternalBatteryCharge:100|FuelLevel:110|signalstrength:18|GPSFix:true|name:006|status:true|IGNITION_ON:true|ENGINE_ON:false"}],"typeArray":[{"name":"TESTEVENT44","guid":"0_08f1dccd-aac1-4e93-ad28-b7fdae3b1038"},{"name":"EVENTTEST","guid":"0_1e17e9b9-ca32-4671-a452-5889c4c52020"},{"name":"LOW_FUEL","guid":"0_f2402071-82c5-452b-9e30-d363107d52ec"},{"name":"OVERLOAD","guid":"0_4cc552e9-84a9-4379-9578-911a8eb7c1ac"},{"name":"EXTERNAL_BATTERY_REMOVED","guid":"0_95c1df0d-4d2d-4f34-8bb6-4f867dc8e464"},{"name":"ACCELEROMETER_TATUS_AT_OVER_THRESHOLD","guid":"0_6589ce90-c55e-4d1d-9c88-485f5d38c243"},{"name":"MACHINE_BATTERY_HIGH","guid":"0_abcf558e-b1dd-45e8-82bb-a614826d60c8"},{"name":"LOW_ENGINE_OIL_LEVEL","category":101,"guid":"0_b92966f3-6c34-4999-a3cd-177da660effd"},{"name":"HIGH_HYDRAULIC_OIL_TEMP","guid":"0_42b83d10-8349-482e-b3e2-4693f3389e0d"},{"name":"HELLO","guid":"0_14f3558f-9cb2-405c-aa6c-4230d06baaeb"},{"name":"LOW_BRAKE_AIR_PRESSURE","guid":"0_acc16d98-b99f-448f-a605-82cf23d036b1"},{"name":"CLOGGED_HYDRAULIC_OIL_FILTER","guid":"0_0ce8fd1a-d59b-4c83-9546-ed0da47cc963"},{"name":"LOW_COOLANT_LEVEL","guid":"0_a652bbc7-2f5c-44e0-9d34-d7e666193242"},{"name":"TRANSMISSION_OIL_PRESSURE","guid":"0_737d2934-15f9-4f4b-a2fa-cfaf45855d77"},{"name":"HIGH_TRANSMISSION_OIL_TEMPERATURE","guid":"0_aa72fe0f-9fb4-45e4-ba3a-793b94fb212e"},{"name":"BLOCKED_AIR_FILTER","guid":"0_c48b6a13-f048-4437-a9d2-5015586959c8"},{"name":"WATER_IN_FUEL","guid":"0_bf7d587a-7943-408e-8f8f-8c322e232341"},{"name":"HIGH_COOLANT_TEMPERATURE","guid":"0_8273f94c-0397-4d03-bce7-75c2eaf629ca"},{"name":"LOW_ENGINE_OIL_PRESSURE","category":101,"guid":"0_1d59001c-5231-4af6-9b26-913b689b0cc5"},{"name":"ENGINE_ON","category":100,"guid":"0_2ba086ae-7f56-4e53-9a3c-4cbfe8bc8c19"},{"name":"MACHINE BATTERY NOT CHARGING","guid":"0_2d648507-61bd-449f-947b-8743055d351f"},{"name":"MACHINE_BATTERY_LOW","guid":"0_9cd7396f-beae-48cc-82eb-3999a05627d9"},{"name":"IGNITION_ON","category":100,"guid":"0_f6269193-e8ad-4434-bf01-31f2d33b3b69"}]}};
const orgById = [
  {
    "delearName": "KRISHNA AUTOMOBILES",
    "delearEmailId": "KRISHNA_AUTOMOBILES@gmail.com",
    "mobile": "+91-9949648754",
    "name": "KRISHNA AUTOMOBILES",
    "guid": "0_39e59d4e-7567-4ff7-bab5-68ad6a534ffb",
    "location": "Bangalore",
    "type": "DealerOrg",
    "bootStrapKey": "Ig5ndTIx+DxEdofJbDrrvg=="
  }
];

const utilizationChartData = [["11 Sep 17",12],["26 Sep 17",19]];
dataHelper = {
  findAssets,
  allEvents,
  revenue,
  fleet,
  healthData,
  assetDetails,
  healthIssue,
  assetStatus,
  orgById,
  utilizationChartData
};
export { dataHelper };