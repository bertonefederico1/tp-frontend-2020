-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tpbackend
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articulos`
--

DROP TABLE IF EXISTS `articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `articulos` (
  `id_articulo` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` text COLLATE utf8mb4_unicode_ci,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_articulo`),
  UNIQUE KEY `id_articulo_UNIQUE` (`id_articulo`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articulos`
--

LOCK TABLES `articulos` WRITE;
/*!40000 ALTER TABLE `articulos` DISABLE KEYS */;
INSERT INTO `articulos` VALUES (153,'TV 40\" Noblex',45000.00,8,'',1),(154,'Notebook HP 14\" 4gb 1tb',75000.00,9,'https://www.casasilvia.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/h/p/hp-notebook-15.6-15da0051la-celeron-500g-4g.jpg',1),(155,'Lavarropa automatico Drean ',58640.00,0,NULL,1);
/*!40000 ALTER TABLE `articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `dni` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_cliente_UNIQUE` (`id_cliente`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (133,'37817515','Alberto','Perez','Catamarca 1111','424555',1),(134,'40980999','Elsa','Lame','Alberdi 1280','15546782',1),(135,'14205964','Armando','Paredes','Rivadavia 560 bis','15565793',1);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `proveedores` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `cuit` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `razon_social` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE KEY `id_proveedor_UNIQUE` (`id_proveedor`),
  UNIQUE KEY `cuit_UNIQUE` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (17,'25-25987888-5','Merco S.A','Rosario','Alvear 235 bis','3465-15457799',1),(18,'21-31000841-1','Klaus SRL','Casilda','Santa Fe ','421444',1),(19,'20-14568222-9','New San S.A','Buenos Aires','Gral. Paz 890','011-4252225',1);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores_articulos`
--

DROP TABLE IF EXISTS `proveedores_articulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `proveedores_articulos` (
  `id_proveedor` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `fecha_compra` timestamp NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `cantidad` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_proveedor`,`id_articulo`,`fecha_compra`),
  KEY `fk_provArt_articulos_idx` (`id_articulo`),
  CONSTRAINT `fk_provArt_articulos` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id_articulo`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_provArt_proveedores` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores_articulos`
--

LOCK TABLES `proveedores_articulos` WRITE;
/*!40000 ALTER TABLE `proveedores_articulos` DISABLE KEYS */;
INSERT INTO `proveedores_articulos` VALUES (17,153,'2020-06-01 20:30:44',40000.00,'3'),(18,154,'2020-06-01 20:27:26',69000.00,'9'),(19,153,'2020-06-01 20:26:54',38000.00,'5');
/*!40000 ALTER TABLE `proveedores_articulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tpbackend'
--

--
-- Dumping routines for database 'tpbackend'
--
/*!50003 DROP PROCEDURE IF EXISTS `ultimoProveedorPorArticulo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ultimoProveedorPorArticulo`(IN id int)
BEGIN
	SELECT MAX(fecha_compra) INTO @ult_fecha
	FROM proveedores_articulos
	WHERE id_articulo = id;

	DROP TEMPORARY TABLE IF EXISTS ult_compra;
    CREATE TEMPORARY TABLE ult_compra
	SELECT pa.id_articulo, p.id_proveedor, fecha_compra
	FROM proveedores_articulos pa
    INNER JOIN proveedores p
		ON p.id_proveedor = pa.id_proveedor
	WHERE fecha_compra = @ult_fecha
	GROUP BY id_articulo, id_proveedor;
    
    SELECT p.cuit, p.razon_social, pa.precio_unitario, pa.fecha_compra
    FROM proveedores p
	INNER JOIN proveedores_articulos pa
		ON p.id_proveedor = pa.id_proveedor
	INNER JOIN ult_compra uc
		ON pa.id_proveedor = uc.id_proveedor
        AND pa.id_articulo = uc.id_articulo
        AND pa.fecha_compra = @ult_fecha;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-09 20:50:57
