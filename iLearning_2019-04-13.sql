# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: iLearning
# Generation Time: 2019-04-13 09:51:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Accout
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Accout`;

CREATE TABLE `Accout` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Pass` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Admin`;

CREATE TABLE `Admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `AcID` int(11) unsigned NOT NULL,
  `Phone` int(10) DEFAULT NULL,
  `IsAdmin` tinyint(1) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AcID` (`AcID`),
  CONSTRAINT `Admin_ibfk_1` FOREIGN KEY (`AcID`) REFERENCES `Accout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table AssignFormCourse
# ------------------------------------------------------------

DROP TABLE IF EXISTS `AssignFormCourse`;

CREATE TABLE `AssignFormCourse` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int(11) unsigned NOT NULL,
  `CourseID` int(11) unsigned NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Messages` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserID` (`UserID`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `AssignFormCourse_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`id`),
  CONSTRAINT `AssignFormCourse_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Course`;

CREATE TABLE `Course` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `AdminId` int(11) unsigned NOT NULL,
  `Ratting` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AdminId` (`AdminId`),
  CONSTRAINT `Course_ibfk_1` FOREIGN KEY (`AdminId`) REFERENCES `Admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Document
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Document`;

CREATE TABLE `Document` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) unsigned NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Location` varchar(255) NOT NULL DEFAULT '',
  `Author` varchar(255) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Reference` varchar(255) DEFAULT NULL,
  `Capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `Document_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Forum
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Forum`;

CREATE TABLE `Forum` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `AdminID` int(11) unsigned NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `DateCreate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AdminID` (`AdminID`),
  CONSTRAINT `Forum_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `Admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Quiz
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Quiz`;

CREATE TABLE `Quiz` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) unsigned NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `AminID` int(11) unsigned NOT NULL,
  `Ratting` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CourseID` (`CourseID`),
  KEY `AminID` (`AminID`),
  CONSTRAINT `Quiz_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`id`),
  CONSTRAINT `Quiz_ibfk_2` FOREIGN KEY (`AminID`) REFERENCES `Admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Script
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Script`;

CREATE TABLE `Script` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int(11) unsigned NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `Detail` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `Script_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `AcID` int(11) unsigned NOT NULL,
  `Phone` int(10) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `AcID` (`AcID`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`AcID`) REFERENCES `Accout` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Video
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Video`;

CREATE TABLE `Video` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) unsigned NOT NULL,
  `Title` varchar(255) DEFAULT '',
  `Location` varchar(255) NOT NULL DEFAULT '',
  `Capacity` int(11) DEFAULT NULL,
  `Time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CourseID` (`CourseID`),
  CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
