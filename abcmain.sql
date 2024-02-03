CREATE DATABASE  IF NOT EXISTS `cafenodejs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cafenodejs`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: cafenodejs
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contactNumber` varchar(20) NOT NULL,
  `paymentMethod` varchar(20) NOT NULL,
  `total` int NOT NULL,
  `productDetail` json DEFAULT NULL,
  `createdBy` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
INSERT INTO `bill` VALUES (35,'790938c0-b886-11ee-a87b-230f02737fbd','b','b@gmail.com','1234567890','credit Card',160,'[{\"id\": 12, \"name\": \"vanela\", \"price\": 50, \"total\": 100, \"category\": \"gathiya\", \"quantity\": \"2\"}, {\"id\": 10, \"name\": \"nan\", \"price\": 30, \"total\": 60, \"category\": \"kulcha\", \"quantity\": \"2\"}]','sandip@gmail.com'),(37,'96f26db0-b887-11ee-b13f-310f514f874a','krutik','k@gmail.com','1234567890','cash',220,'[{\"id\": 9, \"name\": \"chees chili\", \"price\": 110, \"total\": 220, \"category\": \"sandwich\", \"quantity\": \"2\"}]','sandip@gmail.com'),(38,'d03fc540-b887-11ee-b13f-310f514f874a','sandip','s@gmail.com','1234567890','cash',820,'[{\"id\": 9, \"name\": \"chees chili\", \"price\": 110, \"total\": 220, \"category\": \"sandwich\", \"quantity\": \"2\"}, {\"id\": 10, \"name\": \"nan\", \"price\": 30, \"total\": 600, \"category\": \"kulcha\", \"quantity\": \"20\"}]','sandip@gmail.com'),(41,'98fcca60-b88c-11ee-b13f-310f514f874a','s','s@gmail.com','1234567890','cash',100,'[{\"id\": 12, \"name\": \"vanela\", \"price\": 50, \"total\": 100, \"category\": \"gathiya\", \"quantity\": \"2\"}]','sandip@gmail.com'),(42,'1ffe7650-b926-11ee-98b3-3b45dd072c52','krutik','k@gmail.com','1234567890','credit Card',60,'[{\"id\": 10, \"name\": \"nan\", \"price\": 30, \"total\": 60, \"category\": \"kulcha\", \"quantity\": \"2\"}]','sandip@gmail.com'),(43,'e5bb43b0-b93e-11ee-98b3-3b45dd072c52','bansi','bansi@gmail.com','7984370336','UPI',120,'[{\"id\": 10, \"name\": \"nan\", \"price\": 30, \"total\": 120, \"category\": \"kulcha\", \"quantity\": \"4\"}]','sandip@gmail.com'),(44,'53c93dc0-b94a-11ee-98b3-3b45dd072c52','dharmen','d@gmail.com','1234567890','cash',250,'[{\"id\": 12, \"name\": \"vanela\", \"price\": 50, \"total\": 250, \"category\": \"gathiya\", \"quantity\": \"5\"}]','sandip@gmail.com'),(45,'c6a6e520-b951-11ee-98b3-3b45dd072c52','basu','basu@gmail.com','1234567890','cash',100,'[{\"id\": 12, \"name\": \"vanela\", \"price\": 50, \"total\": 100, \"category\": \"gathiya\", \"quantity\": \"2\"}]','bans@gmail.com');
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (16,'gathiya'),(17,'kulcha'),(18,'sandwich');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `categoryId` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (7,'chai',4,'elaichi chai',45,'true'),(9,'chees chili',18,'maslacheese toast',110,'true'),(10,'nan',17,'cheese nan',30,'true'),(11,'grilled',18,'grilled with masala',60,'true'),(12,'vanela',16,'vanela garam',50,'true');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `contactNumber` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12,'sandip','7984370336','sandip@gmail.com','bansi','true','admin'),(13,'bansi','1234567890','bansi@gmail.com','sandip','true','user'),(14,'krutik','1234567890','k@gmail.com','kesha','false','user'),(15,'jay','1234567890','jay@gmail.com','jay','true','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-03  3:38:07
