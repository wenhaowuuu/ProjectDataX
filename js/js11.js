///1. SETUP AND BASEMAP

//1.1 SETUP BASEMAP
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

  var department = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/dept_joinbase.geojson?token=AWa3ulA7r0EP6hvXnzERqDWlb0C1DWkeks5Zd5HUwA%3D%3D";



  var municipality = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";
  var municipality1 = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson";

  var healthcenter = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/healthcenters_segeplan_2010.geojson?token=AWa3uu4HC5P_wTYFCaksa2u2C8t4hRV5ks5Zd5GcwA%3D%3D";
  var highschool = "https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/High_Schools_in_Triangulo_Norte.geojson";
  // var roadsall = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/infra_redvial_osm_2016_gt_2.geojson?token=AWa3umrkbZpL2VZXCIIaJkR15o-4Jo_Aks5ZdmxCwA%3D%3D";

  var majorroads = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/major_infra_redvial_osm_2016.geojson?token=AWa3uoVS2zMSU2MIwc0kLP3maAAJAesBks5Zdm5JwA%3D%3D";
  var secondaryroads = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/Secondary_infra_redvial_osm_2016.geojson?token=AWa3ume5fwG9rH-l740D9NlioFIxbpV4ks5Zd0LWwA%3D%3D";



// 2.2 VARIABLES
  var PrimaryRoads;
  var SecondaryRoads;
  var Hospitals;
  var Schools;


  // var layerMappedMarkers;
  // var layerMappedPolygons;

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



  var fadeout = {
    // 'color': '#0000ff',
    // 'weight': 2,
    // style: myStyle,
    // 'color': '#DB7849',
    'opacity': 0.05,
  };

  var highlight = {
    'color': '#0000FF',
    'weight': 2,
    'opacity': 0.8,
  };


