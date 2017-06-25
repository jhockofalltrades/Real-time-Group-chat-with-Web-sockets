	
	var express = require('express');
	var app = express();
	var http = require('http').createServer(app);
	var io = require('socket.io').listen(http);
	var request = require('request');

	// ONLINE USERS
	var onlineUsers = [];
	
	http.listen(process.env.PORT || 3000, function(){
		console.log('Server is running...');
	});


	io.sockets.on('connection', function(socket){
		console.log('New connection');

		var options = {
			loadMsgOpt: {
			  url: 'http://localhost/socket-chat/chat/load_msg',
	          method: 'GET',
	          headers: {'Content-Type':     'application/json'}
			}
		}

		/*LOAD MESSAGED FROM DB*/
		request(options.loadMsgOpt, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        // Print out the response body
		         var data = JSON.parse(body);
		        io.sockets.emit('load messages', data);
		    }
		});

		/*GET ALL ONLINE USERS*/
		socket.on('get userdata', function(data) {
			
			socket.username = data.user;
			socket.location = data.location;
			// if data !exist and !empty
			if(onlineUsers.indexOf(socket.username) == -1 && typeof socket.username !== 'undefined') {
				//add the user to online
				onlineUsers.push(socket.username + ' <span class="badge">' + socket.location+'</span>');
				// call for display of online users
				io.sockets.emit('online users', onlineUsers);

				console.log(socket.username + ' is online');
				//if not exist
			} else if(onlineUsers.indexOf(socket.username) > -1) {
				//just call for diplay of online users
				io.sockets.emit('online users', onlineUsers);
			}
		});

		socket.on('disconnect', function(data) {
			onlineUsers.splice(onlineUsers.indexOf(socket.username),1);
			io.sockets.emit('online users', onlineUsers);
			console.log(socket.username + ' is disconnected');
		});


		/*SEND LISTENER*/
		socket.on('send', function(data){
			// Configure the request
			var options = {
			    url: 'http://localhost/socket-chat/chat/new_msg',
			    method: 'POST',
			    headers: {'Content-Type': 'application/json'},
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