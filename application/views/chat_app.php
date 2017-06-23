
	<div class="container">
		<div class="row">

			<h1 class="text-center"><i class="fa fa-user-secret"></i>&nbsp;Group chat</h1>
			<div class="col-lg-4">
				<br>
				<ul class="list-group" id="users">

						Please run the node server to view online users

				</ul>
				<ul class="list-group">
					<div class="list-group-item" id="user-dash">
						<p><i class="fa fa-user"></i>&nbsp;<?=$this->session->userdata('username')?></p><a href="<?=base_url()?>chat/logout">Logout</a>
					</div>
				</ul>
				
			</div>
			<div class="col-lg-8">
			
				<div id="thread"></div>

				<form action="" method="post" id="msg-form">
					<div class="form-group">
						<div id="send-div">
							<input type="text" class="form-control" id="msg" name="msg" placeholder="Enter your message here...">
							<input type="hidden" name="user" id="user" value="<?=$this->session->userdata('user_id')?>">
						<button type="submit" class="btn btn-primary btn-sm pull-right"><i class="fa fa-send"></i>&nbsp;&nbsp;Send Message</button>
						</div>
					</div>

				</form>
			</div>
		</div>
	</div>
