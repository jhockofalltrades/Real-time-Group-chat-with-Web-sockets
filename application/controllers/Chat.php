<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {
	
	function index() {
		$this->load->view('chat_app');
	}

	function load_msg() {
		header('Content-Type: application/json'); 

		$msg = $this->chat_thread->get_msg();
		
		$json = json_encode($msg);	

		echo $json;
	}

	function new_msg() {
		$msg = $this->input->post('msg', true);

		$data = ['message' => $msg];

		$this->chat_thread->add_msg($data);

		echo json_encode(['sent'=>true]);
	}
}
