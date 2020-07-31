//Define map variable. lat,long,zoom level
const mymap = L.map('issMap').setView([0, 0], 1);

//Making custom icon of iss using iss.png
const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], {
    icon: issIcon
}).addTo(mymap);

//Adding copy attribution and tiles for map
const attribution = '@copy; <a href="https://www.openstreetmap.org/copywright">OpenStreetMap'
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const tiles = L.tileLayer(tileUrl, {
    attribution
});

tiles.addTo(mymap);
//Define api url in a variable
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';


let firstTime = true;

//fetch API data and convert to JSON
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const {
        latitude,
        longitude,
        altitude,
        visibility
    } = data;

    //Updates map with Lat and Long
    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
        mymap.setView([latitude, longitude], 2);
        firstTime = false;
    }


    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    document.getElementById('alt').textContent = altitude.toFixed(2);
    document.getElementById('visibility').textContent = visibility;
};

//call function
getISS();

setInterval(getISS, 1000);