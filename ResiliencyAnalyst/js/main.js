// var map = L.map('map', {
//   center: [15.162820, -87.69107],
//   zoom: 6.5
// });
//
// var Style = 'dark';
//
// L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
//   maxZoom: 18,
//   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
//   subdomains: 'abcd'
// }).addTo(map);

//SET VARIABLES
var hospital = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/infr_hospital_muni_joined_clean.geojson";


//1.3 LOAD SATELLITE MAP
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/satellite-v9', //stylesheet location
      center: [-75.509107, 43.162820], // starting position
      zoom: 5 // starting zoom
    });



  $('#hospital').change(function(){
    console.log("hospital is clicked");
    if(this.checked){
      m1 = true;
      console.log("hospital is clicked 111");
    }
    if(!this.checked){
      m1 = false;
    }
  });


  $(document).ready(function(){
    $.ajax(hospital).done(function(data) {
      parsedData_Hospital = JSON.parse(data);
      console.log(parsedData_Hospital);
      console.log("parsedData_Hospital");
    });
  });


// http://lyzidiamond.com/posts/external-geojson-mapbox
  // if (m1 === true){
       _.each(parsedData_Hospital,function(item){
          var itemB = L.geoJson(parsedData_Hospital,
            {
              pointToLayer: function (feature, latlngs) {
                return new L.circleMarker(latlngs, {
                   radius:3,
                   fillColor:'#4330EA',
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
    // }







  //LOAD AN ICON
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-74, 41]
                }
            }]
        }
    },
    "layout": {
        "icon-image": "gradient"
      }
  });



  //LOAD A POLYLINE
  map.on('load', function () {
    map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-122.48369693756104, 37.83381888486939],
                    [-122.48348236083984, 37.83317489144141],
                    [-122.48339653015138, 37.83270036637107],
                    [-122.48356819152832, 37.832056363179625],
                    [-122.48404026031496, 37.83114119107971],
                    [-122.48404026031496, 37.83049717427869],
                    [-122.48348236083984, 37.829920943955045],
                    [-122.48356819152832, 37.82954808664175],
                    [-122.48507022857666, 37.82944639795659],
                    [-122.48610019683838, 37.82880236636284],
                    [-122.48695850372314, 37.82931081282506],
                    [-122.48700141906738, 37.83080223556934],
                    [-122.48751640319824, 37.83168351665737],
                    [-122.48803138732912, 37.832158048267786],
                    [-122.48888969421387, 37.83297152392784],
                    [-122.48987674713133, 37.83263257682617],
                    [-122.49043464660643, 37.832937629287755],
                    [-122.49125003814696, 37.832429207817725],
                    [-122.49163627624512, 37.832564787218985],
                    [-122.49223709106445, 37.83337825839438],
                    [-122.49378204345702, 37.83368330777276]
                ]
              }
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#ff0000",
            "line-width": 8
          }
        });




        //LOAD A POLYGON
        map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': [[[-67.13734351262877, 45.137451890638886],
                            [-66.96466, 44.8097],
                            [-68.03252, 44.3252],
                            [-69.06, 43.98],
                            [-70.11617, 43.68405],
                            [-70.64573401557249, 43.090083319667144],
                            [-70.75102474636725, 43.08003225358635],
                            [-70.79761105007827, 43.21973948828747],
                            [-70.98176001655037, 43.36789581966826],
                            [-70.94416541205806, 43.46633942318431],
                            [-71.08482, 45.3052400000002],
                            [-70.6600225491012, 45.46022288673396],
                            [-70.30495378282376, 45.914794623389355],
                            [-70.00014034695016, 46.69317088478567],
                            [-69.23708614772835, 47.44777598732787],
                            [-68.90478084987546, 47.184794623394396],
                            [-68.23430497910454, 47.35462921812177],
                            [-67.79035274928509, 47.066248887716995],
                            [-67.79141211614706, 45.702585354182816],
                            [-67.13734351262877, 45.137451890638886]]]
                    }
                }
            },
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        });
    });
