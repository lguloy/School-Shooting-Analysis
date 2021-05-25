export function test() {

    fs.createReadStream('/Users/AlexGoodman/Documents/JHU_Bootcamp/School-Shooting-Analysis/static/data/pah_wikp_combo.csv')
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
}
