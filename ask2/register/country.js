let selectedCountry = "";
var lat = "";
var lon = "";
var map;

document.addEventListener("DOMContentLoaded", function () {
  const toggleMap = document.getElementById("toggleMap");

  toggleMap.addEventListener("click", function () {
    const city = document.getElementById("city");
    const address = document.getElementById("address");

    const options = getOptions(selectedCountry, city.value, address.value);
    makeRequest(options);
  });

  // Make request to get lat and lon
  const showMap = document.getElementById("showMap");
  const mapValidationMessage = document.getElementById("mapValidationMessage");
  async function makeRequest(options) {
    if (
      options.params.street === "" ||
      options.params.city === "" ||
      options.params.country === ""
    ) {
      mapValidationMessage.className = "text-danger";
      mapValidationMessage.textContent = "Invalid address";
      return;
    }
    try {
      const response = await axios.request(options);
      if (Object.keys(response.data).length === 0) {
        mapValidationMessage.className = "text-danger";
        mapValidationMessage.textContent = "Invalid address";
      } else if (!response.data[0].display_name.includes("Heraklion")) {
        mapValidationMessage.className = "text-danger";
        mapValidationMessage.textContent =
          "This service is only available for Heraklion";
      } else {
        mapValidationMessage.className = "text-success";
        mapValidationMessage.textContent = "Valid address";
        lat = response.data[0].lat;
        lon = response.data[0].lon;
        MapStyle.style.display = "none";
        showMap.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    }
  }

  var MapStyle = document.getElementById("Map");
  var createMap = document.getElementById("createMap");
  createMap.addEventListener("click", function () {
    if (lat === "" || lon === "") {
        MapStyle.style.display = "none";
        mapValidationMessage.className = "text-danger";
        mapValidationMessage.textContent = "Invalid address";
        return;
    }
    if (map) {
      map.destroy(); 
    }
    let latf = parseFloat(lat);
    let lonf = parseFloat(lon);
    map = new OpenLayers.Map("Map");
    var mapnik         = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);	
    //Markers	
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);

    //Protos Marker	
    var position=setPosition(latf,lonf);
    var mar=new OpenLayers.Marker(position);
    markers.addMarker(mar);	
    mar.events.register('mousedown', mar, function(evt) { 
        handler(position,'Your address');}
    );
    //Orismos zoom	
    const zoom = 5;
    map.setCenter(position, zoom);
    MapStyle.style.display = "block";
  });

  

  var countryIframe = document.getElementById("countryIframe");
  countryIframe.onload = function () {
    var contentDocument =
      countryIframe.contentDocument || countryIframe.contentWindow.document;
    var countrySelect = contentDocument.getElementById("country");
    selectedCountry = countrySelect.value;
    countrySelect.addEventListener("change", function () {
      selectedCountry = countrySelect.value;
    });
  };
});


//Orismos Thesis
function setPosition(lat, lon){
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position       = new OpenLayers.LonLat(lon, lat).transform( fromProjection, toProjection);
    return position;
}

//Orismos Handler

function handler(position, message){
    var popup = new OpenLayers.Popup.FramedCloud("Popup", 
        position, null,
        message, null,
        true // <-- true if we want a close (X) button, false otherwise
    );
    map.addPopup(popup);
    var div = document.getElementById('divID');
    div.innerHTML += 'Energopoitihike o Handler<br>';

}


// Get options for request
function getOptions(country, city, address) {
  return {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward",
    params: {
      street: address,
      city: city,
      country: country,
      "accept-language": "en",
      polygon_threshold: "0.0",
    },
    headers: {
      "X-RapidAPI-Key": "54711c88damsh1f9e11569b8ab7ep1f42f3jsn646e18dae2d6",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };
}
