/**
 * Data object to be written to Firebase.
 */

//var firebase = new Firebase("https://project-1-50020.firebaseio.com"); //project 1 firebase url

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
      background: 1,
      lat: 37.77,
      lng: -122.43,
    },
    {
      name: "London, UK",
      icon: "assets/images/london-icon.png",
      background: 2,
      lat: 51.50,
      lng: -0.123,
    },
    {
      name: "Jakarta, Indonesia",
      icon: "assets/images/indo-icon.png",
      background: 3,
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
        icon: this.icon,
        animation: google.maps.Animation.DROP,
      });
      var infoBox = new google.maps.InfoWindow ({
        content: this.name,
      });

      cityMarker.addListener("mouseover", function(){ //display country name when mouseover
        infoBox.open(map,cityMarker)
      });
      
      cityMarker.addListener("click", function(){
        if (cityMarker.getAnimation() !== null) {
          cityMarker.setAnimation(null);
          
        } else {
          cityMarker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){
            location.href = "fightPage.html"  
          },2000)
        }
      })
      
      cityMarker.addListener("mouseout", function(){
        infoBox.close();
      });

    })

    // Create the DIV to hold the control and call the makeInfoBox() constructor
    // passing in this DIV.
    var infoBoxDiv = document.createElement('div');
    makeInfoBox(infoBoxDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);

    // Listen for clicks and add the location of the click to firebase.
    map.addListener('click', function (e) {
        data.lat = e.latLng.lat();
        data.lng = e.latLng.lng();
        addToFirebase(data);
    });

    // Create a heatmap.
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: [],
        map: map,
        radius: 16
    });

    initAuthentication(initFirebase.bind(undefined, heatmap));
}

/**
 * Set up a Firebase with deletion on clicks older than expiryMs
 * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
 */
function initFirebase(heatmap) {

    // 10 minutes before current time.
    var startTime = new Date().getTime() - (60 * 10 * 1000);

    // Reference to the clicks in Firebase.
    var clicks = firebase.database().ref('clicks');

    // Listen for clicks and add them to the heatmap.
    clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
        function (snapshot) {
            // Get that click from firebase.
            var newPosition = snapshot.val();
            var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
            var elapsedMs = Date.now() - newPosition.timestamp;

            // Add the point to the heatmap.
            heatmap.getData().push(point);

            // Request entries older than expiry time (10 minutes).
            var expiryMs = Math.max(60 * 10 * 1000 - elapsedMs, 0);

            // Set client timeout to remove the point after a certain time.
            window.setTimeout(function () {
                // Delete the old point from the database.
                snapshot.ref.remove();
            }, expiryMs);
        }
    );

    // Remove old data from the heatmap when a point is removed from firebase.
    clicks.on('child_removed', function (snapshot, prevChildKey) {
        var heatmapData = heatmap.getData();
        var i = 0;
        while (snapshot.val().lat != heatmapData.getAt(i).lat() ||
            snapshot.val().lng != heatmapData.getAt(i).lng()) {
            i++;
        }
        heatmapData.removeAt(i);
    });
}

/**
 * Updates the last_message/ path with the current timestamp.
 * @param {function(Date)} addClick After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 */
function getTimestamp(addClick) {
    // Reference to location for saving the last click time.
    var ref = firebase.database().ref('last_message/' + data.sender);

    ref.onDisconnect().remove(); // Delete reference from firebase on disconnect.

    // Set value to timestamp.
    ref.set(firebase.database.ServerValue.TIMESTAMP, function (err) {
        if (err) { // Write to last message was unsuccessful.
            console.log(err);
        } else { // Write to last message was successful.
            ref.once('value', function (snap) {
                addClick(snap.val()); // Add click with same timestamp.
            }, function (err) {
                console.warn(err);
            });
        }
    });
}

/**
 * Adds a click to firebase.
 * @param {Object} data The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 */
function addToFirebase(data) {
    getTimestamp(function (timestamp) {
        // Add the new timestamp to the record data.
        data.timestamp = timestamp;
        var ref = firebase.database().ref('clicks').push(data, function (err) {
            if (err) { // Data was not written to firebase.
                console.warn(err);
            }
        });
    });
}
