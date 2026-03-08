-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 22 juin 2025 à 11:12
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `globeautolink`
--

-- --------------------------------------------------------

--
-- Structure de la table `carads`
--

CREATE TABLE `carads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `original_pub_date` date NOT NULL,
  `original_url` varchar(500) DEFAULT NULL,
  `local_url` varchar(500) DEFAULT NULL,
  `scraped_date` datetime NOT NULL DEFAULT current_timestamp(),
  `carBrand` varchar(100) NOT NULL,
  `carModel` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `currentMiles` int(11) NOT NULL,
  `carType` enum('SUV','Sedan','Hatchback') NOT NULL,
  `energy` enum('Electric','Diesel','Petrol','Hybrid') NOT NULL,
  `country` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `gearbox` enum('Manual','Automatic') NOT NULL,
  `wd` enum('2WD','4WD') NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `enginesize` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `carads`
--

INSERT INTO `carads` (`id`, `title`, `original_pub_date`, `original_url`, `local_url`, `scraped_date`, `carBrand`, `carModel`, `year`, `currentMiles`, `carType`, `energy`, `country`, `price`, `gearbox`, `wd`, `is_available`, `enginesize`) VALUES
(2, 'Peugeot 5008', '0000-00-00', 'https://www.spoticar.fr/voitures-occasion/peugeot-5008-puretech-130ch-ss-eat8-active-pack-cote-d-or-chenove-1203552736', 'url', '2025-06-03 19:23:39', 'Peugeot', '5008', '2021', 114844, 'Sedan', 'Petrol', 'France', 18489.00, 'Automatic', '', 1, 1199),
(3, 'Citroën C3', '0000-00-00', 'https://www.spoticar.fr/voitures-occasion/citroen-c3-puretech-110-ch-bvm6-max-rhone-corbas-1203548991', 'url', '2025-06-03 19:24:17', 'Citroën', 'C3', '2024', 19193, 'Hatchback', 'Petrol', 'France', 13865.00, 'Manual', '', 1, 1199),
(4, 'Smart Fortwo - PASSION COUPE 90HP - 2016\nID: CO4687', '0000-00-00', 'https://caroutlet.es/car/smart-fortwo-2016-2/', 'url', '2025-06-03 19:27:12', 'Smart', 'Fortwo', '2016', 66707, 'Sedan', 'Petrol', 'Spain', 9995.00, 'Automatic', '', 1, 898),
(5, 'Ford Fiesta - NEW FIESTA TREND + 84HP - 2018\nID: CO4690', '0000-00-00', 'https://caroutlet.es/car/ford-fiesta-2018-7/', 'url', '2025-06-03 19:27:36', 'Ford', 'Fiesta', '2018', 80680, 'Hatchback', 'Petrol', 'Spain', 11495.00, 'Manual', '', 1, 998),
(6, 'Mercedes GLA Class - GLA 200 FULL AMG PACK 156HP - 2020\nID: CO4731', '0000-00-00', 'https://caroutlet.es/car/mercedes-gla-class-2020/', 'url', '2025-06-03 19:28:04', 'Mercedes', 'GLA', '2020', 56777, 'SUV', 'Petrol', 'Spain', 29995.00, 'Automatic', '', 1, 1332),
(8, 'Peugeot 308', '0000-00-00', 'https://www.romana-auto.it/usate/peugeot-308-bluehdi-130-s%26s-eat8-allure-pack-a22938/', 'url', '2025-06-03 19:31:52', 'Peugeot', '308', '2023', 72866, '', 'Diesel', 'Italien', 19450.00, 'Manual', '', 1, 1499),
(9, 'Volkswagen T-Cross', '0000-00-00', 'https://www.romana-auto.it/usate/volkswagen-t-cross-1-0-tsi-life-con-montaggio-gpl-a21599/', 'url', '2025-06-03 19:32:03', 'Volkswagen', 'T-Cross', '2024', 22421, '', 'Petrol', 'Italien', 17750.00, 'Manual', '', 1, 999),
(10, 'Toyota Yaris Cross', '0000-00-00', 'https://www.romana-auto.it/usate/toyota-yaris-cross-1-5-hybrid-5p--e-cvt-awd-i-business-a21583/', 'url', '2025-06-03 19:32:12', 'Toyota', 'Yaris', '2024', 6781, '', 'Hybrid', 'Italien', 24600.00, 'Manual', '', 1, 1496);

-- --------------------------------------------------------

--
-- Structure de la table `caradsimages`
--

CREATE TABLE `caradsimages` (
  `image_id` int(11) NOT NULL,
  `carads_id` int(11) NOT NULL,
  `image_title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `caradsimages`
