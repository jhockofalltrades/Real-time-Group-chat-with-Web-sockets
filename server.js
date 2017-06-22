	
	var express = require('express');
	var app = express();
	var http = require('http').createServer(app);
	var io = require('socket.io').listen(http);
	var request = require('request');

	http.listen(process.env.PORT || 3000, function(){
		console.log('Server is running...');
	});


	io.sockets.on('connection', function(socket){
		console.log('New connection');
		
		// Load messages from DB
		request('http://localhost/socket-chat/chat/load_msg', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    var data = JSON.parse(body);

		    io.sockets.emit('load messages', data);
		  }
		});


	socket.on('send', function(data){
			// Configure the request
			var options = {
			    url: 'http://localhost/socket-chat/chat/new_msg',
			    method: 'POST',
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    form: data
			}

			// Start the request
			request(options, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			        
			        request('http://localhost/socket-chat/chat/load_msg', function (error, response, body) {
					  if (!error && response.statusCode == 200) {
					    var data = JSON.parse(body);

					    io.sockets.emit('load messages', data);
					  }
					});
			    }
			});
		});

	});