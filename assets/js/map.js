$(document).ready(function(){

	 var assetURL = $('#asset_url').val();
	 var map;
	 var mapStyles = [
	 		{
	 			"featureType": "transit",
	 			"elemetType": "labels",
	 			"stylers": [
	 				{"visibility": "off"}
	 			]
	 		}
	 ];

	 var LNUMap = {lat: 11.238106, lng: 125.001454};
	 var mapOptions = {
	 	  center: LNUMap,
          zoom: 18,
		  mapTypeId: 'roadmap',
		  panControl : false,
		  minZoom: 18, 
		  maxZoom: 18,
		  styles: mapStyles,
		  fullscreenControl: true

	 }
	 
      function initMap() {

       	 	map = new google.maps.Map(document.getElementById('map'), mapOptions);
				map.setCenter( {lat: 11.238106, lng: 125.001454});

			
			// 3s after panning, the center autofocus -- LNU 
			 map.addListener('center_changed', function() {
			    window.setTimeout(function() {
			      map.panTo(LNUMap);
			    }, 20000);
		 	 });
      }

	/*==== Controls ====*/
	var p;
	function defaultZoom() {
		map.setOptions({ maxZoom: 18, minZoom: 18});
		map.setZoom(18);
	}

	function freeHand() {
		map.setOptions({ maxZoom: '', minZoom: ''});
		map.setZoom(17);
	}
	document.getElementById('zoom').onclick = function() {
		 var el = this;
 		 return (el.t = !el.t) ? freeHand(el) : defaultZoom(el);

	}


	document.getElementById('show-school').onclick = function() {
		map.setOptions({minZoom: '', maxZoom: ''});
		map.setZoom(14);

		/*=================
		Identifying Schools in Tacloban City Area
     	==================*/
		var EVSU = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.240328, lng: 124.99708},
            radius: 120
        });

		var UP = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.247438, lng: 125.007967},
            radius: 120
        });

		var ACLC = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.238219, lng: 125.004227},
            radius: 120
        });

		var LC = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.242179, lng: 125.004288},
            radius: 120
        });

		var asian = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.217100, lng: 125.001054},
            radius: 120
        });

		var HIC = new google.maps.Circle({
            strokeColor: '#e74c3c',
            strokeOpacity: 0.8,
			fillColor: '#e74c3c',
    		fillOpacity: 0.35,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.232100, lng: 124.984001},
            radius: 120
        });

	}





	/*
	Google Maps displays grey to all area  if resize is detected
	*/
	$("#map-modal").on("shown.bs.modal", function () {
	    google.maps.event.trigger(map, "resize");
	});



	/*
	Adding Icons to LNU Buildings
	*/
	 var ORC = new google.maps.Marker({
		    position: {lat: 11.238389, lng: 125.001959},
		    map: map,
			title: 'ORC Building',
			icon: {
				url: assetURL + 'img/orc-building.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	  var GYM = new google.maps.Marker({
		    position: {lat: 11.237274, lng: 125.001538},
		    map: map,
			title: 'LNU Gym',
			icon: {
				url: assetURL + 'img/gym.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });
	 
	  var admin = new google.maps.Marker({
		    position: {lat: 11.237888, lng: 125.001369},
		    map: map,
			title: 'Administration / President\'s Office',
			icon: {
				url: assetURL + 'img/admin-2.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	  var humanities = new google.maps.Marker({
		    position: {lat: 11.237551, lng: 125.001798},
		    map: map,
			title: 'Humanities Building',
			icon: {
				url: assetURL + 'img/humanities.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	   var LNUHouse = new google.maps.Marker({
		    position: {lat: 11.238651, lng: 125.001283},
		    map: map,
			title: 'LNU House',
			icon: {
				url: assetURL + 'img/lnu-house.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	    var SRBuilding = new google.maps.Marker({
		    position: {lat: 11.237856, lng: 125.000913},
		    map: map,
			title: 'SR Building',
			icon: {
				url: assetURL + 'img/sr-building.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });


	    var foodcourt = new google.maps.Marker({
		    position: {lat: 11.237520, lng: 125.001149},
		    map: map,
			title: 'Food Court',
			icon: {
				url: assetURL + 'img/cafeteria.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	    var collegeBuilding = new google.maps.Marker({
		    position: {lat: 11.238535, lng: 125.000902},
		    map: map,
			title: 'College Building',
			icon: {
				url: assetURL + 'img/admin.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	    var library = new google.maps.Marker({
		    position: {lat: 11.238388, lng: 125.000709},
		    map: map,
			title: 'LNU Library',
			icon: {
				url: assetURL + 'img/library.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

	    var graduateSchool = new google.maps.Marker({
		    position: {lat: 11.238866, lng: 125.000880},
		    map: map,
			title: 'Graduate School',
			icon: {
				url: assetURL + 'img/graduation.png',
				size: new google.maps.Size(32,32),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(16,32),
				scaledSize: new google.maps.Size(32,32)
			}
	
	  });

    /* CIRCLE Radius of LNU*/
     var cityCircle = new google.maps.Circle({
            strokeColor: '#3498db',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            map: map,
            center: {lat: 11.238106, lng: 125.001454},
            radius: 120
        });


   
     google.maps.event.addDomListener(window, 'load', initMap()); //load map

});