<?php
defined('BASEPATH') OR exit('No direct script access allowed');

Class Chat_thread extends CI_Model {

	function add_msg($data) {
		return $this->db->insert('message',$data);
	}

	function get_msg() {
		$this->db->select()->from('message');
		$result = $this->db->get();
		return $result->result();
	}
}

?>