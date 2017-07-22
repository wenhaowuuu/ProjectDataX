//AS OF JULY 20TH, THE UPDATE HERE
//the migration is complete.
// TARGET: TO LEARN THE OSMNX TOOLBOX
// AUTOMATICALLY IDENTIFY AND GENERATE STREET NETWORK
// http://geoffboeing.com/

//POLYGON EDITING OPERATIONS:
//QUITE COOL HERE
//https://codeofsumit.github.io/leaflet.pm/

///1. SETUP AND BASEMAP

//1.1 SETUP BASEMAP
//SOME NOTES HERE
var map = L.map('map', {
  center: [15.162820, -87.509107],
  zoom: 6.5
});

var Style = 'dark';

L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);
//
// var schoolicon = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[15,24],
//       iconAnchor:[8,10],
//     });
//
// var schoolicon = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[8,10],
//       iconAnchor:[5,7],
//     });



//TESTING SOME TURF FUNCTIONALITY
//0720: SOMETHING IS WRONG WITH THE TURF FUCNTION
//GDHKKGHDKI GDLHGLDSHGK _FGSDGSG I DONT REALLY UNDERSTAND THE CAUSES
// OF THE PROBLEM
// var features;

// var bbox = turf.bbox(features);


// $ npm install @turf/intersect
// $ npm test

//EXAMPLE WITH DISTANCE OPERATION
// const distance= require('@turf/distance');
// var from = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [-75.343, 39.984]
//   }
// };
// var to = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "Point",
//     "coordinates": [-75.534, 39.123]
//   }
// };
// var units = "miles";
// var distance = distance(from, to, units);



//EXAMPLE WITH INTERSECT
// const intersect = require('@turf/intersect');
//
// var poly1 = turf.polygon([[
//   [-122.801742, 45.48565],
//   [-122.801742, 45.60491],
//   [-122.584762, 45.60491],
//   [-122.584762, 45.48565],
//   [-122.801742, 45.48565]
// ]]);
//
// var poly2 = turf.polygon([[
//   [-122.520217, 45.535693],
//   [-122.64038, 45.553967],
//   [-122.720031, 45.526554],
//   [-122.669906, 45.507309],
//   [-122.723464, 45.446643],
//   [-122.532577, 45.408574],
//   [-122.487258, 45.477466],
//   [-122.520217, 45.535693]
// ]]);
//
// var intersection = turf.intersect(poly1, poly2).addTo(map);

// intersection.addTo(map);





//1.2 SWITCH BASEMAPS
$('#dark').click(function(){
  $('#map0').hide();
  $('#map').show();
  Style = 'dark';
  L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#light').click(function(){
    $('#map0').hide();
    $('#map').show();
    Style = 'light';
    L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      subdomains: 'abcd'
    }).addTo(map);
});

//1.3 LOAD SATELLITE MAP
$('#satellite').click(function(){
  $('#map').hide();
  $('#map0').show();
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
  var map0 = new mapboxgl.Map({
      container: 'map0', // container id
      style: 'mapbox://styles/mapbox/satellite-v9', //stylesheet location
      center: [-88.509107, 15.162820], // starting position
      zoom: 6 // starting zoom
  });

  var editorData = $.ajax(
    {
      url:"https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson"
    }
  ).done(function(data){
          // console.log("downloadxxx");
          map0.on('load', function () {

            //REFERENCE ON LOADING ELEMENTS ON MAPBOX'S MAP
            // https://gist.github.com/danswick/339d00429ed5a201e0d7ef4fac648fa5
            // http://lyzidiamond.com/posts/external-geojson-mapbox
            // http://lyzidiamond.com/posts/external-geojson-mapbox

            //TESTING
            map0.addLayer({
                        'id': 'boundarys',
                        'type': 'fill',
                        'source': {
                        'type': 'geojson',
                              'data': {
                                        'type': 'Feature',
                                        'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': [[
                                                  [-90.583466, 10.571087],
                                                  [-90.583466, -10.333333],
                                                  [-70.589323, -10.333333],
                                                  [-70.589323, 10.571087]
                                                ]]
                                                }
                                        }
                                },
                          'layout': {},
                                'paint': {
                                    'fill-color': '#0000ff',
                                    'fill-opacity': 0.5
                                 }
                          });


            //add source
              map0.addSource(
                "myData",{
                  type:"geojson",
                  data:data
                }
              );

           //LOAD MUNICIPALITIES///////
            map0.addLayer({
                  'id': 'shapes',
                  'type': 'fill',
                  'source': "myData",
                  'layout': {},
                  'paint': {
                      'fill-color': '#00ffff',
                      'fill-opacity': 0.8
                  }
                });

          });
      });
  });


// 1.3 SWITCHING SACLES
    $('#Global').click(function(){
      map.setView([15.162820, -87.509107],2);
      // map0.setCenter([15.162820, -87.509107],2);
    });

    $('#Regional').click(function(){
      map.setView([15.162820, -87.509107],5);
      // map0.setCenter([15.162820, -87.509107],5);
    });

    $('#AOI').click(function(){
      map.setView([15.162820, -87.509107],6.5);
      // map0.setCenter([15.162820, -87.509107],6.5);
    });


