// const csv = require('csv-parser');
// const fs = require('fs');

// let city = []
// let state = []

// fs.createReadStream('/Users/AlexGoodman/Documents/JHU_Bootcamp/School-Shooting-Analysis/static/data/pah_wikp_combo.csv')
//   .pipe(csv())
//   .on('data', (row) => {
//     city = (row['City']),
//     state = (row['State']);
//     console.log(city),
//     console.log(state)
//   })


let output = ('https://maps.googleapis.com/maps/api/geocode/json?address=1600%20Amphitheatre%20Parkway,
%20Mountain%20View,%20CA&key='AIzaSyAHdcrKSynTkWgemjldeskYBwVT_M873Ps'')
console.log(output)