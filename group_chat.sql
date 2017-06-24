-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 24, 2017 at 10:49 PM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.18-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `group_chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `message`, `user_id`) VALUES
(1, '23244', 1),
(2, '243545', 1),
(3, 'ssfsgsgd', 1),
(4, 'uhsvsdsfsf', 1),
(5, 'afaewett34t~', 1),
(6, 'sdsdsds', 1),
(7, 'sdsdsdsds', 1),
(8, 'Hi1', 1),
(9, 'ssdsd', 1),
(10, 'dsdsdsds', 1),
(11, 'Jack!', 1),
(12, 'Ambot', 1),
(13, 'ooo', 1),
(14, 'haccc', 1),
(15, 'This is a real-time message', 1),
(16, 'Again!', 1),
(17, 'dfdfd', 1),
(18, 'dsdsd', 1),
(19, 'sdsds', 1),
(20, 'fgfgf', 1),
(21, 'fdf', 1),
(22, 'dfdf', 1),
(23, 'dfdfd', 1),
(24, 'fdfdf', 1),
(25, 'dsdsd', 1),
(26, 'Jack', 1),
(27, 'dfdf', 1),
(28, 'dsdsd', 1),
(29, 'ffg', 1),
(30, 'fdfd', 1),
(31, 'sdss', 1),
(32, 'ddfdfdd', 1),
(33, 'dfdfd', 1),
(34, 'Hey!', 1),
(35, 'Whoop!', 1),
(36, 'dfdf', 1),
(37, 'ddfdfdd', 1),
(38, 'Halo!', 1),
(39, 'dfdf', 1),
(40, 'Hey!', 1),
(41, 'psst', 1),
(42, 'H!', 1),
(43, 'Hi cgoof!', 2),
(44, 'pss', 1),
(45, 'arms', 1),
(46, 'hu', 2),
(47, 'Hey!', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`) VALUES
(1, 'cgoof', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'owen21', '5f4dcc3b5aa765d61d8327deb882cf99'),
(3, 'zack21', '5f4dcc3b5aa765d61d8327deb882cf99'),
(4, 'hannah21', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'hannah21', '5f4dcc3b5aa765d61d8327deb882cf99'),
(6, 'sdsdsd', 'd41d8cd98f00b204e9800998ecf8427e'),
(7, 'alreigh', '5f4dcc3b5aa765d61d8327deb882cf99'),
(8, '45', 'd41d8cd98f00b204e9800998ecf8427e'),
(9, '32434', '8339b9481dc9b7d4e023f7dc5e8c9bf2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
