-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: syntaxsquad
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `rating` double DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `desc` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'bd990',160,4.98,'BD 990','headphone','Although not recognized as a specifically designed \'gaming headphone\', with an open-back design,powerful bass, and robust german engineering and with emphasis on comfort, these headphones have become a stable in the gaming community. The open-back design offers the user a very large sound stage making it easy to pinpoint what direction audio comes from, and can be worn for hours.'),(2,'cloud2',90,4.95,'Cloud 2','headphone','HyperX redesigned their Cloud 1s to bring the same product at a more affordable price. It features the same virtualized 7.2 surround sound, an audio control box with volume and mute controls, and detachable mic for on-the-go usage. It\'s main popularity comes from it\'s competative performace at a much lower price point.'),(3,'gpro',70,4.05,'G Pro','mice','Wireless gaming mouse with programable DPI, adjustable weight, and high speed mouse skates preinstalled.'),(4,'modelO',50,4.7,'Model 0','mice','Wired, extremely light gaming mouse with programable DPI and customizable color scheme for the RGB lights.'),(5,'poker3',110,4.88,'Poker 3','keyboard','Wired, extremely durable keyboard featuring soldered PCB, doubleshot ABS key caps, and and entirely aluminum frame.'),(6,'shine7',140,4.34,'Shine 7','keyboard','One of the biggest names in the market brings us the Shine 7, another model in their \'shine\' line up of keyboards now geaturing double-shot seemless PBT keys, a zinc alloy top case, and a very customizable color scheme with RBG led diodes behind every single key.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL DEFAULT '0',
  `username` varchar(15) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `pfppath` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'josephb','hey','/josephbpfp.png','josephb@gmail.com'),(17,'abc','$2b$12$qXkIvgeuhW40NN2ewJw.Qu31EBQ99CMWcbRzCQZw0h1204bIzqZo2','/defaultpath.png','abc'),(18,'def','$2b$12$0wgnndmzRtl.8oZQHDvZduWdysAcl6NNjCDBnFme9OWH9sdyji9pe','/defaultpath.png','def@gmail.com'),(19,'test','$2b$12$Tnm7kWhmdam6pqGMtzc8gO/3d/GmMtXT.rZsGnoePSydaxTApOzzm','/defaultpath.png','email@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-22  0:28:19
