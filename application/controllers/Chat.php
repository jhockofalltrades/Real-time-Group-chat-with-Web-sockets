<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {
	
	function index() {

		$this->load->view('header');
		$this->load->view('login');
		$this->load->view('footer');
	}

	function login()  {
			$existing = false;

			$username = $this->input->post('username', true);
			$password = $this->input->post('password', true);
		
			if( !empty($username) && !empty($password) ) {

				$user = $this->chat_thread->login(trim($username),trim($password));

				if( $user ) {
					$existing = true; //Set existing to TRUE

					$data = [
						'user_id' => $user->user_id,
					];

					$this->session->set_userdata($data);
				}
			}

			echo json_encode(['user' => $existing]);
	}

	function signup() {
		$this->load->view('header');
		$this->load->view('signup');
		$this->load->view('footer');
	}

	function add_user() {
		$added = false;
		$username = $this->input->post('username');
		$password = $this->input->post('password');
		// Check if any field is not empty
		if(!empty($username) && !empty($password)) {
			// Data
			$data = [
				'username' => trim($username),
				'password' => trim(md5($password))
			];

			// Add to datbase
			$new_user = $this->chat_thread->add_user($data);

			// If added update the boolean
			if( $new_user ) {
				$added = true;
			}
		}

		echo json_encode(['added'=> $added]);

		
	}

	function app() {

		$this->load->view('header');
		$this->load->view('chat_app');
		$this->load->view('footer');
	}

	function load_msg() {
		header('Content-Type: application/json'); 

		$msg = $this->chat_thread->get_msg();
		
		$json = json_encode($msg);	

		echo $json;
	}

	function new_msg() {
		$msg = $this->input->post('msg', true);

		$data = ['message' => $msg,'user_id' => $this->session->userdata('user_id')];

		$this->chat_thread->add_msg($data);

		echo json_encode(['sent'=>true]);
	}

	function logout() {
		$newdata = array('user_id' => '');
		$this->session->unset_userdata($newdata);
		$this->session->sess_destroy();
		redirect('/', 'refresh');
	}
}
