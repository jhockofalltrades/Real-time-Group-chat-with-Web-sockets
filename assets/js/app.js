$(document).ready(function(){
	/*----------------------------------
	 *              SIGN UP
	 -----------------------------------*/
	$('#signup').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url: 'http://localhost/socket-chat/chat/add_user',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.added ) {	
					$('#signup').html("Your credentials has been accepted. Please <a href='http://localhost/socket-chat/chat'>login</a> to join the group chat.");			 		
					
				} else {
					
					 if(data.hasExistingUsername) {
					 	$('#signup-banner').text("Username already exist.");
					 }
					 if(data.empty) {
					 	$('#signup-banner').text("Please provide the necessary information.");
					 } 
				}
			 }
		});

		e.preventDefault();
	});

	/*----------------------------------
	 *              LOGIN
	 -----------------------------------*/
 	  $("#login").on('submit',function(e) {
		
		 var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  'http://localhost/socket-chat/chat/login',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.user ) {
					window.location.href = 'http://localhost/socket-chat/chat/app';	
				} else {
					$('#login-banner').text("Wrong username or password");
				}
			 }
		});
		 	e.preventDefault();
	 });


});