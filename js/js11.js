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
    'opacity': 0.05,
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
         if(myChart){
           map.removeLayer(myChart);
         }
         else {
           var ctx2 = document.getElementById("myChart2").getContext('2d');
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
             if (radarChart){
               map.removeLayer(radarChart);
             }
             else {
               var marksCanvas = document.getElementById("myChart1");

               var marksData = {
                 labels: ["Total Length", "Density", "Urban Road", "Rural Road", "Secondary/Major", "Tertiary/Major"],
                 datasets: [{
                   label: P_muni,
                   backgroundColor: "rgba(255,120,35,0.5)",
                  //  data: [(P_length - 46775.31635) / 76377.96091, (P_density - 244.1640059) / 190.074839, (P_rd_urban - 7936.693108) / 14941.34066, (P_rd_rural - 38367.5124) / 69831.91203, (P_rd_21 - 3.627827758) / 24.37334603, (P_rd_31 - 3.518684818) / 23.91963842]
                   data: [(P_length) / 76377.96091, (P_density) / 190.074839, (P_rd_urban) / 14941.34066, (P_rd_rural) / 69831.91203, (P_rd_21) / 24.37334603, (P_rd_31) / 23.91963842]
                 }, {
                   label: "Regional Average",
                   backgroundColor: "rgba(50,120,230,0.5)",
                  //  data: [6, 8, 4, 7, 5, 5]
                   data: [46775.31635 / 76377.96091, 244.1640059 / 190.074839, 7936.693108 / 14941.34066, 38367.5124 / 69831.91203, 3.627827758 / 24.37334603, 3.518684818 / 23.91963842]
                 }]
               };

               var radarChart = new Chart(marksCanvas, {
                 type: 'radar',
                 data: marksData
               });
             }



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
          style: {opacity:0.4,width:0.5,color:'#EFC4AF'},
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
              feature.properties.rd_length.toPrecision(6) + " km" +
              "</br>" +

              "<b>Road Density: </b>" +
              feature.properties.rd_density.toPrecision(6) + " per square km" +
              "</br>" +


              "<b>Urban / Rural Road Ratio: </b>" +
              (feature.properties.rd_urban / feature.properties.rd_rural).toPrecision(6) +
              "</br>" +

              // "<b>Road Length in Urban Area: </b>" +
              // feature.properties.rd_urban + " km" +
              // "</br>" +
              //
              // "<b>Road Length in Rural Area: </b>" +
              // feature.properties.rd_rural + " km" +
              // "</br>" +

              "<b>Major Road: </b>" +
              feature.properties.rd_major.toPrecision(6) + " km" +
              "</br>" +

              "<b>Secondary Road: </b>" +
              feature.properties.rd_second.toPrecision(6) + " km" +
              "</br>" +

              "<b>Tertiary Road: </b>" +
              feature.properties.rd_tertiar.toPrecision(6) + " km" +
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

  //THIS MAY  WORK??
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html

  // var canvas = document.getElementById('canvas');
  // var imgData = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
  //
  var imgData = 'data:image/jpeg;base64,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'

  //GEOADAPTIVE COPYRIGHT
  //LOAD IMG LOGO
  // doc.addImage(geologo, 'JPEG', 140, 10, 170, 20);

  // doc.addImage('geoadaptive_logo_web.png', 'PNG', 140, 10, 170, 20);


  // doc.addImage(geologo, 'JPEG', 140, 10, 180, 20);
  // canvas parameters (left, top, canvas width, canvas height)
  // https://github.com/MrRio/jsPDF/issues/434
  // https://github.com/MrRio/jsPDF/blob/master/examples/images.html
  doc.addImage(imgData, 'JPEG', 172, 10, 26, 21, undefined);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC')
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);

  doc.setFont("times");
  doc.setFontSize(20);
  doc.setFontType("bold");
  doc.text(10, 20, 'Infrastructure Efficiency Profile of ');
  doc.setTextColor(255,140,40);
  doc.text(120, 20, ' ' + P_muni);
  // doc.text(20, 30, '     ');

  //INTRO
  doc.setFont("times");
  doc.setFontType("normal");
  doc.setFontSize(16);
  doc.setTextColor(0,0,0);
  doc.text(10, 40, 'Following is a brief summary of infrastructure efficiency condition in ');
  doc.text(10, 46, '' + P_muni + ', department of ' + P_department + ', in ' + P_country + '.');
  // doc.text(10, 50, 'this City of ' + P_muni + ' is selected.');



  //SOCIAL ECONOMIC INFO
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 70, '1) SOCIAL-ECONOMIC');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 80, P_muni + ' has a poverty rate of ' + P_pov + '%.');



  //TRANSPORTATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 100, '2) TRANSPORTATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 110, 'Total Length of Road: ' + P_length + ' km');
  doc.text(10, 120, 'Road Density: ' + P_density + ' km per square km');
  doc.text(10, 130, 'Road in Urban Area: ' + P_rd_urban + ' km');
  doc.text(10, 140, 'Road in Rural Area: ' + P_rd_rural + ' km');
  doc.text(10, 150, 'Major Road: ' + P_rd_1 + ' km');
  doc.text(10, 160, 'Secondary Road: ' + P_rd_2 + ' km');
  doc.text(10, 170, 'Tertiary Road: ' + P_rd_3 + ' km');


  // doc.text(10, 150, 'Typology split (km x major/secondary/tertiary): ' + '1000 km');
  doc.text(10, 180, 'Road Efficiency (% population within 30 minutes of road): ' + '1000 km');


  //UTILITY
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 200, '3) UTILITY');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 210, 'Sanitation (% of coverage): ' + '1000 km');
  doc.text(10, 220, 'Electricity (% of coverage): ' + '1000 km');
  doc.text(10, 230, 'Water (% of coverage): ' + '1000 km');
  doc.text(10, 240, 'Basic Needs Unsatisfied (% of coverage): ' + '50%');


  //EDUCATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 260, '4) EDUCATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 270, 'Literacy Rate: ' + '75%');

  //OTHER NOTES
  doc.setFont("georgia");
  doc.text(10, 290, 'Notes: ' + 'things to keep in mind');

  //OTHER NOTES
  doc.setFont("times");
  doc.setFontType("italic");
  doc.setFontSize(12);
  doc.text(5, 306, '* This data was obtained from ');
  doc.text(5, 310, '' + P_source);

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
