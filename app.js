const jsonURL = 'http://andmebaas.stat.ee/sdmx-json/data/PA633/40+43+49+52+58+66+68+69+DBL85+DBL106+DBL113.3.3/all?startTime=2010&endTime=2014&dimensionAtObservation=allDimensions';
let json_obj = JSON.parse(Get(jsonURL));


function Get(jsonURL) {
    let Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",jsonURL,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
};

// Leiame kõik tunnihinded ja lisame need paragrahv lahtritesse
function getHourRate() {
    // Teeme tühja array, kuhu salvestada loopist tulev numbrite kogum
    const hourList = [];
    // Võtame JSON failist välja tunnihinnad
    const hourRateData = json_obj.dataSets[0].observations;
    //Loopime tunnihinnad läbi ja surume nad loodud arraysse.
    for (h = 0; h < hourRateData; h++) {
        hourList.push(hourRateData[h], h);
    };
    console.log(hourList);
}
getHourRate();


// Leiame kõik ametinimetused ja lisame need hetkel h1 pealkirjadena
function getOccupations() {
    // Salvestame väärtused JSON failist
    const occupations = json_obj.structure.dimensions.observation[0].values;
    // Võtame <select> elemendi DOMist
    const selectDOM = document.getElementById("occupations");
    // Loopime läbi JSON väärtustest ja lisame need <option>-tena <select> tagide alla DOMis
    // Probleem võib tekkida sellega, et <option> lisamisega ei lisata talle "value" parameetrit, millega saaks siduda ta vastavate tunnihinnetega.
    for (i = 0; i < occupations.length; i++) {
        selectDOM.options[selectDOM.options.length] = new Option(occupations[i].name, i);
    };
};
// Kutsume funktsiooni välja
getOccupations();