//3. FUNCTIONS
// 3.1 WHEN THE LAYER IS CLICKED:
var numberofClicks = 0;
  var eachFeatureFunction = function(layer) {
     layer.on('click', function (event) {
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
         //ZOOM TO THE SELECTED MUNICIPALITY
         map.fitBounds(layer.getBounds(),{
                    padding: [100,100]
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
         console.log(layer.feature);
         $('#LENGTH').text(layer.feature.properties.m_name);
         $('#POP').text(layer.feature.properties.d_name);
         $('#30PCT').text(layer.feature.properties.gen_pov);
         $('#60PCT').text(layer.feature.properties.id);
         $('#90PCT').text(layer.feature.properties.year);

         //HIGHLIGHT THE MAP CLICKED

         layerMappedPolygons.setStyle(fadeout);


         layer.setStyle(highlight);


         //LINK DATA WITH THE GRAPH
         if(myChart){
           map.removeLayer(myChart);
         }
         else{
           var ctx2 = document.getElementById("myChart2").getContext('2d');
           var myChart = new Chart(ctx2, {
               type: 'bar',
               data: {
                   labels: [layer.feature.properties.m_name, "Average", "UN"],
                   datasets: [{
                       label: 'Poverty',
                       data: [layer.feature.properties.gen_pov, 50, 30],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.4)',
                           'rgba(54, 162, 235, 0.4)',
                           'rgba(255, 206, 86, 0.4)',

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
var ctx1 = document.getElementById("myChart1").getContext('2d');
var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'ROSE MAP SCORE',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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



// 4. LOADING REAL DATA
// 4.1 LOADING SOUTH AMERICA DATA
//SELECT THE LAYERS YOU WANT



// console.log(document.getElementById("infrastructure").checked);
//ADD THE LAYERS TO THE MAP
var selectedmaps = [];
//some push functions in the click events
//then display here...


// $('#showmap').click(function(){
// //this should be a single display map function
//
//
// });


$("#roads1").change(function(){
  if(this.checked){
    console.log("roads1");
    //LOAD THE PRIMARY ROAD NETWORKS
    PrimaryRoads = _.each(parsedData14,function(item){
      L.geoJson(parsedData14,
        {
          style: {opacity:0.8,width:1.5,color:'#F39C12'},
          pointToLayer: function (feature, latlngs) {
            return new L.polyline(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("road1");
    }
   );

  }
});


$("#roads2").change(function(){
  if(this.checked){
    console.log("roads2");
    //LOAD THE SECONDARY ROAD NETWORKS
    SecondaryRoads = _.each(parsedData15,function(item){
      L.geoJson(parsedData15,
        {
          style: {opacity:0.3,width:0.5,color:'#F9E79F'},
          pointToLayer: function (feature, latlngs) {
            return new L.polyline(latlngs, {
            }
          );
        }}
      ).addTo(map).bindPopup("road2");
    }
    );

  }
});


$("#hospital").change(function(){
  if(this.checked){
    console.log("hospital1");
    //LOAD THE HOSPITALS
    healthcenter

  }
});








//LOAD HEALTH CENTERS
$(document).ready(function(){
  $.ajax(healthcenter).done(function(data) {
    parsedData17 = JSON.parse(data);
    console.log(parsedData17);
    console.log("parsed17");




  });
});


//THE WHOLE SCHOOL DATA IS HUGE
//YOU CAN LIMIT THE RENDERING ONLY TO THOSE SELECTED
$("#school").change(function(){
  if(this.checked){
    // console.log("school1");

    //LOAD THE HIGHSCHOOL NETWORKS
    var schoolicon = L.icon({
      iconUrl:'marker-icon.png',
      iconSize:[15,24],
      iconAnchor:[8,10],
    })

    console.log("schools are here");
    console.log(parsedData16.features);
    console.log(parsedData16.features[0]);
    console.log(parsedData16.features[1]);
    // console.log(parsedData16.features[1]);

//DEFINE THE SELECTED LAYER
var layershape = layerselected[0];
    // var searchWithin = {
    //   "type": "FeatureCollection",
    //   "features": [
    //     {
    //       "type": "Feature",
    //       "properties": {},
    //       "geometry": {
    //         "type": "Polygon",
    //         "coordinates": [[
    //           [-46.653,-23.543],
    //           [-46.634,-23.5346],
    //           [-46.613,-23.543],
    //           [-46.614,-23.559],
    //           [-46.631,-23.567],
    //           [-46.653,-23.560],
    //           [-46.653,-23.543]
    //         ]]
    //       }
    //     }
    //   ]
    // };


//DEFINE ALL THE HIGHSCHOOL DATA POINTS
    var schoolpoints = _.each(parsedData16,function(item){
      L.geoJson(parsedData16,
        {
          pointToLayer: function (feature, latlngs) {
            return new L.marker(latlngs, {
              icon:schoolicon// radius:10,
              // color:yellow,
              });
            }
        });
    });

    var ptsWithin = function(){
      console.log("within");
      return turf.within(schoolpoints, layershape);

    };

    ptsWithin().addTo(map);








    Schools = _.each(parsedData16,function(item){
      // console.log("schools are ready.");
      // console.log(parsedData16);
      // console.log(parsedData16.features[0]);

      // SELECT THOSE ONLY WITHIN THE MUNICIPALITY
      // if(item./// == layer.features.m_name){
      //
      //
      // ]}


      // L.geoJson(parsedData16,
      //   {
      //     pointToLayer: function (feature, latlngs) {
      //       return new L.marker(latlngs, {
      //         icon:schoolicon// radius:10,
      //         // color:yellow,
      //         });
      //       }
      //   }).addTo(map).bindPopup("High Schools");

      }
    );
  }
});


//LOADING THE SCHOOL DATA
// $(document).ready(function(){
//   $.ajax(highschool).done(function(data) {
//     parsedData12 = JSON.parse(data);
//     console.log(parsedData12);
//     console.log("parsed12");
//     layerMappedPolygons = L.geoJson(parsedData12,
//       {
//         pointToLayer: function (feature, latlngs) {
//           return new L.marker(latlngs, {
//             icon:schoolicon// radius:10,
//             // color:yellow,
//             });
//           }
//       }).addTo(map).bindPopup("High Schools");
//     });
// });






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




//4.2 LOADING MUNICIPAL DATA
var myStyle = function(feature){
  var pov = feature.properties.gen_pov;
  switch(true){
    case (pov < 10):return{color:"#EFC4AF"};
    case (pov >= 10 && pov < 30):return{color:"#D48F6E"};
    case (pov >= 30 && pov < 50):return{color:"#DB7849"};
    case (pov >= 50 && pov < 75):return{color:"#ED692A"};
    case (pov >= 75):return{color:"#F33105"};
  }
  return {};
};


$(document).ready(function(){
  $.ajax(municipality1).done(function(data) {
    parsedData13 = JSON.parse(data);
    console.log(parsedData13);
    console.log("parsed13");
    layerMappedPolygons = L.geoJson(parsedData13,
      {
        style: myStyle,
        pointToLayer: function (feature, latlng) {
          return new L.Polygon(latlng, {
          });
        },

        onEachFeature: function(feature,layer){
            layer.bindPopup(
              "<b>Municipality Name: </b>" +
              feature.properties.m_name +
              "</br>" +
              "<b>Poverty Rate: </b>" +
              feature.properties.gen_pov +
              "</br>" +
              "<b>Department Name: </b>" +
              feature.properties.d_name +
              "</br>" +
              "<b>Data Collected Year: </b>" +
              feature.properties.year
            )
          }
        }).addTo(map);
        layerMappedPolygons.eachLayer(eachFeatureFunction);
      })
    });

//LOAD DEPARTMENT BOUNDARIES
  $(document).ready(function(){
    $.ajax(department).done(function(data) {
      parsedData18 = JSON.parse(data);
      console.log(parsedData18);
      console.log("parsed18");
      layerMappedPolygons = _.each(parsedData18,function(item){
        L.geoJson(parsedData18,
          {
            style: {opacity:0.3,color:"#E1E1DB"},
            pointToLayer: function (feature, latlngs) {
              return new L.Polygon(latlngs, {

              }
            );
          }}
        ).addTo(map).bindPopup("departments");
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

//4.4 LOADING THE HIGHSCHOOL DATA
  $(document).ready(function(){
    $.ajax(highschool).done(function(data) {
      parsedData16 = JSON.parse(data);
      console.log(parsedData16);
      console.log("parsed16");
    });
  });






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