// 2. CREATE VARIABLES
// 2.1 DATA SOURCE URLS
  var southamerica = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/south_america.geojson";
  var northtriangle = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/guatemala.geojson";


  var Guatemala = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/guatemala.geojson?token=AWa3ujj3WJDeoABdZInPIhnTSYkS3B5Kks5Zd5vrwA%3D%3D";
  var Honduras = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/Honduras.geojson?token=AWa3uvKtwxzSEa1dGdu8oqlVEMSPY5alks5Zd5xEwA%3D%3D";
  var Salvador = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/SalVardo.geojson?token=AWa3us5Y4fPzPzYtApgHmkKpUFki0Dekks5Zd5w0wA%3D%3D";


  var department = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/dept_joinbase.geojson?token=AWa3ulA7r0EP6hvXnzERqDWlb0C1DWkeks5Zd5HUwA%3D%3D";



  var municipality = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";
  var municipality1 = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";

  //THE CLEANED DATASET
  var muni_clean = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/nt_muni_joined_clean.geojson";


  var healthcenter = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/healthcenters_segeplan_2010.geojson?token=AWa3uu4HC5P_wTYFCaksa2u2C8t4hRV5ks5Zd5GcwA%3D%3D";
  var highschool = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/High_Schools_in_Triangulo_Norte.geojson";
  // var roadsall = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/infra_redvial_osm_2016_gt_2.geojson?token=AWa3umrkbZpL2VZXCIIaJkR15o-4Jo_Aks5ZdmxCwA%3D%3D";

  var majorroads = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/major_infra_redvial_osm_2016.geojson?token=AWa3uoVS2zMSU2MIwc0kLP3maAAJAesBks5Zdm5JwA%3D%3D";
  var secondaryroads = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/Secondary_infra_redvial_osm_2016.geojson?token=AWa3ume5fwG9rH-l740D9NlioFIxbpV4ks5Zd0LWwA%3D%3D";




// 2.2 VARIABLES
  var SalVardoB;
  var HondurasB;
  var GuatemalaB;
  var NationsB = [ ];

  var DepartmentsB = [ ];

  var PrimaryRoads = [ ];
  var SecondaryRoads = [ ];
  var Hospitals = [ ];
  var Schools = [ ];

  var layerselected = [];
  var namelist = [];
  var namelistvalue = [];
  var order = 0;
  var list = ' ';
  var blank = '  ';

  var slideNumber = 0;
  var parsedData;
  var parsedData2;
  var parsedData3;
  var parsedData4;
  var filterFunction;

  //DEFINE THE IE SCORING FACTORS FOR THE RADAR CHART
  var RD_1ST;
  var RD_2ND;
  var RD_3RD;



  //1. TOTAL LENGTH
  var RD_LENGTH;
  //2. DENSITY
  var RD_DENSITY;
  //3. URBAN ROAD LENGTH
  var RD_URBAN;

  //4. RURAL ROAD LENGTH
  var RD_RURAL;

  //5. SECONDARY RD PER 1ST RD
  var RD_2ND_1ST = RD_2ND / RD_1ST;

  //6. TERTIARY RD PER 1ST RD
  var RD_3RD_1ST = RD_3RD / RD_1ST;


  //DEFINE THE FADING AND HIGHLIGHTING EFFECT WHEN CLICKED ON LAYERS
  var fadeout = {
    'opacity': 0.01,
  };

  // var highlight = {
  //   'color': '#0000FF',
  //   'weight': 2,
  //   'opacity': 0.8,
  // };

  var highlight = {
    // 'border-style': 'dotted',
    // 'border-width': '5px',
    // 'border-color': 'rgba(255, 255, 0, 0.9)',
    // 'weight': 2,
    // 'borderColor': 'yellow',
    // 'border': '5px solid yellow',
    'color':'#416FEA',
    'opacity': 0.2,

  };



//set PDF variables
var P_country = ' ';
var P_department = ' ';
var P_muni = ' ';
var P_pov = ' ';
var P_id = ' ';
var P_year = ' ';
var P_source = ' ';

var P_length = ' ';
var P_density = ' ';
var P_rd_urban = ' ';
var P_rd_rural = ' ';
var P_rd_1 = ' ';
var P_rd_2 = ' ';
var P_rd_3 = ' ';

var P_rd_21 = ' ';
var P_rd_31 = ' ';



