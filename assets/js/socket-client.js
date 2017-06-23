$(document).ready(function(){

	var socket = io.connect("http://localhost:3000/");
	var msg = $('#msg');
	var msgForm = $('#msg-form');
	var thread = $('#thread');
	var username = $('#usern').val();

	// emit username for the online-feature capabilities


	socket.emit('get username', {user: username});

	
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
		data.forEach(function(element, index){
			$('#users').append('<li class="list-group-item">'+element+'</li>');
		});	
	});

	// load messages
	socket.on('load messages', function(data){

	data.forEach( function(element, index) {
		thread.append('<span class="msg-item">'+element.username + ': ' + element.message+'</span></br></br>');
	});
});


});