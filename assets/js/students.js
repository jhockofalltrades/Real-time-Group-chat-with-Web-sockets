$(document).ready(function(){
	var baseURL = $('#base_url').val();
	var assetURL = $('#asset_url').val();
	
	/*===================================================
	LOGIN FORMS IN HOMEPAGE
	=====================================================*/
	(function(){
		
		var studLogin = $('#student-login');
		var profLogin = $('#professor-login');
		var studBtn = $('#stud-btn');
		var profBtn =  $('#prof-btn');

		studLogin.hide();
		profLogin.hide();


		/*
		activeBtn    => currentBtn that is clicked
		activeLogin  => showed login div
		dActiveBtn   => !clicked btn
		dActiveLogin => hidden login
		*/
		function showlogin(activeBtn, activeLogin, dActiveBtn, dActiveLogin) {
			var cur = $(this).target;
			activeBtn.click(function(){
				dActiveLogin.hide();
				activeLogin.fadeIn();
				cur.addClass('active');
				$(dActiveBtn).removeClass('active');
			});
		}

		showlogin(studBtn, studLogin, profBtn, profLogin);
		showlogin(profBtn, profLogin, studBtn, studLogin);

	}());


	/*========================= LOGIN FOR STUDENT =========================*/
	  $("#student_log").on('submit',function(e) {
		
		 var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/login',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.user ) {
					
					window.location.href = baseURL+'students/home';
					
				} else {
					
					 $('#banner-stud').html("<i class='fa fa-exclamation-circle'></i>&nbsp;Wrong username or password");
					
				}
			 }
		});
		 	e.preventDefault();
	 });


	  	  /*======================== GET MESSAGES FROM DB ================================*/
	  // Message threads for Students
	 function reloadMsgStud() {
	 	var contents = "";
	 	  $.ajax({
			 type: "GET",
			 url:  baseURL+'students/get_msg_thread/'+$('#conversation_id').val(), 
			 success: function(data) {
			 	if(data.length == 0) {
			 		contents = '<h3 class="text-center">Start your conversation now.</h3>';
			 	} else {
			 		$.each(data, function(index){
			 		contents += "<small class='pull-right'> <time data-toggle='tooltip' data-placement='top' class='timeago' datetime='"+ data[index]['date_created'] +"'>"+  data[index]['date_created']+"</time></small> </br><div class='msg-single' >" + data[index]['msg'] + "</div>";
			 		
			 		});
			 	
			 	}
			 	 $('.spin').hide();
			 	 $('#msg-thread-box').html(contents);
			 	 $('#msg-thread-box').scrollTop($("#msg-thread-box")[0].scrollHeight);
			 	
			 }
		});

	 };

	 // Message thread for professors
	 function reloadMsgProf() {
	 	var contents = "";
	 	  $.ajax({
			 type: "GET",
			 url:  baseURL+'professors/get_msg_thread/'+$('#conversation_id').val(), 
			 success: function(data) {
			 	if(data.length == 0) {
			 		contents = '<h3 class="text-center title">No Current Conversation</h3>';
			 	} else {
			 		$.each(data, function(index){
			 		contents += "<small class='pull-right'> <time data-toggle='tooltip' data-placement='top' class='timeago' datetime='"+ data[index]['date_created'] +"'>"+  data[index]['date_created']+"</time></small> </br><div class='msg-single'>" + data[index]['msg'] + "</div>";
			 		});
			 	
			 	}

			 	 $('#msg-thread-box-prof').html(contents);
			 	 $('#msg-thread-box-prof').scrollTop($("#msg-thread-box-prof")[0].scrollHeight);
			
	 			 $('.spin').hide();
			 	
			 }
		});
	 };

	 // Handlr for both messages' message reload
	 function msgReloadHandlr() {
	 	reloadMsgStud();
	 	reloadMsgProf();
	 }
	 		
	setTimeout(msgReloadHandlr(), 5000);

	// Reload Msgs inside prof-modal
	 $("#conversation").on("shown.bs.modal", function() {
	     reloadMsgProf();
	});

	 

	   /*========================== SEND MESSAGE FROM STUDENT ==========================*/
	  $("#send-msg").on('submit',function(e) {
		
		 var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/send_msg',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			
			 		$('textarea#msg').val("").focus();
			 		
			 		setTimeout(msgReloadHandlr(), 1000);
			 }
		});
		 	e.preventDefault();
	 });

	 /*=================== SEND MESSAGE FROM STUDENT =====================*/
	  $("#send-msg-prof").on('submit',function(e) {
		
		 var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'professors/send_msg',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {

			 		$('textarea#msg').text("").focus();
			 		 
			 		 setTimeout(msgReloadHandlr(), 1000);
			 	
			 }
		});
		 	e.preventDefault();
	 });



	

	/*===================================== SIGNUP FOR STUDENTS ===============================*/
	$('#signup_stud').on('submit', function(e) {

		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/add_student',
			 dataType: 'json',

			 data: creds,
			 success: function(data) {
			 	if( data.added ) {	
			 	
					 $('#banner-stud').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have successfully created a new account. Please login to continue.</small>").delay(3000);

					 window.location.href = baseURL+'students/walkthrough';
				
				} else {
					
					 $('#banner-stud').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Please provide necessary inputs to create an account.</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});


	

	/*===================================================================
	UPDATES FOR STUDENTS/PROFESSORS, EACH FIELD ARE UPDATED INDIVIDUALLY
	=====================================================================*/

	(function(){

	/*=============== Student =============*/
	var studentUpdateBtn = {
		updateNameBtn: $('#update_toggle_name'),
		updateUsrNamBtn: $('#update_toggle_username'),
		updateEmailBTn: $('#update_toggle_email'),
		updateCourseBtn: $('#update_toggle_course'),
	}

	var studentUpdateForm = {
		nameForm: $('#update_student_name'),
		usernForm: $('#update_student_username'),
		emailForm: $('#update_student_email'),
		courseForm: $('#update_student_course')
	} 

	/*============== Professor ==============*/
	var profUpdateBtn = {
		updateDeptBtn: $('#update_toggle_dept'),
		updateAboutBtn: $('#update_toggle_about'),
		updateNameBtn: $('#update_toggle_name'),
		updateUsrNamBtn: $('#update_toggle_username'),
		updateEmailBTn: $('#update_toggle_email')
		
	}

	var profUpdateForm = {
		deptForm: $('#update_prof_dept'),
		aboutForm: $('#update_prof_about'),
		nameForm: $('#update_prof_name'),
		usernForm: $('#update_prof_username'),
		emailForm: $('#update_prof_email')
		
	}

	/*============== Toggle UpdateForm Function ==========*/

	function showUpdateForm(form, btnTrigger) {
		form.hide();

		btnTrigger.click(function(){
			form.slideToggle();
		});
	}

	// TOGGLE FOR NAME FIELD
	showUpdateForm(studentUpdateForm.nameForm, studentUpdateBtn.updateNameBtn);
	showUpdateForm(profUpdateForm.nameForm, profUpdateBtn.updateNameBtn);

	// TOGGLE FOR USERNAME FIELD
	showUpdateForm(studentUpdateForm.usernForm, studentUpdateBtn.updateUsrNamBtn);
	showUpdateForm(profUpdateForm.usernForm, profUpdateBtn.updateUsrNamBtn);

	// TOGGLE FOR EMAIL FIELD
	showUpdateForm(studentUpdateForm.emailForm, studentUpdateBtn.updateEmailBTn);
	showUpdateForm(profUpdateForm.emailForm, profUpdateBtn.updateEmailBTn);

	// TOGGLE FOR COURSE FIELD
	showUpdateForm(studentUpdateForm.courseForm, studentUpdateBtn.updateCourseBtn);
	showUpdateForm(profUpdateForm.deptForm, profUpdateBtn.updateDeptBtn);

	showUpdateForm(profUpdateForm.aboutForm, profUpdateBtn.updateAboutBtn);

	
	/*================ AJAX POST REQUESTS FOR PROFILE UPDATES ==========================*/
	/*
	UPDATE NAME
	*/
	$('#update_student_name').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/update_name',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-stud-name').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your name</small>");
					studentUpdateForm.nameForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-stud-name').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your name hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});


	/*
	UPDATE USERNAME
	*/
	$('#update_student_username').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/update_username',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-stud-usrn').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your username</small>");
					 studentUpdateForm.usernForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-stud-usrn').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your username hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});

	/*
	UPDATE EMAIL
	*/
	$('#update_student_email').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/update_email',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-stud-email').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your email</small>");
					 studentUpdateForm.emailForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-stud-email').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your email hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});

	/*
	UPDATE COURSE
	*/
	$('#update_student_course').on('submit', function(e) {
		var creds = $(this).serialize();

		 $.ajax({
			 type: "POST",
			 url:  baseURL+'students/update_course',
			 dataType: 'json',
			 data: creds,
			 success: function(data) {
			 	if( data.updated ) {	
					 $('#banner-stud-course').html("<small class='success'><i class='fa fa-check-circle'></i>&nbsp; You have updated your course</small>");
					 studentUpdateForm.courseForm.delay(1500).slideUp();
				} else {
					
					 $('#banner-stud-course').html("<small class='error'><i class='fa fa-exclamation-circle'></i>&nbsp;Your course hasn't been updated</small>");
					 
				}
			 }
		});

		e.preventDefault();
	});
	
	}());


	/*========================= Reload Profile Picture from database ==========================*/
	 
	 (function(){
	 	function reloadPic() {
	 	  $.ajax({
			 type: "GET",
			 url:  baseURL+'students/get_profile_picture', 
			
			 dataType: 'json',
			 success: function(data) {
			 		$('#profile-picture').attr('src', assetURL+'uploads/'+ data['img']);
			
				 }
			});

		 };
		reloadPic();
	}());



	/*=================================================================================
		                               ALL ABOUT UI/UX
	===================================================================================*/
	
	/*======================== Animation to the user-chip when msg-txtarea ========================*/
	(function(){
		var msgTxt = $('textarea#msg');
		msgTxt.click(function() {
		
			$('.panel-container .msg-img').animate({'height':'40px','width':'40px'}, 500, function(){
					$('.panel-container').css({'backgroundColor':'#2196f3','color':'white','font-size':'15px','transition':'all 0.5s ease-in'});
					$(this).addClass('img-thumbnail');
			});

		});
	}());


	/*======================= Animation of the walkthrough =====================*/
	(function(){
		var walkItems =  [
			'.walk-item .fa-envelope-open-o',
			'.walk-item .fa-address-card-o',
			'.walk-item .fa-comments-o',
			'dummy' //for traversing index
		];

		var i = 0;
		

		function loadWalkthrough() {
			$(walkItems[i]).animate({'font-size':'3em'});
			$(walkItems[i-1]).animate({'font-size':'1em'}).delay(2000);
			i++;

			if(i  == walkItems.length) {
				
				i = 0;
				
			}
		}

		setInterval(loadWalkthrough, 2000);
	}());




	/*==================== Current Professor Profile FROM STUDENT-view ===============================*/
	(function(){
		$('.show-profile').on('click',function(e){

		var contents = "";
		var schedulList = "";
			 $.ajax({
					 type: "GET",
					 url: baseURL +'students/current_professor/'+ $(this).data('id'), 
					 success: function(data) {

					 	contents += "<img src='"+assetURL+"uploads/"+data.personal['img']+"' alt='Profile Picture' class='img-responsive img-circle center-block current-img'>";
					 	contents += "<h1 class='text-center title'>"+data.personal['name']+"</h1>";
					 	contents += "<p class='text-center secondary-text'>"+data.personal['about']+"</p>";
					 	contents += "<small class='pull-right'><a href='"+baseURL+"students/message/"+data.personal['prof_id']+"' class='send-btn'><i class='fa fa-comment-o'></i>&nbsp;Send Message</a></small> <br /><br />";
					 	contents += `<table class="table">
									<tbody>`;
						contents += "<tr><td>Department</td>";
						contents += "<td>" + data[0] + "</td></tr>";
						contents += "<tr><td>Email Address</td>"
					 	contents += "<td>" + data.personal['email'] + "</td><tr/>";
						contents += `</tbody>
										</table>`;
					 	contents += "<br><h2 class='title text-center'>Schedule</h2></br>";
					 	contents += `<table class='table table-hover table-striped'>
									<thead>
										 <tr>
											<th>Room</th>
											<th>Time</th>
										 </tr>
										 <tbody id='load-sched'>
											
										 </tbody>
									</thead>
					 		 	</table>`;

					 		var scheds = data.sched;
					 		
					 		 	$.each(scheds, function(index){
					 			schedulList += `<tr>
												<td>`+scheds[index]['room']+`</td>
												<td>`+scheds[index]['f_from_time']+ ' '  + ' - ' + scheds[index]['to_time'] + ' '  +`</td>
					 						</tr>`;
					 			});
					 		
	 				 	
						$('#modal-current-prof').html(contents);
						$('#load-sched').html(schedulList);
						$('#loading-current-prof').hide();
					 }
				});

			e.preventDefault();
		});

	}());

	// ACTIVATE BOOTSTRAP TOOLTIP

    $('[data-toggle="tooltip"]').tooltip(); 

	
});


	