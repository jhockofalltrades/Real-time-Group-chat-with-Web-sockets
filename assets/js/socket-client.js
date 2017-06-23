$(document).ready(function(){

	var socket = io.connect("http://localhost:3000/");
	var msg = $('#msg');
	var msgForm = $('#msg-form');
	var thread = $('#thread');
	var username = $('#usern').val();

	// Get location
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	function success(pos) {
	 var latlon =  pos.coords.latitude + ',' + pos.coords.longitude;

	  	 	  $.ajax({
				 type: "GET",
				 url:  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latlon+'&sensor=true', 
				 success: function(data) {
				 	// submit userdata to server.js
				 	socket.emit('get userdata', {user: username, location: data.results[0].address_components[4].long_name});
				 }
			});
	  
	};

	function error(err) {
	  console.warn(`ERROR(${err.code}): ${err.message}`);
	};


	navigator.geolocation.getCurrentPosition(success, error, options);
	
	
	// scroll down
	setTimeout(function(){thread.scrollTop(thread[0].scrollHeight)}, 100);

	// emit function
	function reloadMsg(creds, callback) {
			socket.emit('send', creds);
			callback();
	}

	msgForm.on('submit', function(e){
			var creds = $(this).serialize();

		reloadMsg(creds, function(){
			setTimeout(function(){thread.scrollTop(thread[0].scrollHeight)}, 1000);
		});

		msg.val('').focus();
		e.preventDefault();
	});

	// get online users
	socket.on('online users', function(data){
		var txtString = "";
		data.forEach(function(element, index){
			txtString += '<li class="list-group-item">'+element+'</li>';
		});	

		$('#users').html(txtString);
	});

	// load messages
	socket.on('load messages', function(data){

	data.forEach( function(element, index) {
		thread.append('<span class="msg-item">'+element.username + ': ' + element.message+'</span></br></br>');
	});
});


});