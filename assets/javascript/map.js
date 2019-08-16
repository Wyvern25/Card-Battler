/**
 * Data object to be written to Firebase.
 */


var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};

function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '150%';
    controlText.style.padding = '6px';
    controlText.textContent =
        'Pick a location for your battle !!';
    controlUI.appendChild(controlText);
}

/**
 * Starting point for running the program. Authenticates the user.
 * @param {function()} onAuthSuccess - Called when authentication succeeds.
 */
function initAuthentication(onAuthSuccess) {
    firebase.auth().signInAnonymously().catch(function (error) {
        console.log(error.code + ', ' + error.message);
    }, {
        remember: 'sessionOnly'
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            data.sender = user.uid;
            onAuthSuccess();
        } else {
            // User is signed out.
        }
    });
}

/**
 * Creates a map object with mouseover/mouseout/click listener 
 */
// Initialize and add the map
var map;
function initMap() {

  var cities = [
    {
      name: "San Francisco, USA",
      icon: "assets/images/SF-icon.png",
      lat: 37.77,
      lng: -122.43
    },
    {
      name: "London, UK",
      icon: "assets/images/london-icon.png",
      lat: 51.50,
      lng: -0.123,
    },
    {
      name: "Jakarta, Indonesia",
      icon: "assets/images/indo-icon.png",
      lat: -6.21,
      lng: 106.84
    }
    ]
   
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.77, lng: -122.43}, // The map, centered at San Francisco
        zoom: 1.7,
        gestureHandling: 'cooperative', //prevent zoom by scrolling, have to hit control+scroll
        disableDefaultUI:true, //turn off entirely API default settings
        disableDoubleClickZoom: true,
        streetViewControl: false,
        zoomControl: false,
    });
    map.data.loadGeoJson("assets/javascript/google.json");
    map.data.setStyle({
        icon: '//example.com/path/to/image.png',
        fillColor: 'green'
      });

    // Display icon for each city
    $.each(cities, function(){
      var cityMarker = new google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
        map:map,
        icon: this.icon
      });
      var infoBox = new google.maps.InfoWindow ({
        content: this.name,
      });

      cityMarker.addListener("mouseover", function(){
        infoBox.open(map,cityMarker)
      });

      cityMarker.addListener("mouseout", function(){
        infoBox.close();
      })

    })
    
    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    var infoBoxDiv = document.createElement('div');
    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

    
}

