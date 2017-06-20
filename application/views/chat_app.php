<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Real-time Chat</title>
	<link rel="stylesheet" href="<?=base_url()?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<style>
		#thread {
			background-color: #f1f1f1;
			height: 300px;
			max-height: 300px;
			margin: 20px 0px;
			border: 2px dashed #777;
			overflow: auto;
		}
		h1{
			background: linear-gradient(to right, #36d1dc, #5b86e5);
			color: white;
			padding: 20px;
			border-radius: 4px;
		}
		input {
			border: 1px solid #f39c12 !important;
			border-radius: 0px !important;
		}
		.msg-item {
			padding: 5px 15px;
			background-color: rgba(243, 156, 18, 0.10);
			margin: 15px 5px;
			border-radius: 40px;
		}
		button {
			border: 1px solid #3498db !important;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1 class="text-center"><i class="fa fa-user-secret"></i>&nbsp;Real-time Anonymous chat</h1>
		<div id="thread">
			
		</div>
		<form action="http://localhost/socket-chat/chat/new_msg" method="post" id="msg-form">
			<div class="form-group">
				<input type="text" class="form-control" id="msg" name="msg" placeholder="Enter your message here...">
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-default pull-right"><i class="fa fa-send"></i>&nbsp;&nbsp;Send Message</button>
			</div>
		</form>
		<input type="hidden" id='base' value="<?=base_url()?>">
	</div>

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	 <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
   
	<script>
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
					thread.append('<div class="msg-item">'+element.message+'</div>');
				});
			});


			});
	</script>
</body>
</html>