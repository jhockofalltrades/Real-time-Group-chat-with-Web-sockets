<?php
defined('BASEPATH') OR exit('No direct script access allowed');

Class Chat_thread extends CI_Model {

	function add_msg($data) {
		return $this->db->insert('message',$data);
	}

	function get_msg() {
		$this->db->select('user.username as username, message.message as message')->from('user');
		$this->db->join('message','user.user_id = message.user_id');
		$result = $this->db->get();
		return $result->result();
	}

	function add_user($data) {
		return $this->db->insert('user', $data);
	}

	function login($username, $password) {
		$where = array(
			'username' => $username,
			'password' => md5($password)
			);

		$this->db->select()->from('user')->where($where);
		$query = $this->db->get();
		return $query->first_row();
	}


}

?>