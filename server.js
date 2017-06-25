	
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

		// ONLINE USERS
		var onlineUsers = [];
	

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

			// if data !exist and !empty
			if(onlineUsers.indexOf(data.user) == -1) {
				//add the user to online
				onlineUsers.push(data.user + ' <span class="badge">' + data.location+'</span>');
				// call for display of online users
				io.sockets.emit('online users', onlineUsers);

				console.log(data.user + ' is online');
				//if not exist
			} else {
				//just call for diplay of online users
				io.sockets.emit('online users', onlineUsers);
				
			}
		});

		socket.on('disconnect', function(data) {
			onlineUsers.splice(onlineUsers.indexOf(data.user),1);
			
			console.log(data.user + ' is disconnected');

			/* When 1 of the 2 or more tabs are closed in the same browser,  
			 * this will load again the userdata to make sure that the current userdata
			 * will not be removed from the online users
			 */
			io.sockets.on('get userdata', function(data) {
			
				// if data !exist and !empty
				if(onlineUsers.indexOf(data.user) == -1 ) {
					//add the user to online
					onlineUsers.push(data.user + ' <span class="badge">' + data.location+'</span>');
					// call for display of online users
					io.sockets.emit('online users', onlineUsers);

					console.log(data.user + ' is online');
					//if not exist
				} else {
					//just call for diplay of online users
					io.sockets.emit('online users', onlineUsers);
					
				}
			});
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