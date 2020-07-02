window.onload = function (){

    var map = L.map("meumapa",{
    measureControl:true,
    center: [-25.448, -49.276],
    zoom: 18,
    zoomSnap: 1,
    zoomDelta: 1,
    minZoom: 16,
    maxZoom: 18
    })
	
// para add o stilo do mapbox é necessário usar a o link CARTO
	var Mapbox_tiles = L.tileLayer('https://api.mapbox.com/styles/v1/jaquelinepisetta/ck23a3lx90c9f1do4hxv6v8u5/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamFxdWVsaW5lcGlzZXR0YSIsImEiOiJjazFjZGRnNWkwN3I0M21wbXd3ZXoxbnRrIn0.TLwcegf2N8ELKz3G1MJSnw', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);
	
	
	
	 // LEAFLET DRAW 
	var featureGroup = L.featureGroup().addTo(map);

	//add barra de ferramentas para desenho
    var drawControl = new L.Control.Draw({
		draw: {
		circle: false,
		rectangle: false,
		polygon: false
	},
	edit: {featureGroup: featureGroup}
    }).addTo(map);

    map.on('draw:created', function(e) {

            // Each time a feaute is created, it's added to the over arching feature group
            featureGroup.addLayer(e.layer);
    });


        // on click, clear all layers
    document.getElementById('delete').onclick = function(e) {
        featureGroup.clearLayers();
    }

    document.getElementById('export').onclick = function(e) {
            // Extract GeoJson from featureGroup
        var data = featureGroup.toGeoJSON();

            // Stringify the GeoJson
        var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

            // Create export
        document.getElementById('export').setAttribute('href', 'data:' + convertedData);
        document.getElementById('export').setAttribute('download','data.geojson');
    }	
	
 
	//ferramenta de medida
    t = L.map('dist', { measureControl:true }); 



}
