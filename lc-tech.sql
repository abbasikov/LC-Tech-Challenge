-- -------------------------------------------------------------
-- TablePlus 3.12.8(368)
--
-- https://tableplus.com/
--
-- Database: lc-tech
-- Generation Time: 2021-05-25 23:32:42.1220
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `answer_key` (
  `asset_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  KEY `LocationID` (`location_id`),
  KEY `ClientID` (`client_id`),
  KEY `EventID` (`event_id`),
  KEY `AssetID` (`asset_id`),
  CONSTRAINT `answer_key_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `answer_key_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`),
  CONSTRAINT `answer_key_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  CONSTRAINT `answer_key_ibfk_4` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `live_stream_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `started_streaming_at` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `stream_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `thumbnail_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4034 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2004 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `start_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `end_time` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `location_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `LocationID` (`location_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `live_stream_key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `live_stream_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `client_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientID` (`client_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `answer_key` (`asset_id`, `location_id`, `client_id`, `event_id`) VALUES
(4000, 3000, 2000, 1000),
(4001, 3000, 2000, 1000),
(4002, 3000, 2000, 1002),
(4003, 3000, 2000, 1003),
(4004, 3001, 2000, 1001),
(4005, 3001, 2000, 1001),
(4006, 3002, 2001, 1004),
(4007, 3003, 2002, 1005),
(4008, 3004, 2003, 1006),
(4009, 3004, 2003, 1006),
(4010, 3004, 2003, 1007),
(4011, 3002, 2001, 1006),
(4031, 3000, 2000, 1000),
(4032, 3000, 2000, 1000),
(4033, 3000, 2000, 1008);

INSERT INTO `assets` (`id`, `live_stream_id`, `started_streaming_at`, `stream_url`, `thumbnail_url`) VALUES
(4000, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:29:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.jpg'),
(4001, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T13:35:05+0000', 'https://example.com/5972b280-485d-4adb-8cb2-d0838bbd61c8.m3u8', 'https://example.com/5972b280-485d-4adb-8cb2-d0838bbd61c8.jpg'),
(4002, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T13:42:32+0000', 'https://example.com/4a05e955-4f20-45d8-b7a1-769c2b57ddce.m3u8', 'https://example.com/4a05e955-4f20-45d8-b7a1-769c2b57ddce.jpg'),
(4003, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T14:03:00+0000', 'https://example.com/b98d8a3c-5462-4863-a4c1-a671b0b96efb.m3u8', 'https://example.com/b98d8a3c-5462-4863-a4c1-a671b0b96efb.jpg'),
(4004, 'b563aa72-6e9b-43a1-8b8c-9dc42f0123f9', '2021-05-01T11:00:00+0000', 'https://example.com/ae976d93-f7e7-4ff3-affe-5a7b4b49b93f.m3u8', 'https://example.com/ae976d93-f7e7-4ff3-affe-5a7b4b49b93f.jpg'),
(4005, 'b563aa72-6e9b-43a1-8b8c-9dc42f0123f9', '2021-05-01T13:35:00+0000', 'https://example.com/edf3000f-fd31-44be-977d-ef065caa7a96.m3u8', 'https://example.com/edf3000f-fd31-44be-977d-ef065caa7a96.jpg'),
(4006, 'bafb5899-a56f-461b-a969-af5f217379d1', '2021-05-01T22:59:23+0000', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4007, 'f158e635-16ef-48ec-bdda-562d453b9354', '2021-05-05T05:15:00+0000', 'https://example.com/2bf6ed39-2cb6-4337-af13-43f6cb11ac85.m3u8', 'https://example.com/2bf6ed39-2cb6-4337-af13-43f6cb11ac85.jpg'),
(4008, '70a1301e-f864-45c3-88af-83eca6462228', '2021-05-05T07:15:00+0000', 'https://example.com/b7404ae2-3ede-46b3-b44c-00488714622b.m3u8', 'https://example.com/b7404ae2-3ede-46b3-b44c-00488714622b.jpg'),
(4009, '70a1301e-f864-45c3-88af-83eca6462228', '2021-05-05T07:16:23+0000', 'https://example.com/5cc61ad9-ba33-47d3-b9b4-5194d56e6c6b.m3u8', 'https://example.com/5cc61ad9-ba33-47d3-b9b4-5194d56e6c6b.jpg'),
(4010, '70a1301e-f864-45c3-88af-83eca6462228', '2021-05-05T09:00:55+0000', 'https://example.com/490aa552-cb26-400c-939b-0c838b367d00.m3u8', 'https://example.com/490aa552-cb26-400c-939b-0c838b367d00.jpg'),
(4011, 'bafb5899-a56f-461b-a969-af5f217379d1', '2021-05-05T09:00:34+0000', 'https://example.com/b98d8a3c-5462-4863-a4c1-a671b0b96efb.m3u8', 'https://example.com/b98d8a3c-5462-4863-a4c1-a671b0b96efb.jpg'),
(4023, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4024, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4025, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4026, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4027, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4028, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4029, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4030, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4031, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4032, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T12:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg'),
(4033, '9bb50372-5b50-443d-8e23-9d8cf4a3befa', '2021-05-01T17:39:54+0000', 'https://example.com/9e858dd5-d49b-4a83-8401-1eb4d48c4f02.m3u8', 'https://example.com/c4e794f4-8edb-431a-aa28-a211fdb5ec50.jpg');

INSERT INTO `clients` (`id`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(2000, 'umair@gmail.com', '$2b$10$WUtRbkAmNaJkCvR..or0iuGAbyHwFKLf2dYh6rIjUmaIivVCGDM9e', '2021-05-19 18:15:37', '2021-05-19 18:15:37'),
(2001, 'hunter@gmail.com', '$2b$10$GyHfP0L6rG0nZxWrztCPcelyKaEMlEyFCVWCGo.fqeVItE8DqUmbG', '2021-05-22 18:32:48', '2021-05-22 18:32:48'),
(2002, 'umair86@gmail.com', '$2b$10$BxN1wYwOhY49utqRsFcz8e.6TGUUfoZZ/N.GTAoWWFTmLUUBQC.MW', '2021-05-22 18:33:02', '2021-05-22 18:33:02'),
(2003, 'test@gmail.com', '$2b$10$foLUoxC9piaHmV6a.aIUxOKzQshjn4.nSD/dGQEuW1P7iaEjL80fm', '2021-05-22 18:34:43', '2021-05-22 18:34:43');

INSERT INTO `events` (`id`, `title`, `description`, `start_time`, `end_time`, `location_id`) VALUES
(1000, 'Sample Event A', 'Description A', '2021-05-01T12:30:00+0000', '2021-05-01T13:30:00+0000', 3000),
(1001, 'Sample Event B', 'Description B', '2021-05-01T11:00:00+0000', '2021-05-01T14:00:00+0000', 3001),
(1002, 'Sample Event C', 'Description C', '2021-05-01T13:35:00+0000', '2021-05-01T14:00:00+0000', 3000),
(1003, 'Sample Event D', 'Description D', '2021-05-01T14:05:00+0000', '2021-05-01T14:45:00+0000', 3000),
(1004, 'Sample Event E', 'Description E', '2021-05-01T23:00:00+0000', '2021-05-02T01:00:00+0000', 3002),
(1005, 'Sample Event F', 'Description F', '2021-05-05T05:00:00+0000', '2021-05-05T05:45:00+0000', 3003),
(1006, 'Sample Event G', 'Description G', '2021-05-05T07:15:00+0000', '2021-05-05T07:45:00+0000', 3004),
(1007, 'Sample Event H', 'Description H', '2021-05-05T09:15:00+0000', '2021-05-05T09:45:00+0000', 3004),
(1008, 'Client # 2000 was Live', '', '', '', 3000);

INSERT INTO `locations` (`id`, `live_stream_key`, `live_stream_id`, `client_id`) VALUES
(3000, 'd1c958ff-6155-4a68-ab07-28213befec51', '9bb50372-5b50-443d-8e23-9d8cf4a3befa', 2000),
(3001, 'b63ddd9b-1ef2-445b-b214-40f8a847523f', 'b563aa72-6e9b-43a1-8b8c-9dc42f0123f9', 2000),
(3002, '453e0d48-22cd-4a27-9a2d-b2fd006983bb', 'bafb5899-a56f-461b-a969-af5f217379d1', 2001),
(3003, 'fc28bdec-2d53-45ca-807c-9fd935d90de4', 'f158e635-16ef-48ec-bdda-562d453b9354', 2002),
(3004, '02889898-97e9-46b3-9dbf-1261ab28f44f', '70a1301e-f864-45c3-88af-83eca6462228', 2003);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;