//3. FUNCTIONS
// 3.1 WHEN THE LAYER IS CLICKED:
var numberofClicks = 0;
  var eachFeatureFunction = function(layer) {
     layer.on('click', function (event) {
       console.log(layer.feature);
       console.log(layer.feature.properties);
       //TO ADD THE RE-CLICK THEN DE-SELECT FUNCTION
       //you can't really do this because the number of times clicked is not stored with the layer itself.
       //come back to this later!
       numberofClicks = numberofClicks + 1;


       //YOU'D BETTER CLEAN THE HTML ELEMENT EVERY TIME YOU CLICK ON THE LAYER
       //reference from
       //https://stackoverflow.com/questions/24815851/how-to-clear-a-chart-from-a-canvas-so-that-hover-events-cannot-be-triggered

       $('#myChart1').remove();
       $('.chartsarea').append('<canvas class="charts" id="myChart1" width="300" height="300"></canvas>');
       console.log("replace1");


       $('#myChart2').remove();
       $('.chartsarea').append('<canvas class="charts" id="myChart2" width="300" height="200"></canvas>');
       console.log("replace2");


       //Click odd number of times - loading the shape, while
       //click even number of times - removing it.
      //  if (numberofClicks % 2 == 0){
      //    //1. change the selection style;
      //    layer.setStyle(myStyle);
      //    layer.setStyle(fadeout);
      //    //2. remove it from the layer selection list
      //    layerselected = layerselected.filter(function(item){
      //      return item !== layer
      //    })
      //
      //    //  arr = arr.filter(function(item) {
      //    //    return item !== value
      //    //  })
      //
      //    console.log(layerselected);
      //
      //    //3. remove the graph and text;
      //    map.removeLayer(myChart);
      //
      //    //4. remove it from the excel;
      //  }
       //
      //  else {


         //UPDATE THE EXCEL TABLE INFO TO BE DOWNLOADED
         // id="exceltitle"
         $('#exceltitle').text(layer.feature.properties.m_name);
         $('#X_ID').text(layer.feature.properties.id);
         $('#X_country').text(layer.feature.properties.country);
         $('#X_department').text(layer.feature.properties.d_name);
         $('#X_municipality').text(layer.feature.properties.m_name);
         $('#X_PovertyRate').text(layer.feature.properties.gen_pov);
        //  $('#X_department').text(layer.feature.properties.d_name);
         //UPDATE THE PDF INFO TO BE DOWNLOADED
         P_country = layer.feature.properties.country;
         P_department = layer.feature.properties.d_name;
         P_muni = layer.feature.properties.m_name;
         P_pov = layer.feature.properties.gen_pov;
         P_id = layer.feature.properties.id;
         P_year = layer.feature.properties.year;
         P_source = layer.feature.properties.source;

         P_length = layer.feature.properties.rd_length;
         P_density = layer.feature.properties.rd_density;
         P_rd_urban = layer.feature.properties.rd_urban;
         P_rd_rural = layer.feature.properties.rd_rural;
         P_rd_1 = layer.feature.properties.rd_major;
         P_rd_2 = layer.feature.properties.rd_second;
         P_rd_3 = layer.feature.properties.rd_tertiar;
         P_rd_21 = layer.feature.properties.rd_second / layer.feature.properties.rd_major;
         P_rd_31 = layer.feature.properties.rd_tertiar / layer.feature.properties.rd_major;


        //  $('#exceltitle').text(layer.feature.properties.m_name);
         //ZOOM TO THE SELECTED MUNICIPALITY
         map.fitBounds(layer.getBounds(),{
                    padding: [80,80]
                  });
         order = order + 1;
         console.log(order);

       //PUSH INTO THE LAYER SELECTION GROUP
       layerselected.push(layer);
       console.log(layerselected);
       namelist.push(layer.feature.properties.m_name);
       console.log(namelist);

       _.each(namelist,function(name){
         list = order + '.' + name;
       })

       $('#selection').append(blank + blank + blank + list + " ");

       // $('#selection').text(namelist);

       // <div id="results" style="display: none;">
      //  document.getElementById("results").style.display = "inline";


        //  $('#LENGTH').text(layer.feature.properties.m_name);
        //  $('#POP').text(layer.feature.properties.d_name);
        //  $('#30PCT').text(layer.feature.properties.gen_pov);
        //  $('#60PCT').text(layer.feature.properties.id);
        //  $('#90PCT').text(layer.feature.properties.year);

         //HIGHLIGHT THE MAP CLICKED

         layerMappedPolygons.setStyle(fadeout);


         layer.setStyle(highlight);



         //LINK DATA WITH THE GRAPH
         if(myChart!=null){
          //  myChart.destroy();
          //  $('#myChart2').remove();
          //  $('.chartsarea').append('<canvas class="charts" id="myChart2" width="300" height="200"></canvas>');
          //  console.log("replace2");
         }
         else {
           var ctx2 = document.getElementById("myChart2").getContext('2d');

           //Fill the background
          //  Chart.plugins.register({
          //    beforeDraw: function(myChart) {
          //     //  var ctx = myChart.chart.ctx2;
          //      ctx2.fillStyle = 'rgba(255,255,255,0.05)';
          //      ctx2.fillRect(0, 0, myChart.chart.width, myChart.chart.height);
          //    }
          //  });

          // ctx2.style.backgroundColor = 'rgba(255,0,0,1)';
          // ctx2.fillStyle = "white";
          // ctx2.fill = 'rgba(255, 0, 255, 0.5)';
           var myChart = new Chart(ctx2, {
               type: 'bar',
               data: {
                   labels: [layer.feature.properties.m_name, "Average", "UN"],
                   datasets: [{
                       label: 'Poverty',
                       data: [layer.feature.properties.gen_pov, 50, 30],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.5)',
                           'rgba(54, 162, 235, 0.5)',
                           'rgba(255, 206, 86, 0.5)',

                       ],
                       borderColor: [
                           'rgba(255,99,132,1)',
                           'rgba(54, 162, 235, 1)',
                           'rgba(255, 206, 86, 1)',
                       ],
                       borderWidth: 1
                   }]
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero:true
                               }
                             }]
                           }
                         }
               });
             }
                      P_country = layer.feature.properties.country;
                      P_department = layer.feature.properties.d_name;
                      P_muni = layer.feature.properties.m_name;
                      P_pov = layer.feature.properties.gen_pov;
                      P_id = layer.feature.properties.id;
                      P_year = layer.feature.properties.year;
                      P_source = layer.feature.properties.source;

                      P_length = layer.feature.properties.rd_length;
                      P_density = layer.feature.properties.rd_density;
                      P_rd_urban = layer.feature.properties.rd_urban;
                      P_rd_rural = layer.feature.properties.rd_rural;
                      P_rd_1 = layer.feature.properties.rd_major;
                      P_rd_2 = layer.feature.properties.rd_second;
                      P_rd_3 = layer.feature.properties.rd_tertiar;
                      P_rd_21 = layer.feature.properties.rd_second / layer.feature.properties.rd_major;
                      P_rd_31 = layer.feature.properties.rd_tertiar / layer.feature.properties.rd_major;
             //LOAD THE RADAR CHART
            //  REFERENCE
            //  https://canvasjs.com/docs/charts/chart-types/html5-stacked-bar-chart/
            //
             if (radarChart!=null){
               //USING MAP REMOVE LAYER DOES NOT WORK ON CHARTS!
               radarChart.destroy();
               console.log("destroyed2");
             }
             else {
               var marksCanvas = document.getElementById("myChart1");
               var ctx1 = marksCanvas.getContext('2d');
               //Fill the background
              //  Chart.plugins.register({
              //    beforeDraw: function(myChart) {
              //     //  var ctx = myChart.chart.ctx2;
              //      ctx1.fillStyle = 'rgba(255,255,255,0.05)';
              //      ctx1.fillRect(0, 0, myChart.chart.width, myChart.chart.height);
              //    }
              //  });

               var marksData = {
                 labels: ["Total Length", "Density", "Urban Road", "Rural Road", "Secondary/Major", "Tertiary/Major"],
                 datasets: [{
                   label: P_muni,
                   backgroundColor: "rgba(255,120,35,0.5)",
                   data: [(P_length - 46775.31635) / 76377.96091, (P_density - 244.1640059) / 190.074839, (P_rd_urban - 7936.693108) / 14941.34066, (P_rd_rural - 38367.5124) / 69831.91203, (P_rd_21 - 3.627827758) / 24.37334603, (P_rd_31 - 3.518684818) / 23.91963842]
                   // OPTION 2
                  //  data: [(P_length) / 76377.96091, (P_density) / 190.074839, (P_rd_urban) / 14941.34066, (P_rd_rural) / 69831.91203, (P_rd_21) / 24.37334603, (P_rd_31) / 23.91963842]
                 }, {
                   label: "Regional Average",
                   backgroundColor: "rgba(50,120,230,0.5)",
                   data: [0, 0, 0, 0, 0, 0]
                   // OPTION 2
                  //  data: [46775.31635 / 76377.96091, 244.1640059 / 190.074839, 7936.693108 / 14941.34066, 38367.5124 / 69831.91203, 3.627827758 / 24.37334603, 3.518684818 / 23.91963842]
                 }]
               };

               var radarChart = new Chart(marksCanvas, {
                 type: 'radar',
                 data: marksData,
                 options: {


                 }
               });
             }

             //LOAD THE STACKED BAR CHART -- needs some work!!
          //      var chart = new CanvasJS.Chart("chartContainer",
          //      {
          //        title:{
          //          text: "Road Breakdown"
          //        },
           //
          //        data: [
          //          {
          //            type: "stackedBar",
          //            dataPoints: [
          //              { x: new Date(2012, 01, 1), y: P_rd_1 },
          //              { x: new Date(2012, 02, 1), y: 6407.589269},
          //            ]
          //    },
          //      {
          //      type: "stackedBar",
          //       dataPoints: [
          //      { x: new Date(2012, 01, 1), y: P_rd_2 },
          //      { x: new Date(2012, 02, 1), y: 21603.01897},
          //      ]
          //    },
          //      {
          //      type: "stackedBar",
          //       dataPoints: [
          //      { x: new Date(2012, 01, 1), y: P_rd_3 },
          //      { x: new Date(2012, 02, 1), y: 18764.70811},
          //      ]
          //    },
           //
          //    ]
          //  });
          //  chart.render();



      //  };

         }


   )};


