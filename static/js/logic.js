let city = []
let state = []


// var myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 13
//   });

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: MAPB_KEY
// }).addTo(myMap);


d3.csv("../static/data/overalldata_cleaned.csv").then(function(data) {
    data.forEach((line) => {
        Object.entries(line).forEach(([key, value]) => {
            if (key === 'City') {
                city.push(value)
            }
            else if (key === 'State') {
                city.push(value)
            };
        })
    })
    console.log(city);
    
});