
	<div class="container">
		<div class="row">
			<h1 class="text-center"><i class="fa fa-user-secret"></i>&nbsp;Group chat</h1>
			<div class="col-lg-4">
				<h5><i class="fa fa-users"></i>&nbsp;Active users</h5>
				<div id="users">
				
				</div>
			</div>
			<div class="col-lg-8">
				<a href="<?=base_url()?>chat/logout" class="pull-right">Logout</a>
				<div id="thread">
					
				</div>
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