var myFilter = function(feature) {
     if (feature.properties.gen_pov===' ') {
     return false;
     }
     else {
       return true;
     }
   };


// 3.2 LOADING CHARTS
//CREATE RADAR CHART
// var marksCanvas = document.getElementById("myChart1");
//
// var marksData = {
//   labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
//   datasets: [{
//     label: "P_muni",
//     backgroundColor: "rgba(255,50,20,0.4)",
//     data: [65, 75, 70, 80, 60, 80]
//   }, {
//     label: "Regional Average",
//     backgroundColor: "rgba(0,0,250,0.4)",
//     data: [54, 65, 60, 70, 70, 75]
//   }]
// };
//
// var radarChart = new Chart(marksCanvas, {
//   type: 'radar',
//   data: marksData
// });


//PLACEHOLDER:
// var ctx1 = document.getElementById("myChart1").getContext('2d');
// var myChart1 = new Chart(ctx1, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: 'ROSE MAP SCORE',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.4)',
//                 'rgba(54, 162, 235, 0.4)',
//                 'rgba(255, 206, 86, 0.4)',
//                 'rgba(75, 192, 192, 0.4)',
//                 'rgba(153, 102, 255, 0.4)',
//                 'rgba(255, 159, 64, 0.4)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });



// 4. LOADING REAL DATA
//ZOOM TO SELECTED LOCATIONS
//ANOTHER METHOD HERE: http://learn.jquery.com/using-jquery-core/faq/how-do-i-get-the-text-value-of-a-selected-option/

var changeBasemap1 = function(location1){
  var value1 = location1.value;
  console.log(value1);
  if(value1 == 'Guatemala'){
      map.setView([15.372844, -90.544976],8);
  }
  if(value1 == 'Honduras'){
      map.setView([14.811574, -86.953985],8);
  }
  if(value1 == 'El Salvador'){
      map.setView([13.650275, -88.850540],8);
  }
};



var changeBasemap2 = function(location2){
  var value2 = location2.value;
  console.log(value2);
  if(value2 == 'Peten'){
      map.setView([16.936401, -90.036336],9);
  }
  if(value2 == 'Guatemala'){
      map.setView([14.643792, -90.467986],9);
  }
  if(value2 == 'Alta Verapaz'){
      map.setView([15.649419, -90.143057],9);
  }
};



var changeBasemap3 = function(location3){
  var value3 = location3.value;
  console.log(value3);
  if(value3 == 'La Libertad'){
      map.setView([16.849479, -90.426450],10);
  }
  if(value3 == 'Guatemala'){
      map.setView([14.629168, -90.519007],10);
  }
  if(value3 == 'Coban'){
      map.setView([15.466670, -90.383285],10);
  }
};


//4.0 LOADING THREE NATIONS BOUNDARY
$(document).ready(function(){
  $.ajax(Guatemala).done(function(data) {
    parsedData21 = JSON.parse(data);
    // console.log(parsedData10);
    console.log("parsed21");
    console.log(parsedData21.features[0].properties.country);
  //   layerMappedPolygons = _.each(parsedData21,function(item){
  //     L.geoJson(parsedData21,
  //       {
  //         style: {opacity:0.4},
  //         pointToLayer: function (feature, latlngs) {
  //           return new L.Polygon(latlngs, {
  //           }
  //         );
  //       }}
  //     ).addTo(map).bindPopup("text");
  //   }
  // );
  });
});


$(document).ready(function(){
  $.ajax(Salvador).done(function(data) {
    parsedData22 = JSON.parse(data);
    console.log("parsed22");
    console.log(parsedData22.features[0].properties.country);
  //   layerMappedPolygons = _.each(parsedData22,function(item){
  //     L.geoJson(parsedData22,
  //       {
  //         style: {opacity:0.4},
  //         pointToLayer: function (feature, latlngs) {
  //           return new L.Polygon(latlngs, {
  //           }
  //         );
  //       }}
  //     ).addTo(map).bindPopup("text");
  //   }
  // );
  });
});


