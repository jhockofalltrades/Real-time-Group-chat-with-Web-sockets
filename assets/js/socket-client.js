$(document).ready(function(){

	var socket = io.connect("http://localhost:3000/");
	var msg = $('#msg');
	var msgForm = $('#msg-form');
	var thread = $('#thread');

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

	// load messages
	socket.on('load messages', function(data){

	data.forEach( function(element, index) {
		thread.append('<span class="msg-item">'+element.username + ': ' + element.message+'</span></br></br>');
	});
});


});