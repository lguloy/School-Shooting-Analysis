let city = []
let state = []
let city_state = []
let heatArray = []

var myMap = L.map("maps", {
    center: [45.52, -122.67],
    zoom: 100
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: MAPB_KEY
}).addTo(myMap);


let url = "http://open.mapquestapi.com/geocoding/v1/address?key="



d3.csv("../static/data/overalldata_cleaned.csv").then(function(data) {
    data.forEach((line) => {
        Object.entries(line).forEach(([key, value]) => {
            if (key === 'City') {
                city.push(value)
            }
            else if (key === 'State') {
                state.push(value)
            };
        })
    
    
        var site = `${url}${MAPQ_KEY}&location${city[i]},${state[i]}`

        for (var i = 0; i < city.length; i++) {
            d3.json(site).then(function(response) {
                console.log(site);
            })
        };
    });    
});     
        
        
        
        // city_state.push(url.concat(city[i])); 
        // var site = `${url}${city[i]},%20${state[i]}&key=${GOOGLE_KEY}`

        // d3.json(site).then(function(response) {;
        //     let keys = site.getKeys()

        //     for (var i = 0; i < keys.length; i++) {
        //       console.log(keys[i] + "=" + site.get(keys[i]))

            //   var location = response[i].location;
          
            //   if (location) {
            //     heatArray.push([location.location[1], geometry.location[0]]);
//             //   }
//            }
          
//             // var heat = L.heatLayer(heatArray, {
//             //   radius: 20,
//             //   blur: 35
//             // }).addTo(myMap);
//         });
//     // console.log(site);
//     }
