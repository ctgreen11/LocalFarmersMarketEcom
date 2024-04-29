-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 29, 2024 at 10:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FarmersMarketEcomm`
--

-- --------------------------------------------------------

--
-- Table structure for table `Farmer`
--

CREATE TABLE `Farmer` (
  `FarmerID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Farmer`
--

INSERT INTO `Farmer` (`FarmerID`, `Name`, `Password`, `Email`) VALUES
(100001, 'John Doe', 'password123', 'john.doe@example.com'),
(100002, 'Jane Smith', 'securepass', 'jane.smith@example.com'),
(100003, 'Michael Johnson', 'pass123word', 'michael.johnson@example.com'),
(100004, 'Emily Brown', 'brownie123', 'emily.brown@example.com');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `Status` enum('pending','processing','completed','cancelled') DEFAULT 'pending',
  `UserID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `ProductID` int(11) NOT NULL,
  `FarmerID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Price` decimal(12,2) NOT NULL,
  `Category` enum('Fruit','Vegetable','Grain') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`ProductID`, `FarmerID`, `Name`, `Price`, `Category`) VALUES
(100000, 100001, 'Apples', 2.50, 'Fruit'),
(100001, 100002, 'Oranges', 3.00, 'Fruit'),
(100002, 100003, 'Bananas', 1.75, 'Fruit'),
(100003, 100004, 'Strawberries', 4.25, 'Fruit'),
(100004, 100001, 'Tomatoes', 2.00, 'Fruit'),
(100005, 100002, 'Lemons', 1.50, 'Fruit'),
(100006, 100003, 'Carrots', 2.25, 'Vegetable'),
(100007, 100004, 'Lettuce', 1.75, 'Vegetable'),
(100008, 100001, 'Potatoes', 2.50, 'Vegetable'),
(100009, 100004, 'Wheat', 0.25, 'Grain');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Name`, `Password`, `Email`) VALUES
(100001, 'Sarah Johnson', 'sarahpass', 'sarah.johnson@example.com'),
(100002, 'David Lee', 'david123', 'david.lee@example.com'),
(100003, 'Michelle Adams', 'michellepass', 'michelle.adams@example.com'),
(100004, 'Christopher Brown', 'chrisbrown', 'chris.brown@example.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Farmer`
--
ALTER TABLE `Farmer`
  ADD PRIMARY KEY (`FarmerID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`ProductID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Farmer`
--
ALTER TABLE `Farmer`
  MODIFY `FarmerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100017;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2109924;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100006;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