--

INSERT INTO `caradsimages` (`image_id`, `carads_id`, `image_title`, `image_url`) VALUES
(26, 2, 'car_2_0.jpg', '/uploads/car_2_0.jpg'),
(27, 2, 'car_2_1.jpg', '/uploads/car_2_1.jpg'),
(28, 2, 'car_2_2.jpg', '/uploads/car_2_2.jpg'),
(29, 2, 'car_2_3.jpg', '/uploads/car_2_3.jpg'),
(30, 2, 'car_2_4.jpg', '/uploads/car_2_4.jpg'),
(31, 2, 'car_2_5.jpg', '/uploads/car_2_5.jpg'),
(32, 2, 'car_2_6.jpg', '/uploads/car_2_6.jpg'),
(33, 2, 'car_2_7.jpg', '/uploads/car_2_7.jpg'),
(34, 2, 'car_2_8.jpg', '/uploads/car_2_8.jpg'),
(35, 2, 'car_2_9.jpg', '/uploads/car_2_9.jpg'),
(36, 2, 'car_2_10.jpg', '/uploads/car_2_10.jpg'),
(37, 2, 'car_2_11.jpg', '/uploads/car_2_11.jpg'),
(38, 2, 'car_2_12.jpg', '/uploads/car_2_12.jpg'),
(39, 2, 'car_2_13.jpg', '/uploads/car_2_13.jpg'),
(40, 2, 'car_2_14.jpg', '/uploads/car_2_14.jpg'),
(41, 2, 'car_2_15.jpg', '/uploads/car_2_15.jpg'),
(42, 2, 'car_2_16.jpg', '/uploads/car_2_16.jpg'),
(43, 2, 'car_2_17.jpg', '/uploads/car_2_17.jpg'),
(44, 2, 'car_2_18.jpg', '/uploads/car_2_18.jpg'),
(45, 2, 'car_2_19.jpg', '/uploads/car_2_19.jpg'),
(46, 2, 'car_2_20.jpg', '/uploads/car_2_20.jpg'),
(47, 2, 'car_2_21.jpg', '/uploads/car_2_21.jpg'),
(48, 2, 'car_2_22.jpg', '/uploads/car_2_22.jpg'),
(49, 2, 'car_2_23.jpg', '/uploads/car_2_23.jpg'),
(50, 2, 'car_2_24.jpg', '/uploads/car_2_24.jpg'),
(51, 2, 'car_2_25.jpg', '/uploads/car_2_25.jpg'),
(52, 2, 'car_2_26.jpg', '/uploads/car_2_26.jpg'),
(53, 2, 'car_2_27.jpg', '/uploads/car_2_27.jpg'),
(54, 2, 'car_2_28.jpg', '/uploads/car_2_28.jpg'),
(55, 2, 'car_2_29.jpg', '/uploads/car_2_29.jpg'),
(56, 2, 'car_2_30.jpg', '/uploads/car_2_30.jpg'),
(57, 2, 'car_2_31.jpg', '/uploads/car_2_31.jpg'),
(58, 2, 'car_2_32.jpg', '/uploads/car_2_32.jpg'),
(59, 3, 'car_3_0.jpg', '/uploads/car_3_0.jpg'),
(60, 3, 'car_3_1.jpg', '/uploads/car_3_1.jpg'),
(61, 3, 'car_3_2.jpg', '/uploads/car_3_2.jpg'),
(62, 3, 'car_3_3.jpg', '/uploads/car_3_3.jpg'),
(63, 3, 'car_3_4.jpg', '/uploads/car_3_4.jpg'),
(64, 3, 'car_3_5.jpg', '/uploads/car_3_5.jpg'),
(65, 3, 'car_3_6.jpg', '/uploads/car_3_6.jpg'),
(66, 3, 'car_3_7.jpg', '/uploads/car_3_7.jpg'),
(67, 3, 'car_3_8.jpg', '/uploads/car_3_8.jpg'),
(68, 3, 'car_3_9.jpg', '/uploads/car_3_9.jpg'),
(69, 3, 'car_3_10.jpg', '/uploads/car_3_10.jpg'),
(70, 3, 'car_3_11.jpg', '/uploads/car_3_11.jpg'),
(71, 3, 'car_3_12.jpg', '/uploads/car_3_12.jpg'),
(72, 3, 'car_3_13.jpg', '/uploads/car_3_13.jpg'),
(73, 3, 'car_3_14.jpg', '/uploads/car_3_14.jpg'),
(74, 3, 'car_3_15.jpg', '/uploads/car_3_15.jpg'),
(75, 3, 'car_3_16.jpg', '/uploads/car_3_16.jpg'),
(76, 3, 'car_3_17.jpg', '/uploads/car_3_17.jpg'),
(77, 3, 'car_3_18.jpg', '/uploads/car_3_18.jpg'),
(78, 3, 'car_3_19.jpg', '/uploads/car_3_19.jpg'),
(79, 3, 'car_3_20.jpg', '/uploads/car_3_20.jpg'),
(80, 3, 'car_3_21.jpg', '/uploads/car_3_21.jpg'),
(81, 3, 'car_3_22.jpg', '/uploads/car_3_22.jpg'),
(82, 3, 'car_3_23.jpg', '/uploads/car_3_23.jpg'),
(83, 3, 'car_3_24.jpg', '/uploads/car_3_24.jpg'),
(84, 4, 'car_4_0.jpg', '/uploads/car_4_0.jpg'),
(85, 4, 'car_4_1.jpg', '/uploads/car_4_1.jpg'),
(86, 4, 'car_4_2.jpg', '/uploads/car_4_2.jpg'),
(87, 4, 'car_4_3.jpg', '/uploads/car_4_3.jpg'),
(88, 4, 'car_4_4.jpg', '/uploads/car_4_4.jpg'),
(89, 4, 'car_4_5.jpg', '/uploads/car_4_5.jpg'),
(90, 4, 'car_4_6.jpg', '/uploads/car_4_6.jpg'),
(91, 4, 'car_4_7.jpg', '/uploads/car_4_7.jpg'),
(92, 4, 'car_4_8.jpg', '/uploads/car_4_8.jpg'),
(93, 4, 'car_4_9.jpg', '/uploads/car_4_9.jpg'),
(94, 4, 'car_4_10.jpg', '/uploads/car_4_10.jpg'),
(95, 4, 'car_4_11.jpg', '/uploads/car_4_11.jpg'),
(96, 4, 'car_4_12.jpg', '/uploads/car_4_12.jpg'),
(97, 4, 'car_4_13.jpg', '/uploads/car_4_13.jpg'),
(98, 4, 'car_4_14.jpg', '/uploads/car_4_14.jpg'),
(99, 4, 'car_4_15.jpg', '/uploads/car_4_15.jpg'),
(100, 4, 'car_4_16.jpg', '/uploads/car_4_16.jpg'),
(101, 4, 'car_4_17.jpg', '/uploads/car_4_17.jpg'),
(102, 4, 'car_4_18.jpg', '/uploads/car_4_18.jpg'),
(103, 4, 'car_4_19.jpg', '/uploads/car_4_19.jpg'),
(104, 4, 'car_4_20.jpg', '/uploads/car_4_20.jpg'),
(105, 4, 'car_4_21.jpg', '/uploads/car_4_21.jpg'),
(106, 4, 'car_4_22.jpg', '/uploads/car_4_22.jpg'),
(107, 4, 'car_4_23.jpg', '/uploads/car_4_23.jpg'),
(108, 4, 'car_4_24.jpg', '/uploads/car_4_24.jpg'),
(109, 4, 'car_4_25.jpg', '/uploads/car_4_25.jpg'),
(110, 4, 'car_4_26.jpg', '/uploads/car_4_26.jpg'),
(111, 5, 'car_5_0.jpg', '/uploads/car_5_0.jpg'),
(112, 5, 'car_5_1.jpg', '/uploads/car_5_1.jpg'),
(113, 5, 'car_5_2.jpg', '/uploads/car_5_2.jpg'),
(114, 5, 'car_5_3.jpg', '/uploads/car_5_3.jpg'),
(115, 5, 'car_5_4.jpg', '/uploads/car_5_4.jpg'),
(116, 5, 'car_5_5.jpg', '/uploads/car_5_5.jpg'),
(117, 5, 'car_5_6.jpg', '/uploads/car_5_6.jpg'),
(118, 5, 'car_5_7.jpg', '/uploads/car_5_7.jpg'),
(119, 5, 'car_5_8.jpg', '/uploads/car_5_8.jpg'),
(120, 5, 'car_5_9.jpg', '/uploads/car_5_9.jpg'),
(121, 5, 'car_5_10.jpg', '/uploads/car_5_10.jpg'),
(122, 5, 'car_5_11.jpg', '/uploads/car_5_11.jpg'),
(123, 5, 'car_5_12.jpg', '/uploads/car_5_12.jpg'),
(124, 5, 'car_5_13.jpg', '/uploads/car_5_13.jpg'),
(125, 5, 'car_5_14.jpg', '/uploads/car_5_14.jpg'),
(126, 5, 'car_5_15.jpg', '/uploads/car_5_15.jpg'),
(127, 5, 'car_5_16.jpg', '/uploads/car_5_16.jpg'),
(128, 5, 'car_5_17.jpg', '/uploads/car_5_17.jpg'),
(129, 5, 'car_5_18.jpg', '/uploads/car_5_18.jpg'),
(130, 5, 'car_5_19.jpg', '/uploads/car_5_19.jpg'),
(131, 5, 'car_5_20.jpg', '/uploads/car_5_20.jpg'),
(132, 5, 'car_5_21.jpg', '/uploads/car_5_21.jpg'),
(133, 5, 'car_5_22.jpg', '/uploads/car_5_22.jpg'),
(134, 5, 'car_5_23.jpg', '/uploads/car_5_23.jpg'),
(135, 5, 'car_5_24.jpg', '/uploads/car_5_24.jpg'),
(136, 5, 'car_5_25.jpg', '/uploads/car_5_25.jpg'),
(137, 5, 'car_5_26.jpg', '/uploads/car_5_26.jpg'),
(138, 5, 'car_5_27.jpg', '/uploads/car_5_27.jpg'),
(139, 5, 'car_5_28.jpg', '/uploads/car_5_28.jpg'),
(140, 5, 'car_5_29.jpg', '/uploads/car_5_29.jpg'),
(141, 5, 'car_5_30.jpg', '/uploads/car_5_30.jpg'),
(142, 5, 'car_5_31.jpg', '/uploads/car_5_31.jpg'),
(143, 5, 'car_5_32.jpg', '/uploads/car_5_32.jpg'),
(144, 6, 'car_6_0.jpg', '/uploads/car_6_0.jpg'),
(145, 6, 'car_6_1.jpg', '/uploads/car_6_1.jpg'),
(146, 6, 'car_6_2.jpg', '/uploads/car_6_2.jpg'),
(147, 6, 'car_6_3.jpg', '/uploads/car_6_3.jpg'),
(148, 6, 'car_6_4.jpg', '/uploads/car_6_4.jpg'),
(149, 6, 'car_6_5.jpg', '/uploads/car_6_5.jpg'),
(150, 6, 'car_6_6.jpg', '/uploads/car_6_6.jpg'),
(151, 6, 'car_6_7.jpg', '/uploads/car_6_7.jpg'),
(152, 6, 'car_6_8.jpg', '/uploads/car_6_8.jpg'),
(153, 6, 'car_6_9.jpg', '/uploads/car_6_9.jpg'),
(154, 6, 'car_6_10.jpg', '/uploads/car_6_10.jpg'),
(155, 6, 'car_6_11.jpg', '/uploads/car_6_11.jpg'),
(156, 6, 'car_6_12.jpg', '/uploads/car_6_12.jpg'),
(157, 6, 'car_6_13.jpg', '/uploads/car_6_13.jpg'),
(158, 6, 'car_6_14.jpg', '/uploads/car_6_14.jpg'),
(159, 6, 'car_6_15.jpg', '/uploads/car_6_15.jpg'),
(160, 6, 'car_6_16.jpg', '/uploads/car_6_16.jpg'),
(161, 6, 'car_6_17.jpg', '/uploads/car_6_17.jpg'),
(162, 6, 'car_6_18.jpg', '/uploads/car_6_18.jpg'),
(163, 6, 'car_6_19.jpg', '/uploads/car_6_19.jpg'),
(164, 6, 'car_6_20.jpg', '/uploads/car_6_20.jpg'),
(165, 6, 'car_6_21.jpg', '/uploads/car_6_21.jpg'),
(166, 6, 'car_6_22.jpg', '/uploads/car_6_22.jpg'),
(167, 6, 'car_6_23.jpg', '/uploads/car_6_23.jpg'),
(168, 6, 'car_6_24.jpg', '/uploads/car_6_24.jpg'),
(169, 6, 'car_6_25.jpg', '/uploads/car_6_25.jpg'),
(170, 6, 'car_6_26.jpg', '/uploads/car_6_26.jpg'),
(171, 6, 'car_6_27.jpg', '/uploads/car_6_27.jpg'),
(172, 6, 'car_6_28.jpg', '/uploads/car_6_28.jpg'),
(173, 6, 'car_6_29.jpg', '/uploads/car_6_29.jpg'),
(174, 6, 'car_6_30.jpg', '/uploads/car_6_30.jpg'),
(175, 6, 'car_6_31.jpg', '/uploads/car_6_31.jpg'),
(176, 6, 'car_6_32.jpg', '/uploads/car_6_32.jpg'),
(177, 6, 'car_6_33.jpg', '/uploads/car_6_33.jpg'),
(178, 6, 'car_6_34.jpg', '/uploads/car_6_34.jpg'),
(179, 6, 'car_6_35.jpg', '/uploads/car_6_35.jpg'),
(180, 6, 'car_6_36.jpg', '/uploads/car_6_36.jpg'),
(181, 6, 'car_6_37.jpg', '/uploads/car_6_37.jpg'),
(182, 6, 'car_6_38.jpg', '/uploads/car_6_38.jpg'),
(183, 8, 'car_8_0.jpg', '/uploads/car_8_0.jpg'),
(184, 8, 'car_8_1.jpg', '/uploads/car_8_1.jpg'),
(185, 8, 'car_8_2.jpg', '/uploads/car_8_2.jpg'),
(186, 8, 'car_8_3.jpg', '/uploads/car_8_3.jpg'),
(187, 8, 'car_8_4.jpg', '/uploads/car_8_4.jpg'),
(188, 9, 'car_9_0.jpg', '/uploads/car_9_0.jpg'),
(189, 9, 'car_9_1.jpg', '/uploads/car_9_1.jpg'),
(190, 9, 'car_9_2.jpg', '/uploads/car_9_2.jpg'),
(191, 9, 'car_9_3.jpg', '/uploads/car_9_3.jpg'),
(192, 9, 'car_9_4.jpg', '/uploads/car_9_4.jpg'),
(193, 10, 'car_10_0.jpg', '/uploads/car_10_0.jpg'),
(194, 10, 'car_10_1.jpg', '/uploads/car_10_1.jpg'),
(195, 10, 'car_10_2.jpg', '/uploads/car_10_2.jpg'),
(196, 10, 'car_10_3.jpg', '/uploads/car_10_3.jpg'),
(197, 10, 'car_10_4.jpg', '/uploads/car_10_4.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL DEFAULT 1,
  `car_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `chats`
--

INSERT INTO `chats` (`id`, `user_id`, `seller_id`, `car_id`, `created_at`, `updated_at`) VALUES
(4, 1, 1, NULL, '2025-06-22 08:39:54', '2025-06-22 08:39:54');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `wilaya` varchar(100) DEFAULT NULL,
  `baladiya` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `registration_date` datetime DEFAULT current_timestamp(),
  `last_login_date` datetime DEFAULT NULL,
  `user_ip` varchar(45) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `subscribed` enum('0','1','2','3','4','5') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fullname`, `phonenumber`, `address`, `wilaya`, `baladiya`, `country`, `registration_date`, `last_login_date`, `user_ip`, `role`, `subscribed`) VALUES
