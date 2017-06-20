-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 20, 2017 at 04:35 PM
-- Server version: 5.7.18-0ubuntu0.16.04.1
-- PHP Version: 7.0.18-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realtime_message`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `message`) VALUES
(1, '23244'),
(2, '243545'),
(3, 'ssfsgsgd'),
(4, 'uhsvsdsfsf'),
(5, 'afaewett34t~'),
(6, 'sdsdsds'),
(7, 'sdsdsdsds'),
(8, 'Hi1'),
(9, 'ssdsd'),
(10, 'dsdsdsds'),
(11, 'Jack!'),
(12, 'Ambot'),
(13, 'ooo'),
(14, 'haccc'),
(15, 'This is a real-time message'),
(16, 'Again!'),
(17, 'dfdfd'),
(18, 'dsdsd'),
(19, 'sdsds'),
(20, 'fgfgf'),
(21, 'fdf'),
(22, 'dfdf'),
(23, 'dfdfd'),
(24, 'fdfdf'),
(25, 'dsdsd'),
(26, 'Jack'),
(27, 'dfdf'),
(28, 'dsdsd'),
(29, 'ffg'),
(30, 'fdfd'),
(31, 'sdss'),
(32, 'ddfdfdd'),
(33, 'dfdfd'),
(34, 'Hey!');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