$(document).ready(function(){
  $.ajax(Honduras).done(function(data) {
    parsedData23 = JSON.parse(data);
    console.log("parsed23");
    console.log(parsedData23.features[0].properties.country);
  //   layerMappedPolygons = _.each(parsedData23,function(item){
  //     L.geoJson(parsedData23,
  //       {
  //         style: {opacity:0.4},
  //         pointToLayer: function (feature, latlngs) {
  //           return new L.Polygon(latlngs, {
  //           }
  //         );
  //       }}
  //     ).addTo(map).bindPopup("text");
  //   }
  // );
  });
});





//LOAD DEPARTMENT BOUNDARIES
  $(document).ready(function(){
    $.ajax(department).done(function(data) {
      parsedData18 = JSON.parse(data);
      console.log(parsedData18);
      console.log("parsed18");
    //   layerMappedPolygons = _.each(parsedData18,function(item){
    //     L.geoJson(parsedData18,
    //       {
    //         style: {opacity:0.3,color:"#E1E1DB"},
    //         pointToLayer: function (feature, latlngs) {
    //           return new L.Polygon(latlngs, {
    //
    //           }
    //         );
    //       }}
    //     ).addTo(map).bindPopup("departments");
    //   }
    // );
    });
  });



// 4.1 LOADING SOUTH AMERICA DATA
//SELECT THE LAYERS YOU WANT

// console.log(document.getElementById("infrastructure").checked);
//ADD THE LAYERS TO THE MAP
var selectedmaps = [];
var y0, y1, y2, x1, x2, x3, x4;

$('#nation').change(function(){
  if(this.checked){
    console.log("nation checked");
    y0 = true;
  }
  if(!this.checked){
    console.log("nation unchecked");
    y0 = false;
  }
});

$('#department').change(function(){
  if(this.checked){
    y1 = true;
  }
  if(!this.checked){
    y1 = false;
  }
});

//
// $('#municipality').change(function(){
//   if(this.checked){
//     y2 = true;
//   }
//   if(!this.checked){
//     y2 = false;
//   }
// });


$('#roads1').change(function(){
  if(this.checked){
    x1 = true;
  }
  if(!this.checked){
    x1 = false;
  }
});

$('#roads2').change(function(){
  if(this.checked){
    x2 = true;
  }
  if(!this.checked){
    x2 = false;
  }
});

$('#hospital').change(function(){
  if(this.checked){
    x3 = true;
  }
  if(!this.checked){
    x3 = false;
  }
});

$('#school').change(function(){
  if(this.checked){
    x4 = true;
  }
  if(!this.checked){
    x4 = false;
  }
});