(1, 'wassim', '$2b$12$dRr1lrBH594tjrXeL7Fak.E9/HeXxgud0vTtEkU61nW5iCSOqebgm', 'wassim@gmail.com', 'Wassim Abdessalam Merakchi', '0799906096', 'Cite 01', '4-Oum El Bouaghi', 'Ain Beida', 'Algeria', '2025-05-17 18:24:13', NULL, NULL, 'admin', '1'),
(2, 'Rayane Akram Harkat', '$2b$12$JymMeKATYP/dPV2ZwCtgUeHwK8K2ldg0SWwtBXePqWxs9GhTgp5Be', 'akram@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-20 01:23:23', NULL, NULL, 'user', '1'),
(6, 'rayane', '$2b$12$ZEo.MguFXXEy7Q7.SWg6d.qNCHvbwMghkfO0jVMYdJKDf8FGJpxze', 'rayane@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-21 06:19:32', NULL, NULL, 'user', '0');

-- --------------------------------------------------------

--
-- Structure de la table `user_favorites`
--

CREATE TABLE `user_favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_favorites`
--

INSERT INTO `user_favorites` (`id`, `user_id`, `car_id`, `created_at`) VALUES
(29, 1, 3, '2025-06-17 02:41:54'),
(33, 1, 4, '2025-06-17 02:42:27');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `carads`
--
ALTER TABLE `carads`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `carads_id` (`carads_id`);

--
-- Index pour la table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_favorite` (`user_id`,`car_id`),
  ADD KEY `user_favorites_ibfk_2` (`car_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `carads`
--
ALTER TABLE `carads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `caradsimages`
--
ALTER TABLE `caradsimages`
  ADD CONSTRAINT `caradsimages_ibfk_1` FOREIGN KEY (`carads_id`) REFERENCES `carads` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `chats_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `chats_ibfk_3` FOREIGN KEY (`car_id`) REFERENCES `carads` (`id`);

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_favorites_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `carads` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
