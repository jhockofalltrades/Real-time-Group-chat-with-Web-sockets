$(document).ready(function(){
    var baseURL = $('#base_url').val();
	var assetURL = $('#asset_url').val();

	/*
	SIGNUP FOR PROFESSORS
	*/
	$('#signup_prof').on('submit', function(e) {

		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/add_professor',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.added ) {	
		
					 $('#banner-prof').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have successfully created a new account. Please login to continue.</small>");
				} else {
		
					 $('#banner-prof').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Please provide necessary inputs to create an account.</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});


	/*
	LOGIN FOR PROFESSORS
	*/
	  $("#prof_log").on('submit',function(e) {
		
		 var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/login',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.prof ) {
					
					window.location.href = baseURL+'professors/home';
					
				} else {
					
					 $('#banner-prof').html("<i class='fa fa-exclamation-circle'></i>&nbsp;Wrong username or password");
					
				}
			 }
		});
		 	e.preventDefault();
	 });


	 
	
	 /*
	RELOAD Profile Picture fro database
	*/

	 function reloadPicProf() {
	 
	 	  $.ajax({
			 type: "GET",
			 url:  baseURL+'professors/get_profile_picture', 
			 success: function(data) {
			 	$('#profile-picture').attr('src', baseURL+'assets/uploads/' + data['img']);
			 }
		});

	 };
	 		

	reloadPicProf();


	

	/*=====UPDATING CREDS=======*/

	/*
	UPDATE NAME
	*/
	$('#update_prof_name').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/update_name',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-prof-name').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated you name</small>");
					 nameForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-prof-name').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your name hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});


	/*
	UPDATE USERNAME
	*/
	$('#update_prof_username').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/update_username',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-prof-usrn').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your username</small>");
					 usernForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-prof-usrn').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your username hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});

	/*UPDATE EMAIL*/
	$('#update_prof_email').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/update_email',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-prof-email').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your email</small>");
					 emailForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-prof-email').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your email hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});

	/*UPDATE ABOUT*/
	$('#update_prof_about').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/update_about',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-prof-about').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your email</small>");
					 emailForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-prof-about').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your email hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});

	/*UPDATE COURSE*/
	$('#update_prof_dept').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/update_dept',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-prof-dept').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your course</small>");
					 courseForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-prof-dept').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your course hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});


	  /*
		Add new schedule
	  */

	  	$('#new-schedule').on('submit', function(e) {

		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/add_schedule',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.added ) {
		 			$('#sched-banner').text("Added new Schedule");
		 		} else {
		 			$('#sched-banner').text("Schedule already exist").delay(1500).slideUp(1500);
		 		}

		 		$("#new-schedule")[0].reset();

			 }
		});

		e.preventDefault();
	});


	 /*====================== LOAD SCHEDULES =======================*/
	(function(){
		 function loadSchedules() {
	 	 var contents = "";
	 	  $.ajax({
			 type: "GET",
			 url:  baseURL+'professors/get_schedules', 
			 success: function(data) {
			 	if(data.length == 0) {
			 		contents = '<div class="list-panel"><div class="list-body" style="height:300px; display: flex; align-items: center; justify-content: center;"><p class="text-center no-error"><i class="fa fa-frown-o"></i>&nbsp;&nbsp;No Schedules for today.</p></div></div>';
			 		$('#schedule-list').html(contents);
			 	} else {
			 		 $('#schedule-list').append(
			 		 	`<table class='table table-hover table-striped'>
							<thead>
							 <tr>
								<th>Room</th>
								<th>Time</th>
							 </tr>
							 <tbody id='current-schedule'>
								
							 </tbody>
							</thead>
			 		 	</table>`
			 		 	);

			 		 $.each(data, function(index){
			 			contents += `<tr>
										<td>`+data[index]['room']+`</td>
										<td>`+data[index]['f_from_time']+ ' '  + ' - ' + data[index]['to_time'] + ' '  +`</td>
			 						</tr>`;
			 		});
			 		

			 	}

			 	 $('#current-schedule').html(contents);
	 			 $('.loading-sched').hide();
			 }
		});

	 };
	 		
	 loadSchedules();
	}());

	/*====================== Search Requests ====================*/
	 (function(){

	 	let searchContainer = $('#search-results');
	 	
	 	searchContainer.hide();

	 	

	 	$('#search-student').keyup(function(){
	 		$.ajax({
				 type: "GET",
				 url:  baseURL+'professors/get_search_result/'+$('#search-student').val(), 
				 success: function(data) {
				 	if( data ) {
				 		// show results
				 		searchContainer.slideDown(400);

				 		var resultString = "";
				 
				 		data.forEach(function(value, index) {

				 			resultString += "<tr>";
					 		resultString += "<td><img src='"+assetURL+"uploads/"+value.img+"' alt='Profile' style='width:60px' /></td>";
					 		resultString += `<td>
					 							<h3 class="title" id="name-result">`+value.name+`</h3>
					 							<small><a href=""><i class="fa fa-comment" style="color: #3498db"></i>&nbsp;&nbsp;Message</a></small>&nbsp;&nbsp;&nbsp;<small><a href=""><i class="fa fa-address-book" style="color: #e74c3c"></i>&nbsp;&nbsp;Profile</a></small>
					 					    </td>`;
					 		resultString += "</tr>";
				 		});

				 			

				 		searchContainer.html(resultString);

				 	} 

				 }
	 		});

	 		// Hide when search is empty
	 		function hideSearchResults() {
	 			if($('#search-student').val() == "") {
	 				searchContainer.slideUp(400);
	 			}
		 	}		

		 	setTimeout(hideSearchResults, 100);


	 	});



	 }());

});