$('#showmap').click(function(){
  console.log(x1,x2,x3,x4);
  //LOAD NATIONAL BOUNDARIES
  if (y0 == true){
    GuatemalaB =
        L.geoJson(parsedData21,
          {
            style: {opacity:0.2},
            pointToLayer: function (feature, latlngs) {
              return new L.Polygon(latlngs, {
              }
            );
          }}
        ).addTo(map).bindPopup("Guatemala");


    SalvadorB =
      L.geoJson(parsedData22,
        {
          style: {opacity:0.2},
          pointToLayer: function (feature, latlngs) {
            return new L.Polygon(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("El Salvador");


    HondurasB =
      L.geoJson(parsedData23,
        {
          style: {opacity:0.2},
          pointToLayer: function (feature, latlngs) {
            return new L.Polygon(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("Honduras");

    NationsB.push(GuatemalaB);
    NationsB.push(SalvadorB);
    NationsB.push(HondurasB);
}


//LOAD DEPARTMENTAL BOUNDARIES
  if (y1 == true){
    _.each(parsedData18,function(item){
        var itemB = L.geoJson(parsedData18,
          {
            style: {opacity:0.2,color:"#E1E1DB"},
            pointToLayer: function (feature, latlngs) {
              return new L.Polygon(latlngs, {

              }
            );
          }}
        ).addTo(map).bindPopup("departments");

        DepartmentsB.push(itemB);

      }
    );

  }


  // //LOAD THE MUNICIPALITY LAYER
  // if (y2 == true){
  //   _.each(parsedData00,function(item){
  //       var itemB = L.geoJson(parsedData00,
  //         {
  //           style: {opacity:0.2,color:"#E1E1DB"},
  //           pointToLayer: function (feature, latlngs) {
  //             return new L.Polygon(latlngs, {
  //
  //             }
  //           );
  //         }}
  //       ).addTo(map).bindPopup("departments");
  //
  //       DepartmentsB.push(itemB);
  //
  //     }
  //   );
  //
  // }


  //LOAD PRIMARY ROAD NETWORK
    if (x1 == true){
      _.each(parsedData14,function(item){
        var itemB = L.geoJson(parsedData14,
          {
            style: {opacity:0.6,width:1.5,color:'#F39C12'},
            pointToLayer: function (feature, latlngs) {
              return new L.polyline(latlngs, {
              }
            );
          }}
        ).addTo(map).bindPopup("road1");

        PrimaryRoads.push(itemB);
      }
      );
      selectedmaps.push(PrimaryRoads);
    }
    // else {};

    if (x2 == true){
        //LOAD THE SECONDARY ROAD NETWORKS
        _.each(parsedData15,function(item){
          var itemB = L.geoJson(parsedData15,
            {
              style: {opacity:0.3,width:0.5,color:'#F9E79F'},
              pointToLayer: function (feature, latlngs) {
                return new L.polyline(latlngs, {
                }
              );
            }}
          ).addTo(map).bindPopup("road2");
          SecondaryRoads.push(itemB);
        }
        );
        selectedmaps.push(SecondaryRoads);
    }
    // else {};

    if (x3 == true){
      //LOAD THE HEALTH CENTERS DATA
         _.each(parsedData16,function(item){
            var itemB = L.geoJson(parsedData16,
              {
                pointToLayer: function (feature, latlngs) {
                  return new L.circleMarker(latlngs, {
                     radius:3,
                     fillColor:'#41D0EA',
                     color:'#2365D8',
                     weight:1,
                     opacity:0.3,
                     fillOpacity:0.3,
                    });
                  }
              }).addTo(map).bindPopup("Hospitals");
              Hospitals.push(itemB);

            }
          );
          selectedmaps.push(Hospitals);
      }
      // else {};


      if (x4 == true){
        //LOAD THE SCHOOL DATA
        _.each(parsedData17,function(item){
           var itemB = L.geoJson(parsedData17,
             {
              //  style: {opacity:0.3,width:0.5,color:'#E5EF12'},
               pointToLayer: function (feature, latlngs) {
                 return new L.circleMarker(latlngs, {
                    radius:4,
                    fillColor:'#E5EF12',
                    color:'#EBA430',
                    weight:1,
                    opacity:0.3,
                    fillOpacity:0.3,
                   });
                 }
             }).addTo(map).bindPopup("Schools");
             Schools.push(itemB);
           }
         );
         selectedmaps.push(Schools);
      }
      // else {};

});


//REMOVE MAP LAYERS AS REQUESTED
$('#hidemap').click(function(){
  console.log("ready to remove");
  console.log(selectedmaps);

  _.each(NationsB,function(layer){
    map.removeLayer(layer);
  });

  _.each(DepartmentsB,function(layer){
    map.removeLayer(layer);
  });


  _.each(PrimaryRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(SecondaryRoads,function(layer){
    map.removeLayer(layer);
  });

  _.each(Hospitals,function(layer){
    map.removeLayer(layer);
  });

  _.each(Schools,function(layer){
    map.removeLayer(layer);
  });

  console.log("removed");

});


//DOWNLOAD DATA OF DIFFERENT LAYERS
//LOAD THE HOSPITAL DATA
// var healthcenter = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/healthcenters_segeplan_2010.geojson?token=AWa3uu4HC5P_wTYFCaksa2u2C8t4hRV5ks5Zd5GcwA%3D%3D";
// var highschool = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/High_Schools_in_Triangulo_Norte.geojson";

  $(document).ready(function(){
    $.ajax(healthcenter).done(function(data) {
      parsedData16 = JSON.parse(data);
      console.log(parsedData16);
      console.log("parsed16");
    });
  });

//LOAD HIGHSCHOOLS
$(document).ready(function(){
  $.ajax(highschool).done(function(data) {
    parsedData17 = JSON.parse(data);
    console.log(parsedData17);
    console.log("parsed17");
  });
});


//LOAD SOUTH AMERICA COUNTRY DATA
$(document).ready(function(){
  $.ajax(southamerica).done(function(data) {
    parsedData10 = JSON.parse(data);
    console.log(parsedData10);
    console.log("parsed10");
    console.log(parsedData10.features[0].properties.country);
    layerMappedPolygons = _.each(parsedData10,function(item){
      L.geoJson(parsedData10,
        {
          style: {opacity:0.4},
          pointToLayer: function (feature, latlngs) {
            return new L.Polygon(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("text");
    }
  );
  });
});


//4.2 LOADING SECONDARY ROAD NETWORK DATA
$(document).ready(function(){
  $.ajax(secondaryroads).done(function(data) {
    parsedData15 = JSON.parse(data);
    console.log(parsedData15);
    console.log("parsed15");
    console.log(parsedData15.features[0].geometry.coordinates);
    console.log(parsedData15.features[0].geometry.coordinates[0][0]);
  });
});

//4.3 LOADING THE MAJOR ROAD NETWORK DATA
  $(document).ready(function(){
    $.ajax(majorroads).done(function(data) {
      parsedData14 = JSON.parse(data);
      console.log(parsedData14);
      console.log("parsed14");
      console.log(parsedData14.features[0].geometry.coordinates);
      console.log(parsedData14.features[0].geometry.coordinates[0][0]);
    });
  });


//THE WHOLE SCHOOL DATA IS HUGE
//YOU CAN LIMIT THE RENDERING ONLY TO THOSE FALLING
// WITIN THE SELECTED LAYERS

// $("#school").change(function(){
//   if(this.checked){
//     // console.log("school1");
//
//     //LOAD THE HIGHSCHOOL NETWORKS
//     var schoolicon = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[15,24],
//       iconAnchor:[8,10],
//     })
//
//     console.log("schools are here");
//     console.log(parsedData16.features);
//     console.log(parsedData16.features[0]);
//     console.log(parsedData16.features[1]);
//     // console.log(parsedData16.features[1]);
//
// //DEFINE THE SELECTED LAYER
// var layershape = layerselected[0];
//     // var searchWithin = {
//     //   "type": "FeatureCollection",
//     //   "features": [
//     //     {
//     //       "type": "Feature",
//     //       "properties": {},
//     //       "geometry": {
//     //         "type": "Polygon",
//     //         "coordinates": [[
//     //           [-46.653,-23.543],
//     //           [-46.634,-23.5346],
//     //           [-46.613,-23.543],
//     //           [-46.614,-23.559],
//     //           [-46.631,-23.567],
//     //           [-46.653,-23.560],
//     //           [-46.653,-23.543]
//     //         ]]
//     //       }
//     //     }
//     //   ]
//     // };
//
//
// //DEFINE ALL THE HIGHSCHOOL DATA POINTS
//     var schoolpoints = _.each(parsedData16,function(item){
//       L.geoJson(parsedData16,
//         {
//           pointToLayer: function (feature, latlngs) {
//             return new L.marker(latlngs, {
//               icon:schoolicon// radius:10,
//               // color:yellow,
//               });
//             }
//         });
//     });
//
//     var ptsWithin = function(){
//       console.log("within");
//       return turf.within(schoolpoints, layershape);
//
//     };
//
//     ptsWithin().addTo(map);



//4.2 LOADING MUNICIPAL DATA
// DEFINE THE STYLE OF THE CHOROPLETH MAP COLORS
// var myStyle = function(feature){
//   var pov = feature.properties.gen_pov;
//   switch(true){
//     case (pov < 10):return{color:"#EFC4AF"};
//     case (pov >= 10 && pov < 30):return{color:"#D48F6E"};
//     case (pov >= 30 && pov < 50):return{color:"#DB7849"};
//     case (pov >= 50 && pov < 75):return{color:"#ED692A"};
//     case (pov >= 75):return{color:"#F33105"};
//   }
//   return {};
// };


//THE OLD MUNICIPAL LAYER
//
// $(document).ready(function(){
//   $.ajax(municipality1).done(function(data) {
//     parsedData13 = JSON.parse(data);
//     console.log(parsedData13);
//     console.log("parsed13");
//     layerMappedPolygons = L.geoJson(parsedData13,
//       {
//         style: {opacity:0.4,width:0.5,color:'#EFC4AF'},
//         pointToLayer: function (feature, latlng) {
//           return new L.Polygon(latlng, {
//           });
//         },
//
//         onEachFeature: function(feature,layer){
//             layer.bindPopup(
//               "<b>Municipality Name: </b>" +
//               feature.properties.m_name +
//               "</br>" +
//               "<b>Poverty Rate: </b>" +
//               feature.properties.gen_pov +
//               "</br>" +
//               "<b>Department Name: </b>" +
//               feature.properties.d_name +
//               "</br>" +
//               "<b>Data Collected Year: </b>" +
//               feature.properties.year
//             )
//           }
//         }).addTo(map);
//         layerMappedPolygons.eachLayer(eachFeatureFunction);
//       })
//     });



// $('#MUNI').click(function(){
  $(document).ready(function(){
    $.ajax(muni_clean).done(function(data) {
      parsedData00 = JSON.parse(data);
      console.log(parsedData00);
      console.log("parsed00");
      layerMappedPolygons = L.geoJson(parsedData00,
        {
          style: {opacity:0.4,width:0.5,color:'#E0903F'},
          pointToLayer: function (feature, latlng) {
            return new L.Polygon(latlng, {
            });
          },

          onEachFeature: function(feature,layer){

            layer.bindPopup(
              "<b>Municipality Name: </b>" +
              feature.properties.m_name +
              "</br>" +

              "<b>Department Name: </b>" +
              feature.properties.d_name +
              "</br>" +

              "<b>Total Road Length: </b>" +
              feature.properties.rd_length.toFixed(3) + " km" +
              "</br>" +

              "<b>Road Density: </b>" +
              feature.properties.rd_density.toFixed(3) + " per square km" +
              "</br>" +


              "<b>Urban / Rural Road Ratio: </b>" + "1 : " +
              (feature.properties.rd_rural / feature.properties.rd_urban).toFixed(2) +
              "</br>" +

              // "<b>Road Length in Urban Area: </b>" +
              // feature.properties.rd_urban + " km" +
              // "</br>" +
              //
              // "<b>Road Length in Rural Area: </b>" +
              // feature.properties.rd_rural + " km" +
              // "</br>" +

              "<b>Major Road: </b>" +
              feature.properties.rd_major.toFixed(3) + " km" +
              "</br>" +

              "<b>Secondary Road: </b>" +
              feature.properties.rd_second.toFixed(3) + " km" +
              "</br>" +

              "<b>Tertiary Road: </b>" +
              feature.properties.rd_tertiar.toFixed(3) + " km" +
              "</br>" +

              "</br>" +
              "<b>Data Collected Year: </b>" +
              feature.properties.year
            )

           }
          }).addTo(map);
          layerMappedPolygons.eachLayer(eachFeatureFunction);
        })
      });

// })

// $(document).ready(function(){
//   $.ajax(municipality1).done(function(data) {
//     parsedData13 = JSON.parse(data);
//     console.log(parsedData13);
//     console.log("parsed13");
//     layerMappedPolygons = L.geoJson(parsedData13,
//       {
//         style: myStyle,
//         pointToLayer: function (feature, latlng) {
//           return new L.Polygon(latlng, {
//           });
//         },
//
//         onEachFeature: function(feature,layer){
//             layer.bindPopup(
//               "<b>Municipality Name: </b>" +
//               feature.properties.m_name +
//               "</br>" +
//               "<b>Poverty Rate: </b>" +
//               feature.properties.gen_pov +
//               "</br>" +
//               "<b>Department Name: </b>" +
//               feature.properties.d_name +
//               "</br>" +
//               "<b>Data Collected Year: </b>" +
//               feature.properties.year
//             )
//           }
//         }).addTo(map);
//         layerMappedPolygons.eachLayer(eachFeatureFunction);
//       })
//     });



//4.3 EXPORT TABLE
var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    window.location.href = uri + base64(format(template, ctx))
  }
})()

//USE MIT OPEN LICENSE TO EANABLE PDF DOWNLOAD FUNCTION
// https://jsfiddle.net/pdfjs/9engc9mw/?utm_source=website&utm_medium=embed&utm_campaign=9engc9mw
// https://codepen.io/SitePoint/pen/rxPNpG

// GENERATE A MAP IN THE DOWNLOADABLE PDF REPORT
// https://stackoverflow.com/questions/35447928/dynamically-create-image-map-via-javascript

//REALLY GOOD REFERENCE
// https://mrrio.github.io/


var PDFvalue = $('#PDFheading').text();
console.log(PDFvalue);

// P_country = layer.feature.properties.country;
// P_department = layer.feature.properties.d_name;
// P_muni = layer.feature.properties.m_name;
// P_pov = layer.feature.properties.gen_pov;
// P_id = layer.feature.properties.id;
// P_year = layer.feature.properties.year;

// var geologo = 'geoadaptive_logo_web.png';


var geologo = 'logo.jpg';

// = L.icon({
//       iconUrl:'marker-icon.png',
//       iconSize:[15,24],
//       iconAnchor:[8,10],
//     });
//

// Since images are loaded asyncronously, we must wait to create
// the pdf until we actually have the image data.
// If we already had the jpeg image binary data loaded into
// a string, we create the pdf without delay.


var tableToPDF = function(){
  console.log("PDF starts");
  var doc = new jsPDF();
  // define the map as an image

  //////////////////TO BE FIXED!!!//////
  // function function1() {
  //     var img = document.getElementById("myImg");
  //     var map = document.createElement("map");
  //     map.name = "myMap";
  //
  //     var area = document.createElement("area");
  //     area.shape = "rect";
  //     area.coords = "0,0,100,50"
  //     // area.onmouseover = function(){alert("over")};
  //
  //     map.appendChild(area);
  //
  //     var div = document.getElementById("mapimage");
  //     div.appendChild(map);
  //
  //     img.setAttribute('usermap',"#myMap");
  //     }
  //
  //
  //
  // doc.addImage(div,'JPEG', 174, 40, 48, 32);

////////////////////TO BE FIXED!!!//////


  //THIS MAY  WORK??
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html

  // var canvas = document.getElementById('canvas');
  // var imgData = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
  //
  var imgData =
  'data:image/png;base64,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'

  //GEOADAPTIVE COPYRIGHT
  //LOAD IMG LOGO
  // doc.addImage(geologo, 'JPEG', 140, 10, 170, 20);

  // doc.addImage('geoadaptive_logo_web.png', 'PNG', 140, 10, 170, 20);


  // doc.addImage(geologo, 'JPEG', 140, 10, 180, 20);
  // canvas parameters (left, top, canvas width, canvas height)
  // https://github.com/MrRio/jsPDF/issues/434
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html
  doc.addImage(imgData, 'JPEG', 164, 14, 35, 14, undefined);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150,5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);

  doc.setFont("times");
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(10, 18, 'Infrastructure Efficiency Profile of ');
  doc.setTextColor(255,140,40);
  doc.text(110, 18, ' ' + P_muni);
  // doc.text(20, 30, '     ');

  //INTRO
  doc.setFont("times");
  doc.setFontType("normal");
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text(10, 30, 'Following is a brief summary of infrastructure efficiency condition in ');
  doc.text(10, 36, '' + P_muni + ', department of ' + P_department + ', in ' + P_country + '.');
  // doc.text(10, 50, 'this City of ' + P_muni + ' is selected.');

  //INSERT A DYNAMIC MAP!!!
  //REFERENCE:
  //https://stackoverflow.com/questions/35447928/dynamically-create-image-map-via-javascript


  //INSERT THE GRAPH & CHARTS
  //DEFINE THE DIFFERENT COLOR???
  // var newCanvas1 = document.querySelector('#myChart1');
  // var newCanvasImg1 = newCanvas1.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg1,'JPEG', 10, 46, 60, 60);
  //
  // var newCanvas2 = document.querySelector('#myChart2');
  // var newCanvasImg2 = newCanvas2.toDataURL("image/jpeg", 1.0);
  // doc.addImage(newCanvasImg2,'JPEG', 74, 46, 90, 60);



  //TRIAL 2 STACKED BAR CHART





  //SOCIAL ECONOMIC INFO
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 130, '1) SOCIAL-ECONOMIC');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 138, P_muni + ' has a poverty rate of ' + P_pov.toFixed(3) + '%.');



  //TRANSPORTATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 150, '2) TRANSPORTATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 158, 'Total Length of Road: ' + P_length.toFixed(3) + ' km');
  doc.text(10, 164, 'Road Density: ' + P_density.toFixed(3) + ' km per square km');
  doc.text(10, 170, 'Road in Urban Area: ' + P_rd_urban.toFixed(3) + ' km');
  doc.text(10, 176, 'Road in Rural Area: ' + P_rd_rural.toFixed(3) + ' km');
  doc.text(10, 182, 'Major Road: ' + P_rd_1.toFixed(3) + ' km');
  doc.text(10, 188, 'Secondary Road: ' + P_rd_2.toFixed(3) + ' km');
  doc.text(10, 194, 'Tertiary Road: ' + P_rd_3.toFixed(3) + ' km');

  // doc.text(10, 150, 'Typology split (km x major/secondary/tertiary): ' + '1000 km');
  doc.text(10, 200, 'Road Efficiency (% population within 30 minutes of road): ' + '1000 km');


  //UTILITY
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 212, '3) UTILITY');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 220, 'Sanitation (% of coverage): ' + '1000 km');
  doc.text(10, 226, 'Electricity (% of coverage): ' + '1000 km');
  doc.text(10, 232, 'Water (% of coverage): ' + '1000 km');
  doc.text(10, 238, 'Basic Needs Unsatisfied (% of coverage): ' + '50%');


  //EDUCATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 250, '4) EDUCATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 258, 'Literacy Rate: ' + '75%');

  //OTHER NOTES
  doc.setFont("georgia");
  doc.text(10, 270, 'Notes: ' + 'things to keep in mind');

  //OTHER NOTES
  doc.setFont("times");
  doc.setFontType("italic");
  doc.setFontSize(10);
  doc.text(5, 280, '* This data was obtained from ');
  doc.text(5, 285, '' + P_source);

  // doc.setFont("times");
  // doc.setFontType("normal");
  // doc.text(105, 80, 'This is centred text.', null, null, 'center');
  // doc.text(105, 90, 'And a little bit more underneath it.', null, null, 'center');
  // doc.text(200, 100, 'This is right aligned text', null, null, 'right');
  // doc.text(200, 110, 'And some more', null, null, 'right');
  // doc.text(20, 120, 'Back to left');
  //
  // doc.text(20, 140, '10 degrees rotated', null, 10);
  // doc.text(20, 160, '-10 degrees rotated', null, -10);
  doc.save('test.pdf');
  console.log("PDF ready");
};





// var tableToPDF = (function(){
//
//
// })
